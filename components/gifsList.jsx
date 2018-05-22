import React from 'react';
import GifSlide from './gifSlide.jsx';

class GifsList extends React.Component {
    constructor(props) {
      super(props)
      this.gifsCycle = this.gifsCycle.bind(this)
      this.state = { idx: 0, rhythmFactor: 8 }
      this.intervalId = ''
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

    play(props) {
      let {tempo} = props
      let {rhythmFactor} = this.state
      let beatMs = 60000 / tempo
      let {intervalId} = this
      if (intervalId !== '') {
        clearInterval(intervalId)
      }
      this.intervalId = setInterval(this.gifsCycle, beatMs*rhythmFactor)
    }

    componentDidMount() {
      this.play(this.props)
    }

    componentWillUnmount() {
      let {intervalId} = this
      clearInterval(intervalId)
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.tempo !== this.props.tempo) {
        this.play(nextProps)
      }
    }

    render() {
      let urls = this.props.gifUrls
      let {idx} = this.state
      let gifSlides = urls.slice(1,urls.length).map((url, idx) =>{
        return <GifSlide url={url} key={idx} className="slides"/>
      })

      let beatMs = 60000/(window.tempo);
      let style = {
        visibility: this.props.visibility ? "visible" : "hidden",
        animation: `swing linear ${beatMs*8}ms infinite`
      }
      return <ul className="slides" style={style}>
      <GifSlide url={urls[idx]} className="slides current" style={{}} />
    </ul>
    }
}

export default GifsList;
