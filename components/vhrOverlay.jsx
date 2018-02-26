import React from 'react'
import $ from "jquery";

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
        let i = 0;
        let max = Math.floor(Math.random() * 3);

        if (max == 0) {
            max = Math.floor(Math.random() * 4);
        } else {
            max = 3
        }

        for(i=0;i<max;i++){
            $('.buzz_wrapper .text ul').eq(0).clone().prependTo('.buzz_wrapper .text');
        }

        //set timer for display...after midsection?
        let {sections} = window.audioAnalysis
        let section = sections[ Math.ceil(sections.length / 2)]
        let beatMs = 60000/(section.tempo);
        let timestamp = section.start * 1000

        let progressMs = window.currentTrack.progress_ms
        window.networkDelay = Date.now() - window.beginT
        timestamp = timestamp - progressMs - window.networkDelay
        window.setTimeout(() => this.toggle(), timestamp)
        window.setTimeout(() => this.toggle(), (timestamp + beatMs*16))
    }
    render() {
        let {audioFeatures, audioAnalysis} = window
        let {visible} = this.state

        let style = { display: visible ? null : 'none' }

        return <div className="vhr_overlay" >
            <div id="vhr_grid" />
            <div>TEST</div>
      </div>
    }
  }

export default VhrOverlay;
