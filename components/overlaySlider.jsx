import React from 'react';
import * as spotifyUtil from '../util/spotifyUtil'
import VhrOverlay from './vhrOverlay/vhrOverlay'
import TwitchChat from './twitchChat/twitchChat'

class OverlaySlider extends React.Component {
    constructor(props){
      super(props)
    }

    // spotifyUtil.getCurrentTrack().then( (res) => {
    //     spotifyUtil.getAudioFeatures(res.item.id, (res1) => {
    //         spotifyUtil.getAudioAnalysis(res.item.id, (res2)=>{
    //             this.setState({currentTrack: res, audioFeatures: res1, audioAnalysis: res2})
    //         })
    //     })
    // })

    
    componentDidMount() {
      console.log("Component mounted?")
    }


    render() {
      let {currentTrack, audioAnalysis, audioFeatures} = this.props

      return <div id="slider" tabIndex="1" >
        <VhrOverlay currentTrack={currentTrack} 
        audioAnalysis={audioAnalysis} audioFeatures={audioFeatures}
        />
      </div>
    }
  }

export default OverlaySlider;
