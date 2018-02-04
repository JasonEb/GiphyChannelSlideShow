import React from 'react';
import SlideClip from './slideClip.jsx'
import GifsList from './gifsList.jsx'
import * as gifUtil from '../util/localJsonUtil.js' 
import TitleCard from './titleCard.jsx'

class Slider extends React.Component {
    render() {
      let urls = gifUtil.fetchRandomGifUrls()
      let {artist, songTitle, bpm} = this.props

      return <div id="slider">
        <SlideClip url={urls[0]} />
        <TitleCard artist={artist} songTitle={songTitle} />
        <GifsList gifUrls={urls.slice(1, urls.length)} />
      </div>
    }
  }

export default Slider;
