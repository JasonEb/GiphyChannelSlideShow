import React from 'react'
import $ from "jquery"
import Battery from './battery'
import CurrentTrackDisplay from './currentTrackDisplay'
import DateAndTimeDisplay from './dateAndTimeDisplay'

class VhrOverlay extends React.Component {
    constructor(props) {
        super(props)
        this.state = { visible: false }
        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.setState({visible: !this.state.visible})
    }

    componentDidMount() {
        console.log("VHR overlay mounted")
    }

    render() {
        let {audioFeatures, audioAnalysis, currentTrack, networkDelay} = this.props
        let {visible} = this.state
        let tempo = this.props.audioAnalysis.sections[0].tempo
        let {progress_ms} = currentTrack
        let {duration_ms} = currentTrack.item
        let batteryPct = 1 - progress_ms / duration_ms
        let rng = Math.ceil(Math.random() * 3)
        let beat = 60000 / tempo / 1000 * rng;

        let gridStyle = {
            animation: `pulse ${beat}s infinite`
        }

        return <div className="vhr_overlay" >
            <div id="vhr_grid" style={gridStyle} />
            <Battery batteryPct={batteryPct} tempo={tempo}/>
            <CurrentTrackDisplay currentTrack={currentTrack} trackId={audioFeatures.id} audioAnalysis={audioAnalysis} networkDelay={networkDelay} />
            <DateAndTimeDisplay tempo={tempo} />
        </div>
    }
  }

export default VhrOverlay;
