import React from 'react';
import SlideClip from './slideClip.jsx'
import GifsList from './gifsList.jsx'

class Slider extends React.Component {
    render() {
      return <div id="slider">
        <SlideClip />
        <GifsList />
      </div>
    }
  }

export default Slider;
