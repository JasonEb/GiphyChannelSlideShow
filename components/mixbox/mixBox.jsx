import React from 'react';
import * as spotifyUtil from '../../util/spotifyUtil'
import * as gifUtil from '../../util/giphyApiUtil'
import * as slideUtil from '../../util/sliderControls'
import Shuffle from 'shuffle-array'

import VhrOverlay from '../vhrOverlay/vhrOverlay'
import TwitchChat from '../twitchChat/twitchChat'
import TitleCard from './titleCard'
import GifsList from './gifsList'
import SlideClip from '../slideClip'
import GiphySearchCard from '../searchForms/giphySearchCard'

class MixBox extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        titleCardVisibility: true,
        titleCardBlendMode: 'unset',
        twitchChatVisibility: false,
        twitchChatBlendMode: "hard-light",
        slideClipVisibility: true,
        searchVisible: false,
        slideClipBlendMode: 'unset',
        currentGiphyTerm: 'futuristic',
        urls: []
      }

      this.sequenceTitleCardBehavior = this.sequenceTitleCardBehavior.bind(this)
      this.resetState = this.resetState.bind(this)
      this.ids = {}
      this.clearSequences = this.clearSequences.bind(this)
      this.fetchChannelGifs = this.fetchChannelGifs.bind(this)
      this.fetchMyChannelGifs = this.fetchMyChannelGifs.bind(this)
      this.handleKeyPress = this.handleKeyPress.bind(this)
      this.searchGiphy = this.searchGiphy.bind(this)
    }

    clearSequences(){
      let id;
      for (id in this.ids) {
        clearTimeout(this.ids[id])
      }
      slideUtil.stopShow()
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.audioFeatures.id !== this.props.audioFeatures.id ) {
        this.resetState()
        this.searchGiphy(this.state.currentGiphyTerm)
        this.sequenceTitleCardBehavior(nextProps)
        console.table(nextProps.audioFeatures)
      }
    }

    componentDidMount() {
      document.body.style.setProperty('--main-bg', 'black')
      document.title = "MixBox"
      this.resetState()
      this.sequenceTitleCardBehavior(this.props)
      this.searchGiphy(this.state.currentGiphyTerm)
    }

    componentWillUnmount(){
      this.clearSequences()
    }

    fetchChannelGifs(id) {
      let offset = Math.floor(Math.random()*75)
      gifUtil.fetchGiphyChannel(id, offset).then( (res) => {
        let oldUrls = this.state.urls
        res.data.forEach( (giphy) => oldUrls.push(giphy.images.original.url) )
        this.setState({urls: Shuffle(oldUrls)})
        // slideUtil.initializeShow(window.tempo)
      })
    }

    fetchMyChannelGifs(page="1") {
      gifUtil.fetchMyGiphys(page).then( (res) => {
        if (res.next) {
          page = res.next[res.next.length - 1]
          this.fetchMyChannelGifs(page)
        }
        let oldUrls = this.state.urls
        let newUrls = res.results.map((result)=>{ return result.images.original.url})
        this.setState({urls: Shuffle([...oldUrls, ...newUrls]), currentGiphyTerm: "@scruggs"})
      })
    }

    handleKeyPress (e) {
      if (e.key === "`") {
        this.setState({searchVisible: !this.state.searchVisible})
      } 
    }

    resetState(){
      this.setState({
        titleCardVisibility: true,
        titleCardBlendMode: 'unset',
        twitchChatVisibility: false,
        twitchChatBlendMode: "hard-light",
        searchVisible: false,
        slideClipBlendMode: 'unset',
      })
    }

    sequenceTitleCardBehavior(props) {
      this.clearSequences()
      
      let {sections} = props.audioAnalysis
      let section = sections.find( (section) => {
        return section.start >= 12.0
      })
      console.log("intro section: ", section, section.start)
      let duration = section.start * 1000
      let progressMs = props.currentTrack.progress_ms
      let beatMs = 60000/(section.tempo)
      let {networkDelay} = props

      //intro card
      console.log("Sequence set for ", props.currentTrack.item.name)
      console.log("netWorkDelay at sequenceTitleBehavior", networkDelay)
      let timestamp = duration - progressMs - networkDelay
      console.log("timestamp at gifBox: ", timestamp)
      this.ids.titleCardIntroA = setTimeout(() => {
        this.setState({
          titleCardVisibility: false
        })
      }, timestamp)

      //intro card effect
      this.ids.titleCardB = setTimeout(() => {
        this.setState({
          titleCardBlendMode: 'hard-light'
        })
      }, timestamp / 2 )

      //half way
      section = sections[ Math.round(sections.length / 2) ]
      timestamp = section.start * 1000 - networkDelay - progressMs

      this.ids.halfWayMarkA = setTimeout(()=>{
        this.setState({
          slideClipBlendMode: 'hard-light',
          twitchChatVisibility: true
        })
        slideUtil.initializeShow(section.tempo)
      },timestamp)

      beatMs = 60000/(section.tempo)
      this.ids.halfWayMarkB = setTimeout(()=>{
        let {urls} = this.state
        let newUrls = [urls[0], ...Shuffle(urls.slice(1, urls.length - 1))]
        this.setState({
          twitchChatVisibility: false,
          urls: newUrls
        })
      },timestamp + beatMs*16)

      //outro
      section = sections[sections.length - 1]
      timestamp = section.start * 1000 - progressMs - networkDelay
      this.ids.outro = setTimeout(()=>{
        this.setState({titleCardVisibility: true})
      }, timestamp)
    }

    searchGiphy(input="", limit="26") {
      let offset = Math.floor(Math.random()*100)
      this.state.urls = []

      if(input === "@scruggs") {
        this.fetchMyChannelGifs()
      } else {
        // clear gif list
        gifUtil.fetchSearchTerms(input, limit, offset).then( (res) => {
          let oldUrls = this.state.urls
          res.data.forEach( (giphy) => {
            let {url} = giphy.images.original

            //filtering inappropriate gifs
            if (gifUtil.filteredGiphy(url)) { 
              console.log("Skipped ", url)
            } else {
              oldUrls.push(url)
            }
          })
          oldUrls = Shuffle(oldUrls)
          this.setState({urls: oldUrls, currentGiphyTerm: input})
        })
      }
      if (this.state.searchVisible) { this.setState({searchVisible: false})}
    }

    render() {
      let {currentTrack, audioAnalysis, audioFeatures, networkDelay} = this.props
      let {titleCardVisibility, titleCardBlendMode, slideClipBlendMode,
        slideClipVisibility, urls, searchVisible,
        twitchChatBlendMode, twitchChatVisibility} = this.state

      return <div id="slider" tabIndex="1" onKeyPress={this.handleKeyPress} >
      <VhrOverlay currentTrack={currentTrack} 
      audioAnalysis={audioAnalysis} audioFeatures={audioFeatures} networkDelay={networkDelay} />
        <GiphySearchCard visible={this.state.searchVisible} 
          searchGiphy={this.searchGiphy}
          handleKeyPress={this.handleKeyPress} />
        <TitleCard currentTrack={currentTrack} 
          visibility={titleCardVisibility}
          blendMode={titleCardBlendMode} />

        <GifsList gifUrls={urls.slice(1, 24)} tempo={audioFeatures.tempo} visibility={true} />
        <TwitchChat visibility={twitchChatVisibility} currentTrack={currentTrack} blendMode={twitchChatBlendMode} searchGiphy={this.searchGiphy} />
        <SlideClip url={urls[0]} visibility={true} blendMode={slideClipBlendMode} audioFeatures={audioFeatures} />
      </div>
    }
  }

export default MixBox;
