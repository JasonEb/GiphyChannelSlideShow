import React from 'react';
import SlideClip from './slideClip.jsx'
import GifsList from './gifsList.jsx'
import * as gifUtil from '../util/localJsonUtil.js' 
import TitleCard from './titleCard.jsx'

class Slider extends React.Component {
    render() {
      let urls = gifUtil.fetchRandomGifUrls()
      let {artist, songTitle} = this.props

      return <div id="slider">
        <SlideClip />
        <TitleCard artist={artist} songTitle={songTitle} />
        <GifsList gifUrls={urls} />
      </div>
    }
  }

export default Slider;
