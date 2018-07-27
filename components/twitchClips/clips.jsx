import React from 'react';
import Clip from './clip';
import ClipTitleCard from './clipTitleCard';

class Clips extends React.Component {
    constructor(props) {
      super(props)
      this.cycle = this.cycle.bind(this)
      this.state = { idx: 0, rhythmFactor: 8, nextIdx: 1, titleCardVisible: false }
      this.intervalId = ''
      this.play = this.play.bind(this)
      this.timeOutID = 0
      this.titleCardTimeOutId = 1
    }

    cycle() {
      let {idx} = this.state
      let {clips} = this.props
      let newIdx = idx + 1
      if (idx === clips.length - 2) {
        this.setState({idx: 0, nextIdx: 1})
      } else {
        this.setState({idx: newIdx, nextIdx: newIdx + 1})
      }
    }

    play(props) {
      let {tempo, clips} = props
      let {idx} = this.state
      let currentClip = clips[idx]
      // figure out when to cycle after duration
      if (!currentClip){ return }

      let bps = props.tempo / 60
      let duration = Math.floor(currentClip.duration * bps) * (1 / bps) // rounded beats * beats / seconds


      console.log("currentClip.duration: ", currentClip.duration)
      console.log("beated duration:", duration)

      //queuing the titlecard
      this.setState({titleCardVisible: true})
      clearTimeout(this.titleCardTimeOutId)
      this.titleCardTimeOutId = setTimeout((currentClip)=>{
        this.setState({titleCardVisible: false})
      }, 2 * bps * 1000)

      //queuing the next clip
      clearTimeout(this.timeOutID)
      this.timeOutID = setTimeout((currentClip)=> {
        this.cycle()
        this.play(props)
      }, duration * 1000)
    }

    componentDidMount() {
    }

    componentWillUnmount() {
      // let {intervalId} = this
      // clearInterval(intervalId)
    }

    componentWillReceiveProps(nextProps) {
      //set play for new set of clips
      if(nextProps.clips !== this.props.clips) {
        this.play(nextProps)
      }
    }

    render() {
      let { clips } = this.props
      let {idx, nextIdx, titleCardVisible} = this.state
      let currentClip = clips[idx]
      let style = {
        visibility: this.props.visibility ? "visible" : "hidden",
      }

      return(
        <div className="clips">
          <ClipTitleCard clip={currentClip} visibility={titleCardVisible} />
          <Clip clip={currentClip} />
        </div>
      )
    }
}

export default Clips;
