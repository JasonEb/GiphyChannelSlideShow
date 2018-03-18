import React from 'react'
import $ from "jquery";

class AudioFeaturesCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = { visible: false }
        this.toggle = this.toggle.bind(this)
        this.textGenerator = this.textGenerator.bind(this)
    }

    toggle() {
        this.setState({visible: !this.state.visible})
    }

    textGenerator() {
        let {audioFeatures, audioAnalysis} = window
        let max = Math.floor(Math.random() * 6 + 1)
        let text = []
        for(let i = 0; i < max; i++) { text.push(<ul key={i}>
            <li>danceability {audioFeatures.danceability}</li>
            <li>energy {audioFeatures.energy}</li>
            <li>valence {audioFeatures.valence}</li>
            <li>tempo {audioFeatures.tempo}</li>
            <li>key {audioFeatures.key}</li>
            <li>time_signature {audioFeatures.time_signature}</li>
            <li>end_of_fade_in {audioAnalysis.track.end_of_fade_in}</li>
            <li>start_of_fade_out {audioAnalysis.track.start_of_fade_out}</li>
            <li>duration_ms {audioFeatures.duration_ms/ 1000} </li>
            <li><br/></li>
            <li>I love platforms and platform culture</li>
            <li><br/></li>
            <li>Built with tech from Spotify, Giphy, StreamLabs, and Twitch</li>
        </ul>)
        }
        return text;
    }

    componentDidMount() {
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
        let {visible} = this.state
        let text = this.textGenerator()

        let style = {
            display: visible ? null : 'none'
        }

        return <div className="audio_features" style={style}>
            <div className="text">
                {text}
            </div>
            <div className="scanline"></div>
      </div>
    }
  }

export default AudioFeaturesCard;
