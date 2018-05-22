import React from 'react'

//todo examine clearing out intervals on every prop update change

class CurrentTrackDisplay extends React.Component {
    constructor(props) {
        super(props)
        let {currentTrack} = this.props
        let {name, artists, album} = currentTrack.item

        this.rotateInfo = this.rotateInfo.bind(this)
        this.toggle = this.toggle.bind(this)
        this.formatArtistsData = this.formatArtistsData.bind(this)
        
        this.state = {
            count: 0, 
            info: [
                `Song: ${name}`,
                this.formatArtistsData(artists),
                `Album: ${album.name}`], 
            idx: 0,
            visible: false,
        }

        this.trackInfoLoopId = 0
        this.outroId = 0
        this.introId = 0

        this.sequenceBehavior = this.sequenceBehavior.bind(this)
    }

    componentDidMount() {
        // console.log("Current Track and Display Mounted"
        clearInterval(this.trackInfoLoopId)
        clearTimeout(this.introId)
        clearTimeout(this.outroId)   
        let beatMs = 60000 / this.props.audioAnalysis.sections[1].tempo
        this.trackInfoLoopId = window.setInterval(()=>{
            this.rotateInfo()
            if ( window.location.uref == "http://127.0.0.1:8000/overlay"){ debugger }
        }, beatMs*12)
        this.sequenceBehavior(this.props)
    }

    componentWillUnmount() {
        clearInterval(this.trackInfoLoopId)
        clearTimeout(this.introId)
        clearTimeout(this.outroId)       
    }

    componentWillReceiveProps(nextProps) {
        // check if not initial track
        // if actual track, start loop display
        // if a new track reset?
        let nextTrack = nextProps.trackId
        let oldTrack = this.props.trackId

        if (nextTrack !== oldTrack) {
            //reset inner state
            //clear all loops
            //begin new loop
            //  set new outro
            let {name, artists, album} = nextProps.currentTrack.item
            let beatMs = 60000 / nextProps.audioAnalysis.sections[0].tempo
            
            this.setState({
                count: 0, 
                info: [
                    `Song: ${name}`,
                    this.formatArtistsData(artists),
                    `Album: ${album.name}`], 
                idx: 0,
                visible: false
            })

            clearInterval(this.trackInfoLoopId)
            clearTimeout(this.introId)
            clearTimeout(this.outroId)
            this.trackInfoLoopId = setInterval(()=>{
                this.rotateInfo()
            }, beatMs*12)
            this.sequenceBehavior(nextProps)
        }
    }

    formatArtistsData(artistsData) {
        let artists = artistsData.map( (artist) => { return artist.name}).join(", ")
        let text = 'Artists'
        if (artistsData.length === 1) {
            text = `Artist`
        }
        return `${text}: ${artists}`
    }

    rotateInfo() {
        let {count, info} = this.state
        let idx = count % info.length
        this.setState({count: count + 1, idx: idx})    
    }
    
    toggle() {
        this.setState({visible: !this.state.visible})
    }

    sequenceBehavior(props) {
        let {sections} = props.audioAnalysis
        let section = sections.find( (section) => {
          return section.start > 12
        })
        let duration = section.start * 1000
        let progressMs = props.currentTrack.progress_ms

        let {networkDelay} = props
        duration = duration - progressMs - networkDelay
        this.introId = setTimeout(this.toggle, duration)

        //outro 
        section = sections[sections.length - 1]
        let timeStamp = section.start * 1000 - progressMs - networkDelay
        this.outroId = setTimeout(function() {
            clearTimeout(this.trackInfoLoopId)
            this.setState({idx: 2})
        }.bind(this), timeStamp)
    }



    render() {
        let {info, idx, visible} = this.state
        let {tempo} = this.props.audioAnalysis.sections[0]

        let beatMs = 60000 / tempo

        let style = {
            display: visible ? null : 'none',
            animation: `blur ${beatMs*2}ms infinite`
        }
        
        return <div id="current_track_display" style={style}>{info[idx]}</div>
    }
}

export default CurrentTrackDisplay