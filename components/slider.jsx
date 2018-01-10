import React from 'react';
import SlideClip from './slideClip.jsx'
import GifsList from './gifsList.jsx'
import * as gifUtil from '../util/localJsonUtil.js' 

class Slider extends React.Component {
    render() {
      let urls = gifUtil.fetchRandomGifUrls();

      return <div id="slider">
        <SlideClip />
        <GifsList gifUrls={urls} />
      </div>
    }
  }

export default Slider;
