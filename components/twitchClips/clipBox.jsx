import React from 'react'

import Clips from './clips'
import * as twitchUtil from '../../util/twitchApi.js'
import Shuffle from 'shuffle-array'

class ClipBox extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        clips: []
      }
    }

    componentDidMount() {
      twitchUtil.searchGames("Street%20Fighter%2030th%20Anniversary%20Collection").then( (searchRes)=>{ 
        twitchUtil.fetchGameClips(searchRes.games[0].name).then( (fetchRes)=> { 
          console.log("searchRes: ", searchRes)
          this.setState({ clips: Shuffle(fetchRes.clips) })
        })
      })
      // twitchUtil.fetchChannelClips("SteevieG", 'all', 100).then( (fetchRes)=> { 
      //   this.setState({ clips: Shuffle(fetchRes.clips) })
      // })
    }

    render() {
      return <div id="clip-box" tabIndex="1" >
        <Clips clips={this.state.clips} tempo={this.props.audioFeatures.tempo} />
      </div>
    }
  }

export default ClipBox;
