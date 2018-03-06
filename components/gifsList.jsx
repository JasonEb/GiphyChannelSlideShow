import React from 'react';
import GifSlide from './gifSlide.jsx';

class GifsList extends React.Component {
    constructor(props) {
      super(props)
      this.gifsCycle = this.gifsCycle.bind(this)
      this.state = { idx: 0, rhythmFactor: 8, intervalId: '' }
      this.play = this.play.bind(this)
    }

    gifsCycle() {
      let {idx} = this.state
      let {gifUrls} = this.props
      let newIdx = idx + 1
      if (idx === gifUrls.length - 1) {
        this.setState({idx: 0})
      } else {
        this.setState({idx: newIdx})
      }
    }

    play() {
      let {tempo} = this.props
      let {rhythmFactor} = this.state
      let beatMs = 60000 / tempo
      let {intervalId} = this.state
      if (intervalId !== '') {
        clearInterval(intervalId)
      }
      let id = setInterval(this.gifsCycle, beatMs*rhythmFactor)
      this.setState({intervalId : id})  
    }

    componentDidMount () {
      this.play()
    }

    render() {
      let urls = this.props.gifUrls
      let {idx} = this.state
      let gifSlides = urls.slice(1,urls.length).map((url, idx) =>{
        return <GifSlide url={url} key={idx} className="slides"/>
      })

      return <ul className="slides">
      <GifSlide url={urls[idx]} className="slides current"/>

    </ul>
    }
}

export default GifsList;
