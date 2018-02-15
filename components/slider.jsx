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
    }

    fetchChannelGifs() {
      gifUtil.fetchGiphyChannel().then( (res) => {
        let oldUrls = this.state.urls
        res.data.forEach( (giphy) => oldUrls.push(giphy.images.original.url) )
        this.setState({urls: oldUrls})
      })
    }
    
    componentDidMount() {
      this.fetchChannelGifs()
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
