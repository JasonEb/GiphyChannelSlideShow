import React from 'react';

class GifSlide extends React.Component {
    constructor(props) {
      super(props)
      this.onError = this.onError.bind(this)
    }

    onError(err) {
      debugger
    }

    render() {
    let {url, className } = this.props
      return <li className={className}>
        <img src={url} alt={""} crossOrigin={"anonymous"} onError={this.onError} />
      </li>
    }
}

export default GifSlide;
