import React from 'react';
import GifSlide from './gifSlide.jsx';

class GifsList extends React.Component {
    render() {
      let urls = this.props.gifUrls
      let gifSlides = urls.slice(1,urls.length).map((url, idx) =>{
        return <GifSlide url={url} key={idx} className="slides"/>
      })

      return <ul className="slides">
      <GifSlide url={urls[0]} className="slides current"/>
      {gifSlides}
    </ul>
    }
}

export default GifsList;
