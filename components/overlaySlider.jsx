import React from 'react';
import * as spotifyUtil from '../util/spotifyUtil'
import VhrOverlay from './vhrOverlay/vhrOverlay'
import TwitchChat from './twitchChat/twitchChat'
import GiphySearchCard from './mixbox/giphySearchCard'

class OverlaySlider extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        twitchChatVisibility: false,
        twitchChatBlendMode: "hard-light",
        searchVisible: false
      }
      this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    componentDidMount() {
      console.log("Component mounted?")
      document.body.style.setProperty('--main-bg', '#00ffff')
      document.title = "Overlay"
    }

    handleKeyPress (e) {
      if (e.key === "`") {
        this.setState({searchVisible: !this.state.searchVisible})
      } 
    }



    render() {
      let {currentTrack, audioAnalysis, audioFeatures, networkDelay} = this.props
      let {twitchChatBlendMode, twitchChatVisibility} = this.state
      
      return <div id="slider" tabIndex="1" onKeyPress={this.handleKeyPress} >
        <VhrOverlay currentTrack={currentTrack} 
        audioAnalysis={audioAnalysis} audioFeatures={audioFeatures} networkDelay={networkDelay} 
        />

        <GiphySearchCard visible={this.state.searchVisible} 
          searchGiphy={()=>{}}
          handleKeyPress={this.handleKeyPress} />
      </div>
    }
  }

export default OverlaySlider;
