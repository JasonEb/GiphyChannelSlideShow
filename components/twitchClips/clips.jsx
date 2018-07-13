import React from 'react';
import Clip from './clip.jsx';

class Clips extends React.Component {
    constructor(props) {
      super(props)
      this.cycle = this.cycle.bind(this)
      this.state = { idx: 0, rhythmFactor: 8 }
      this.intervalId = ''
      this.play = this.play.bind(this)
    }

    cycle() {
      let {idx} = this.state
      let {clips} = this.props
      let newIdx = idx + 1
      if (idx === clips.length - 1) {
        this.setState({idx: 0})
      } else {
        this.setState({idx: newIdx})
      }
    }

    play(props) {
      let {tempo, clips} = props
      let {idx} = this.state
      let currentClip = clips[idx]
      // figure out when to cycle after duration
      if (!currentClip){ return }

      let bps = props.tempo / 60
      let duration = Math.floor(currentClip.duration / bps) * bps 
      setTimeout((currentClip)=> {
        this.cycle()
        this.play(props)
      }, duration * 1000)
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
      let { clips } = this.props
      let slugs = clips.map( (clip)=>{ return clip.slug})

      let {idx} = this.state
      let style = {
        visibility: this.props.visibility ? "visible" : "hidden",
      }
      return(
        <div className="clips">
          <Clip slug={slugs[idx]} />
        </div>
      )
    }
}

export default Clips;
