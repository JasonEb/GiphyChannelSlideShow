import React from 'react';
import SlideClip from './slideClip.jsx'
import GifsList from './gifsList.jsx'
import * as gifUtil from '../util/giphyApiUtil.js' 
import TitleCard from './titleCard.jsx'

class Slider extends React.Component {
    constructor(props){
      super(props)
      this.state = { urls: [] }
      this.fetchGifs = this.fetchGifs.bind(this)
    }

    fetchGifs() {
      let urls = gifUtil.fetchRandomGifUrls()
      this.setState({urls: urls})
      console.log("fetch giphys: ", gifUtil.fetchGifUrls())
    }
    
    componentDidMount() {
      this.fetchGifs()
    }

    render() {
      let { urls } = this.state

      let {artist, songTitle, bpm} = this.props

      return <div id="slider">
        <SlideClip url={urls[0]} />
        <TitleCard artist={artist} songTitle={songTitle} />
        <GifsList gifUrls={urls.slice(1, urls.length)} />
      </div>
    }
  }

export default Slider;
