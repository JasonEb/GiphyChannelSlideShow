import React from 'react'
import $ from "jquery";

class AudioFeaturesCard extends React.Component {
    componentDidMount() {
        let i = 0;

        for(i=0;i<4;i++){
            $('.buzz_wrapper .text ul').eq(0).clone().prependTo('.buzz_wrapper .text');
        }
        for(i=0;i<10;i++){
            $('.buzz_wrapper .scanline').eq(0).clone().appendTo('.buzz_wrapper');
        }
    }
    render() {
        let {audioFeatures} = window

        return <div className="buzz_wrapper">
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
