import React from 'react'
import $ from "jquery"
import Battery from './battery'
import CurrentTrackDisplay from './currentTrackDisplay'

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
    }
    render() {
        let {audioFeatures, audioAnalysis} = window
        let {visible} = this.state

        let {currentTrack} = this.props
        let {progress_ms} = currentTrack
        let {duration_ms} = currentTrack.item
        let batteryPct = 1 - progress_ms / duration_ms
        let rng = Math.ceil(Math.random() * 3)
        let beat = 60000 / window.tempo / 1000 * rng;

        let gridStyle = {
            animation: `pulse ${beat}s infinite`
        }
        return <div className="vhr_overlay" >
            <div id="vhr_grid" style={gridStyle} />
            <Battery batteryPct={batteryPct} />
            <CurrentTrackDisplay currentTrack={currentTrack} />
      </div>
    }
  }

export default VhrOverlay;
