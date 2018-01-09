import React from 'react';
import GifSlide from './gifSlide.jsx';

class GifsList extends React.Component {
    render() {
      return <ul className="slides">
      <GifSlide url="https://media.giphy.com/media/3oFzlX7ts7vrdTvKSs/giphy.gif" className="slides current"/>
      <GifSlide url="https://media.giphy.com/media/3ohc0QbUyS8ay7gOkM/giphy.gif" className="slide" />
    </ul>
    }
}

export default GifsList;
