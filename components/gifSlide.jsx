import React from 'react';

class GifSlide extends React.Component {
    render() {
    let {url, className } = this.props
      return <li className={className}>
        <img src={url} />
      </li>
    }
}

export default GifSlide;
