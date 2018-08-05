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
        currentStr: "@evo, day",
        fetchedClips: []
      }

      this.handleKeyPress = this.handleKeyPress.bind(this)
      this.searchTwitch = this.searchTwitch.bind(this)
      this.shuffleClips = this.shuffleClips.bind(this)
      this.filterClips = this.filterClips.bind(this)
      this.fetchChannelClips = this.fetchChannelClips.bind(this)
      this.fetchGameClips = this.fetchGameClips.bind(this)
      this.resetClips = this.resetClips.bind(this)
    }

    componentDidMount() {
      document.body.style.setProperty('--main-bg', 'black')
      document.title = "ClipBox"

      this.searchTwitch(this.state.currentStr)
    }


    fetchChannelClips(channel, period, limit, cursor="", clips=[]) {
      return twitchUtil.fetchChannelClips(channel, period, limit, cursor).then( (fetchRes)=> {
        if (fetchRes._cursor === ""){
          clips = clips.concat(fetchRes.clips)
          return this.setState({ clips: clips, searchVisible: false, fetchedClips: [...clips]})
        } else {
          clips = clips.concat(fetchRes.clips)
          cursor = fetchRes._cursor
          return this.fetchChannelClips(channel, period, limit, cursor, clips)
        }
      }).fail( (e) => {e.abort()})
    }

    fetchGameClips(game, period, languages, limit, cursor="", clips=[]) {
      return twitchUtil.fetchGameClips(game, period, languages, limit, cursor).then( (fetchRes)=> {
        if (fetchRes._cursor === "" || cursor === "") {
          clips = clips.concat(fetchRes.clips)
          return this.setState({ clips: clips, searchVisible: false, fetchedClips: [...clips]})
        } else {
          clips = clips.concat(fetchRes.clips)
          cursor = fetchRes._cursor
          return this.fetchGameClips(game, period, languages, limit, cursor, clips)
        }
      }).fail( (e) => {e.abort()})
    }

    filterClips() {
      let {clips} = this.state
      let days = window.prompt("How many days?", 2)
      days = parseInt(days)
      let filtered = twitchUtil.filterClips(clips, days)
      return this.setState({clips: filtered, idx: 0})
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
        this.fetchChannelClips(channel, period, limit, "")
      } else {
        twitchUtil.searchGames(searchStr).then( (searchRes)=>{
          let game = searchRes.games[0].name
          this.fetchGameClips(game, period, languages, limit, "")
        })
      }

      this.setState({currentStr: input})
    }

    resetClips() {
      this.setState((prevState, props) =>({clips: [...prevState.fetchedClips], idx: 0}))
    }

    shuffleClips() {
      this.setState((prevState, props) =>({clips: Shuffle(prevState.clips), idx: 0}))
    }


    render() {
      let {currentTrack, audioAnalysis, audioFeatures, networkDelay} = this.props
      return <div id="clip-box" tabIndex="1" onKeyPress={this.handleKeyPress}>
        <VhrOverlay currentTrack={currentTrack}
        audioAnalysis={audioAnalysis} audioFeatures={audioFeatures} networkDelay={networkDelay} />
        <Clips clips={this.state.clips} tempo={this.props.audioFeatures.tempo} audioFeatures={audioFeatures} />
        <ClipSearch visible={this.state.searchVisible} searchTwitch={this.searchTwitch} />
        <div className="functions">
          <div onClick={this.filterClips}>Filter</div>
          <div onClick={this.shuffleClips}>Shuffle</div>
          <div onClick={this.resetClips}>Reset</div>
        </div>
      </div>
    }
  }

export default ClipBox;
