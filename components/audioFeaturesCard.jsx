import React from 'react'
import $ from "jquery";

class AudioFeaturesCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = { visible: false }
    }
    componentDidMount() {
        let i = 0;
        let max = Math.floor(Math.random() * 3);

        if (max == 1) {
            max = Math.floor(Math.random() * 4);
        } else {
            max = 3
        }

        for(i=0;i<max;i++){
            $('.buzz_wrapper .text ul').eq(0).clone().prependTo('.buzz_wrapper .text');
        }
    }
    render() {
        let {audioFeatures} = window
        let {visible} = this.state

        let style = { display: visible ? null : 'none' }

        return <div className="buzz_wrapper" style={style}>
            <div className="text">
                <ul>
                    <li>danceability {audioFeatures.danceability}</li>
                    <li>energy {audioFeatures.energy}</li>
                    <li>valence {audioFeatures.valence}</li>
                    <li>tempo {audioFeatures.tempo}</li>
                </ul>
            </div>
            <div className="scanline"></div>
      </div>
    }
  }

export default AudioFeaturesCard;
