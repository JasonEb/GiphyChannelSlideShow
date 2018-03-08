import React from 'react'

class CurrentTrackDisplay extends React.Component {
    constructor(props) {
        super(props)
        let {currentTrack} = this.props
        let {name, artists, album} = currentTrack.item
        artists = artists.map( (artist) => { return artist.name}).join(", ")

        this.rotateInfo = this.rotateInfo.bind(this)
        this.toggle = this.toggle.bind(this)
        this.state = {
            count: 0, 
            info: [
                `Song: ${name}`,
                `Artists: ${artists}`,
                `Album: ${album.name}`], 
            idx: 0,
            visible: false,
            loopId: 0
        }
    }

    rotateInfo() {
        let {count, info} = this.state
        let idx = count % info.length
        this.setState({count: count + 1, idx: idx})    
    }
    toggle() {
        this.setState({visible: !this.state.visible})
    }
    componentDidMount() {
        let {tempo} = window
        let beatMs = 60000 / tempo
        this.state.loopId = setInterval(this.rotateInfo,beatMs*12)

        //turn on info when title card goes away
        let {sections} = window.audioAnalysis
        let section = sections.find( (section) => {
          return section.start > 12
        })
        let duration = section.start * 1000
        let progressMs = window.currentTrack.progress_ms

        window.networkDelay = Date.now() - window.beginT
        duration = duration - progressMs - window.networkDelay
        window.setTimeout(this.toggle, duration)

        //outro 
        section = sections[sections.length - 1]
        let timeStamp = section.start * 1000 - progressMs - window.networkDelay
        let that = this
        window.setTimeout(function() {
            clearTimeout(this.state.loopId)
            this.setState({idx: 2})
        }.bind(this), timeStamp)
    }

    render() {
        let {info, idx, visible} = this.state
        let {tempo} = window
        let beatMs = 60000 / tempo

        let style = {
            display: visible ? null : 'none',
            animation: `blur ${beatMs/4}ms infinite`
        }

        return <div id="current_track_display" style={style}>{info[idx]}</div>
    }
}

export default CurrentTrackDisplay