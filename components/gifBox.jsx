import React from 'react';
import * as spotifyUtil from '../util/spotifyUtil'
import * as gifUtil from '../util/giphyApiUtil.js'
import * as slideUtil from '../util/sliderControls.js' 
import Shuffle from 'shuffle-array'

import VhrOverlay from './vhrOverlay/vhrOverlay'
import TwitchChat from './twitchChat/twitchChat'
import TitleCard from './titleCard.jsx'
import GifsList from './gifsList.jsx'
import SlideClip from './slideClip.jsx'
import GiphySearchCard from './giphySearchCard'

class GifBox extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        titleCardVisibility: true,
        titleCardBlendMode: 'unset',
        slideClipVisibility: true,
        searchVisible: false,
        slideClipBlendMode: 'unset',
        currentGiphyTerm: 'ssbm',
        urls: []
      }

      this.sequenceTitleCardBehavior = this.sequenceTitleCardBehavior.bind(this)
      this.resetState = this.resetState.bind(this)
      this.ids = {}
      this.fetchChannelGifs = this.fetchChannelGifs.bind(this)
      this.handleKeyPress = this.handleKeyPress.bind(this)
      this.searchGiphy = this.searchGiphy.bind(this)
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

    handleKeyPress (e) {
      if (e.key === "`") {
        this.setState({searchVisible: !this.state.searchVisible})
      } 
    }

    resetState(){
      this.setState({
        titleCardVisibility: true,
        titleCardBlendMode: 'unset',
        slideClipBlendMode: 'unset',
      })
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.audioFeatures.id !== this.props.audioFeatures.id ) {
        this.resetState()
        this.sequenceTitleCardBehavior(nextProps)
        this.searchGiphy(this.state.currentGiphyTerm)
      }
    }

    sequenceTitleCardBehavior(props) {
      clearTimeout(this.ids.titleCardIntroId)
      clearTimeout(this.ids.titleCardEffect)
      clearTimeout(this.ids.halfWayMark)
      clearTimeout(this.ids.outro)
      slideUtil.stopShow()
      
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
      this.ids.titleCardIntroId = setTimeout(() => {
        this.setState({
          titleCardVisibility: false
        })
      }, timestamp)
    
      //intro card effect
      this.ids.titleCardEffect = setTimeout(() => {
        this.setState({
          titleCardBlendMode: 'hard-light'
        })
      }, timestamp / 2 )

      //half way
      section = sections[ Math.round(sections.length / 2) ]
      this.ids.halfWayMark = setTimeout(()=>{
        this.setState({
          slideClipBlendMode: 'hard-light'
        })
        slideUtil.initializeShow(section.tempo)        
      }, section.start * 1000 - networkDelay)

      //outro 
      section = sections[sections.length - 1]
      timestamp = section.start * 1000 - progressMs - networkDelay
      this.ids.outro = setTimeout(()=>{
        this.setState({titleCardVisibility: true})
      }, timestamp)
    }
    
    componentDidMount() {
      // this.sequenceTitleCardBehavior(this.props)
      // this.searchGiphy("SSBM")
      // this.fetchChannelGifs()
    }

    searchGiphy(input="", limit="26") {
      let offset = Math.floor(Math.random()*100)
      this.state.urls = []

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
        console.log("Urls count:", oldUrls.length)
        if (this.state.searchVisible) { this.setState({searchVisible: false})}
        slideUtil.initializeShow(window.tempo)
      })      
    }

    render() {
      let {currentTrack, audioAnalysis, audioFeatures, networkDelay} = this.props
      let {titleCardVisibility, titleCardBlendMode, slideClipBlendMode,
        slideClipVisibility, urls, searchVisible} = this.state
      
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

        <SlideClip url={urls[0]} visibility={slideClipVisibility} blendMode={slideClipBlendMode} audioFeatures={audioFeatures} />
      </div>
    }
  }

export default GifBox;
