import React from 'react'
import $ from "jquery";

class AudioFeaturesCard extends React.Component {
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

        return <div className="audio_features" style={style}>
            <div className="text">
                <ul>
                    <li>danceability {audioFeatures.danceability}</li>
                    <li>energy {audioFeatures.energy}</li>
                    <li>valence {audioFeatures.valence}</li>
                    <li>tempo {audioFeatures.tempo}</li>
                    <li>key {audioFeatures.key}</li>
                    <li>time_signature {audioFeatures.time_signature}</li>
                    <li>end_of_fade_in {audioAnalysis.track.end_of_fade_in}</li>
                    <li>start_of_fade_out {audioAnalysis.track.start_of_fade_out}</li>
                    <li>duration_ms {audioFeatures.duration_ms/ 1000} </li>
                </ul>
            </div>
            <div className="scanline"></div>
      </div>
    }
  }

export default AudioFeaturesCard;
