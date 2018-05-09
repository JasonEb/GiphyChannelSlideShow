import React from 'react';
import * as spotifyUtil from '../util/spotifyUtil'
import VhrOverlay from './vhrOverlay/vhrOverlay'
import TwitchChat from './twitchChat/twitchChat'
import TitleCard from './titleCard.jsx'

class GifBox extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        titleCardVisibility: true
      }

      this.sequenceTitleCardBehavior = this.sequenceTitleCardBehavior.bind(this)
      this.resetState = this.resetState.bind(this)
    }

    resetState(){
      this.setState({
        titleCardVisibility: true
      })
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.currentTrack.item.id !== this.props.currentTrack.item.id ) {
        clearTimeout(this.titleCardIntroId)
        this.resetState()
        this.sequenceTitleCardBehavior()
      }
    }

    sequenceTitleCardBehavior() {
      let {sections} = this.props.audioAnalysis
      let section = sections.find( (section) => {
        return section.start > 12
      })
      let duration = section.start * 1000
      let progressMs = this.props.currentTrack.progress_ms
      let beatMs = 60000/(section.tempo)
      window.networkDelay = Date.now() - window.beginT
      //intro card

      duration = duration - progressMs

      this.titleCardIntroId = setTimeout(() => {
        this.setState({
          titleCardVisibility: false
        })
      }, duration)
    }
    
    componentDidMount() {
      console.log("Component mounted?")
    }

    render() {
      let {currentTrack, audioAnalysis, audioFeatures} = this.props
      let {titleCardVisibility} = this.state
      
      return <div id="slider" tabIndex="1" >
        <VhrOverlay currentTrack={currentTrack} 
                    audioAnalysis={audioAnalysis} audioFeatures={audioFeatures} />

        <TitleCard currentTrack={currentTrack}
                  visibility={titleCardVisibility}
                  blendMode={'unset'} />
      </div>
    }
  }

export default GifBox;
