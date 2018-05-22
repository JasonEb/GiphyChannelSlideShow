import React from 'react';
import * as spotifyUtil from '../util/spotifyUtil'
import VhrOverlay from './vhrOverlay/vhrOverlay'
import TwitchChat from './twitchChat/twitchChat'

class OverlaySlider extends React.Component {
    constructor(props){
      super(props)
    }
    
    componentDidMount() {
      console.log("Component mounted?")
      document.body.style.setProperty('--main-bg', 'green')
    }


    render() {
      let {currentTrack, audioAnalysis, audioFeatures, networkDelay} = this.props

      return <div id="slider" tabIndex="1" >
        <VhrOverlay currentTrack={currentTrack} 
        audioAnalysis={audioAnalysis} audioFeatures={audioFeatures} networkDelay={networkDelay} 
        />
      </div>
    }
  }

export default OverlaySlider;
