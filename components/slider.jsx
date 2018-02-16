import React from 'react';
import SlideClip from './slideClip.jsx'
import GifsList from './gifsList.jsx'
import * as gifUtil from '../util/giphyApiUtil.js' 
import TitleCard from './titleCard.jsx'
import AudioFeaturesCard from './audioFeaturesCard.jsx'

class Slider extends React.Component {
    constructor(props){
      super(props)
      this.state = { urls: [] }
      this.fetchChannelGifs = this.fetchChannelGifs.bind(this)
      this.fetchMyChannelGifs = this.fetchMyChannelGifs.bind(this)
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
    
    componentDidMount() {
      // this.fetchChannelGifs("6343")
      // "6343" for horror gifs

      // check valence. If below 0.400, show "dark" show
      let {valence} = window.audioFeatures
      if (valence > 0.400) {
        this.fetchMyChannelGifs()
      } else {
        this.fetchChannelGifs("6343")
      }
    }

    render() {
      let { urls } = this.state
      gifUtil.shuffle(urls)
      urls = urls.slice(0,17)

      let {artist, songTitle, bpm} = this.props

      return <div id="slider">
        <TitleCard artist={artist} songTitle={songTitle} />
        <AudioFeaturesCard />
        <SlideClip url={urls[0]} />
        <GifsList gifUrls={urls.slice(1, urls.length)} />
      </div>
    }
  }

export default Slider;
