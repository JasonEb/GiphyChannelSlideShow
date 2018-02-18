import React from 'react';
import SlideClip from './slideClip.jsx'
import GifsList from './gifsList.jsx'
import * as gifUtil from '../util/giphyApiUtil.js' 
import TitleCard from './titleCard.jsx'
import AudioFeaturesCard from './audioFeaturesCard.jsx'
import GlitchLine from './glitchLine.jsx'
import Shuffle from 'shuffle-array'

class Slider extends React.Component {
    constructor(props){
      super(props)
      this.state = { urls: [] }
      this.fetchChannelGifs = this.fetchChannelGifs.bind(this)
      this.fetchMyChannelGifs = this.fetchMyChannelGifs.bind(this)
      this.searchGiphy = this.searchGiphy.bind(this)
      this.handleKeyPress = this.handleKeyPress.bind(this)
      this.channelSelect = this.channelSelect.bind(this)
    }

    fetchChannelGifs(id) {
      gifUtil.fetchGiphyChannel(id).then( (res) => {
        let oldUrls = this.state.urls
        res.data.forEach( (giphy) => oldUrls.push(giphy.images.original.url) )
        this.setState({urls: oldUrls})
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
      })
    }

    searchGiphy(input="", limit="32") {
      gifUtil.fetchSearchTerms(input, limit).then( (res) => {
        let oldUrls = this.state.urls
        res.data.forEach( (giphy) => oldUrls.push(giphy.images.original.url) )
        this.setState({urls: oldUrls})
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
          this.searchGiphy("`luigi stare`", "24")
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
          this.searchGiphy("pixel sprite background")
          break;
        case "8":
        this.searchGiphy("tom and jerry", "100")
          break;     
      }
    }

    handleKeyPress (e) {
      this.channelSelect(e.key)
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

      let rng = Math.ceil(Math.random()*5)
 
      // if (dark) {
      //   this.fetchChannelGifs("6343")
      // } else {
      //   this.fetchMyChannelGifs()
      // }
      // this.fetchChannelGifs("6343")
      // this.fetchMyChannelGifs()

      switch (rng) {
        case 1:
          this.fetchMyChannelGifs()
          break;
        case 2:
          this.searchGiphy("`luigi deathstare`", "24")
          break;
        case 3:
          this.searchGiphy("nintendo animation", "50")
          break;
        case 4:
          this.searchGiphy("neon", "50")
          break;
        case 5:
          this.searchGiphy("pixel sprite background")
          break;
        default:
          this.searchGiphy("hanna barbera", "50")
          break; 
      }
    }

    render() {
      let { urls } = this.state
      urls = Shuffle.pick(urls,{picks: 16})

      let {artist, songTitle, bpm} = this.props

      return <div id="slider" onKeyPress={this.handleKeyPress} tabIndex="1" >
        <TitleCard artist={artist} songTitle={songTitle} />
        <AudioFeaturesCard />
        <SlideClip url={urls[0]} />
        <GifsList gifUrls={urls.slice(1, urls.length)} />
        <GlitchLine gifUrls={urls.slice(1, urls.length)} />
      </div>
    }
  }

export default Slider;
