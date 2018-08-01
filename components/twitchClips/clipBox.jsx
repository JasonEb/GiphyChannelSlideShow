import React from 'react'

import Clips from './clips'
import ClipSearch from './clipSearch'
import VhrOverlay from '../vhrOverlay/vhrOverlay'

import * as twitchUtil from '../../util/twitchApi.js'
import Shuffle from 'shuffle-array'

class ClipBox extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        clips: [],
        searchVisible: false,
        currentStr: "@SteevieG, all"
      }

      this.handleKeyPress = this.handleKeyPress.bind(this)
      this.searchTwitch = this.searchTwitch.bind(this)
      this.filterClips = this.filterClips.bind(this)
      this.fetchChannelClips = this.fetchChannelClips.bind(this)
    }

    fetchChannelClips(channel, period, limit, clips=[], cursor="") {
      return twitchUtil.fetchChannelClips(channel, period, limit, cursor).then( (fetchRes)=> {
        if (fetchRes._cursor === ""){
          clips = clips.concat(fetchRes.clips)
          return this.setState({ clips: clips, searchVisible: false})
        } else {
          clips = clips.concat(fetchRes.clips)
          cursor = fetchRes._cursor
          return this.fetchChannelClips(channel, period, limit, clips, cursor)
        }
      })
    }

    filterClips(days) {
      let {clips} = this.state
      let filtered = twitchUtil.filterClips(clips, 2)
      return this.setState({clips: filtered})
    }

    handleKeyPress (e) {
      if (e.key === "`") {
        this.setState({searchVisible: !this.state.searchVisible})
      }
    }

    searchTwitch(input="") {
      // sample text string - "legend of zelda, week en 50"
      let array = input.split(",")
      let searchStr = array[0]
      let options = !!array[1] ? array[1].match(/\S+/g) : []
      let period = !!options[0] ? options[0].trim() : ""
      let languages = !!options[1] ? options[1].trim() : ""
      let limit = !!options[2] ? options[2].trim() : 100

      if (searchStr.startsWith("@")) {
        let channel = searchStr.substr(1, searchStr.length)
        this.fetchChannelClips(channel, period, limit)
      } else {
        twitchUtil.searchGames(searchStr).then( (searchRes)=>{
          let game = searchRes.games[0].name

          twitchUtil.fetchGameClips(game, period, languages, limit).then( (fetchRes)=> {
            this.setState({ clips: Shuffle(fetchRes.clips), searchVisible: false })
          })
        })
      }

      this.setState({currentStr: input})
    }

    componentDidMount() {
      document.body.style.setProperty('--main-bg', 'black')
      document.title = "ClipBox"

      this.searchTwitch(this.state.currentStr)
    }

    render() {
      let {currentTrack, audioAnalysis, audioFeatures, networkDelay} = this.props
      // <VhrOverlay currentTrack={currentTrack}
      // audioAnalysis={audioAnalysis} audioFeatures={audioFeatures} networkDelay={networkDelay} />
      return <div id="clip-box" tabIndex="1" onKeyPress={this.handleKeyPress}>
        <div onClick={this.filterClips}>Filter</div>
        <ClipSearch visible={this.state.searchVisible} searchTwitch={this.searchTwitch} />
        <Clips clips={this.state.clips} tempo={this.props.audioFeatures.tempo} audioFeatures={audioFeatures} />
      </div>
    }
  }

export default ClipBox;
