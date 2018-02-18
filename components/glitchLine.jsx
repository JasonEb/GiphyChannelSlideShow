import React from 'react'
import $ from "jquery";

class GlitchLine extends React.Component {
    constructor(props) {
        super(props)
        this.state = { visible: false }
        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.setState({visible: !this.state.visible})
    }

    componentDidMount() {
        // //set timer for display...after midsection?
        // let {sections} = window.audioAnalysis
        // let section = sections[ Math.ceil(sections.length / 2)]
        // let beatMs = 60000/(section.tempo);
        // let timestamp = section.start * 1000

        // let progressMs = window.currentTrack.progress_ms
        // window.networkDelay = Date.now() - window.beginT
        // timestamp = timestamp - progressMs - window.networkDelay
        // window.setTimeout(() => this.toggle(), timestamp)
        // window.setTimeout(() => this.toggle(), (timestamp + beatMs*16))
    }

    render() {
        let {audioFeatures, audioAnalysis} = window
        let {visible} = this.state
        let {gifUrls} = this.props

        let style = { display: visible ? null : 'none' }



        return <div id='glitchLine' style={style}>
        <img src={gifUrls[0]} />
        </div>
    }
}

export default GlitchLine;
