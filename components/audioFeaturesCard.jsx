import React from 'react'

class AudioFeaturesCard extends React.Component {
    constructor(props) {
        super(props)
        this.textGenerator = this.textGenerator.bind(this)
    }

    textGenerator() {
        let {audioFeatures, audioAnalysis} = this.props
        let max = Math.floor(Math.random() * 6 + 1)
        let text = []
        for(let i = 0; i < max; i++) { text.push(<ul key={i}>
            <li>danceability {audioFeatures.danceability}</li>
            <li>energy {audioFeatures.energy}</li>
            <li>valence {audioFeatures.valence}</li>
            <li>tempo {audioFeatures.tempo}</li>
            <li>key {audioFeatures.key}</li>
            <li>time_signature {audioFeatures.time_signature}</li>
            <li>duration_ms {audioFeatures.duration_ms/ 1000} </li>
            <li><br/></li>
            <li>I love platforms and platform culture</li>
            <li><br/></li>
            <li>Built with tech from Spotify, Giphy, StreamLabs, and Twitch</li>
        </ul>)
        }
        return text;
    }

    render() {
        let {visibility } = this.props
        let text = this.textGenerator()

        let style = {
            visibility: visibility ? 'visible' : 'hidden'
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
