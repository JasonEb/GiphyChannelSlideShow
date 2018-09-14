import React from 'react'
import $ from "jquery"
import Battery from './battery'
import CurrentTrackDisplay from './currentTrackDisplay'
import DateAndTimeDisplay from './dateAndTimeDisplay'
import ClipsDisplay from './clipsDisplay'

class VhrOverlay extends React.Component {
    constructor(props) {
        super(props)
        this.state = { visible: false,
            animate: true,
            cssAnimation: "",
            loopingEffect: true,
            rhythmFactor: 4.0
        }
        this.toggle = this.toggle.bind(this)
        this.randomPick = this.randomPick.bind(this)

        this.introTimeOut = 0
    }

    toggle() {
        this.setState({visible: !this.state.visible})
    }

    componentWillReceiveProps(nextProps) {
        let sameSong = nextProps.audioFeatures.id === this.props.audioFeatures.id
        let {networkDelay, currentTrack} = nextProps
        let {rhythmFactor, loopingEffect} = this.state
        let tempo = nextProps.audioFeatures.tempo
        let bps = tempo / 60.0
        let {sections} = nextProps.audioAnalysis
        let section = sections.find( (section) => {
            return section.start >= 6.0
        })

        if (!sameSong ) {
            clearTimeout(this.introTimeOut)

            //animate intro section of song
            let timing = 'ease-out'

            //random blur in sequence
            let blurTransition = `blurTransition ${section.start - networkDelay/1000}s normal ${timing}`
            let spinTransition = Math.random() > 0.50 ?  `, spinTransition ${section.start - networkDelay/1000}s normal ${timing}` : null
            let scaleTransition = Math.random() > 0.50 ?  `, scaleTransition ${section.start - networkDelay/1000}s normal ${timing}`: null
            // let contrastTransition = Math.random() > 0.50 ?  `, contrastTransition ${section.start - networkDelay/1000}s normal ${timing}`: null
            let rotateYTransition = Math.random() > 0.50 ?  `, rotateYTransition ${section.start - networkDelay/1000}s normal ${timing}`: null
            let rotateXTransition = Math.random() > 0.50 ?  `, rotateXTransition ${section.start - networkDelay/1000}s normal ${timing}`: null
            let cssStr = [blurTransition, spinTransition, scaleTransition, rotateYTransition, rotateXTransition].join('')

            this.setState({animate: true, cssAnimation: cssStr})

            //turn off animation
            let cssAnimation = loopingEffect ? `bounce ${(1 / bps) * rhythmFactor}s linear ${(1 / bps) * rhythmFactor}s infinite` : ''
            this.introTimeOut = setTimeout(()=>{this.setState({animate: false, cssAnimation: cssAnimation})}, section.start * 1000 - networkDelay)
        }
    }

    randomPick(array) {
        return array[Math.floor(Math.random()*array.length)]
    }

    render() {
        let {audioFeatures, audioAnalysis, currentTrack, networkDelay, clipsInfo} = this.props
        let {cssAnimation} = this.state
        let tempo = this.props.audioFeatures.tempo
        let bps = tempo / 60
        let {progress_ms} = currentTrack
        let {duration_ms} = currentTrack.item
        let batteryPct = 1 - progress_ms / duration_ms
        let rng = Math.ceil(Math.random() * 3)
        let beat = 60000 / tempo / 1000 * rng;

        let gridStyle = {
            animation: `pulse ${beat}s infinite`
        }

        let {sections} = audioAnalysis
        let section = sections.find( (section) => {
            return section.start >= 12
        })

        let overlayCSS = {
                animation: cssAnimation
        }

        return <div className="vhr_overlay" style={overlayCSS}>
            <div id="vhr_grid" style={gridStyle} />
            <Battery batteryPct={batteryPct} tempo={tempo}/>
            <ClipsDisplay data={clipsInfo} />
            <CurrentTrackDisplay currentTrack={currentTrack} trackId={audioFeatures.id} tempo={tempo} audioAnalysis={audioAnalysis} networkDelay={networkDelay} />
            <DateAndTimeDisplay tempo={tempo} />
        </div>
    }
}

export default VhrOverlay;
