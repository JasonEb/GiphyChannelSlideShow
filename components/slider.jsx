import React from 'react';
import SlideClip from './slideClip.jsx'
import GifsList from './gifsList.jsx'
import * as gifUtil from '../util/giphyApiUtil.js' 
import TitleCard from './titleCard.jsx'
import AudioFeaturesCard from './audioFeaturesCard.jsx'
import GlitchLine from './glitchLine.jsx'
import Shuffle from 'shuffle-array'
import GiphySearchCard from './giphySearchCard'
import VhrOverlay from './vhrOverlay/vhrOverlay'
import * as spotifyUtil from '../util/spotifyUtil'

class Slider extends React.Component {
    constructor(props){
      super(props)
      this.state = { urls: [], searchVisible: false, currentTrack: window.currentTrack }
      this.fetchChannelGifs = this.fetchChannelGifs.bind(this)
      this.fetchMyChannelGifs = this.fetchMyChannelGifs.bind(this)
      this.searchGiphy = this.searchGiphy.bind(this)
      this.handleKeyPress = this.handleKeyPress.bind(this)
      this.channelSelect = this.channelSelect.bind(this)
      this.updateCurrentlyPlaying = this.updateCurrentlyPlaying.bind(this)
    }

    fetchChannelGifs(id) {
      gifUtil.fetchGiphyChannel(id).then( (res) => {
        let oldUrls = this.state.urls
        res.data.forEach( (giphy) => oldUrls.push(giphy.images.original.url) )
        this.setState({urls: oldUrls})
        slideUtil.initializeShow(window.tempo)
      })
    }

    fetchMyChannelGifs(page="1") {
      gifUtil.fetchMyGiphys(page).then( (res) => {
        if (res.next) {
          let page = res.next[res.next.length - 1]
          this.fetchMyChannelGifs(page)
        }
        let oldUrls = this.state.urls
        res.results.forEach( (giphy) => oldUrls.push(giphy.images.original.url) )
        this.setState({urls: oldUrls})
        slideUtil.initializeShow(window.tempo)
      })
    }

    searchGiphy(input="", limit="128") {
      gifUtil.fetchSearchTerms(input, limit).then( (res) => {
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
        this.setState({urls: oldUrls})
        if (this.state.searchVisible) { this.setState({searchVisible: false})}
        slideUtil.initializeShow(window.tempo)
      })      
    }

    channelSelect(key) {
      this.setState({ urls: [] })
      switch (key) {
        case "1":
          this.fetchMyChannelGifs()
          break;
        case "2":
          this.fetchChannelGifs("6343")
          break;
        case "3":
          this.searchGiphy("`luigi stare`", "100")
          break;
        case "4":
          this.searchGiphy("nintendo animation", "50")
          break;
        case "5":
          this.searchGiphy("hanna barbera", "150")
          break;
        case "6":
          this.searchGiphy("neon", "50")
          break;
        case "7":
          this.searchGiphy("pixel sprite background", "150")
          break;
        case "8":
        this.searchGiphy("tom and jerry", "100")
          break;     
      }
    }

    handleKeyPress (e) {
      if (e.key === "`") {
        this.setState({searchVisible: !this.state.searchVisible})
      } else {
        this.channelSelect(e.key)
      } 
    }

    updateCurrentlyPlaying () {
      //periodically check track status
      let checkInterval = 60000 / window.tempo * 12
      let self = this;
      setInterval( () => {
        spotifyUtil.getCurrentTrack(()=>{}).then( (res) => {
          let previousId = window.currentTrack.item.id
          let newId = res.item.id

          console.log("interval", checkInterval)
          if (newId !== previousId) {
            window.location.href = "http://127.0.0.1:8000"
          }
          self.setState({currentTrack: res})
        })
      }, checkInterval)
    }
    
    componentDidMount() {
      // this.fetchChannelGifs("6343")
      // "6343" for horror gifs
      // "7425" for pixel gifs
      // "6191" for cartoony 
      // check valence. If below a certain threshold, show "dark" show
      // 0.360 is feels happiness
      let {valence, danceability, energy, tempo} = window.audioFeatures
      console.log("valence: ", valence, "danceability:", danceability, "energy: ", energy, "tempo: ", tempo)  

      this.updateCurrentlyPlaying()

      let rng = Math.ceil(Math.random()*9)
      switch (rng) {
        default:
          this.fetchMyChannelGifs()
          break;
        case 2:
          this.searchGiphy("luigi stare", "150")
          break;
        case 3:
          this.searchGiphy("nintendo animation", "200")
          break;
        case 4:
          this.searchGiphy("neon", "150")
          break;
        case 5:
          this.searchGiphy("pixel sprite background", "200")
          break;
        case 6:
          this.searchGiphy("hanna barbera", "150")
          break;
        case 7:
          //darkness gifs
          this.fetchChannelGifs("6343")
          break;
        case 1:
          this.searchGiphy("sailor moon", "250")
          break; 
      }
    }

    render() {
      let { urls, searchCard, currentTrack } = this.state
      let {tempo} = window
      urls = Shuffle(urls)
      urls = Shuffle.pick(urls, {picks: 29})

      let {artist, songTitle, bpm} = this.props

      return <div id="slider" onKeyPress={this.handleKeyPress}  tabIndex="1" >
        <VhrOverlay currentTrack={currentTrack} />

        <GiphySearchCard visible={this.state.searchVisible} 
          channelSelect={this.channelSelect}
          searchGiphy={this.searchGiphy}
          handleKeyPress={this.handleKeyPress}       
        />
        <TitleCard artist={artist} songTitle={songTitle}
          channelSelect={this.channelSelect}
          searchGiphy={this.searchGiphy}
          handleKeyPress={this.handleKeyPress}              
        />
        <SlideClip url={urls[0]} />
        <AudioFeaturesCard />

        <GifsList gifUrls={urls.slice(1, urls.length - 1)} tempo={tempo} />
      </div>
    }
  }

export default Slider;
