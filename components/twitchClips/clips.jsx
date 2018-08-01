import React from 'react';
import Clip from './clip';
import ClipTitleCard from './clipTitleCard';

class Clips extends React.Component {
    constructor(props) {
      super(props)
      this.cycle = this.cycle.bind(this)
      this.state = { idx: 0, rhythmFactor: 8,  titleCardVisible: false }
      this.intervalId = ''
      this.play = this.play.bind(this)
      this.timeOutID = 0
      this.titleCardTimeOutId = 1

      this.resetState = this.resetState.bind(this)

      this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
      let result = e.target.innerText.toLowerCase()

      switch (result){
        case "prev":
          this.cycle(false)
          this.play(this.props)
          break
        case "stop":
          clearTimeout(this.titleCardTimeOutId)
          clearTimeout(this.timeOutID)  
          break
        case "next":
          this.cycle()
          this.play(this.props)
          break
      }
    }

    cycle(ascend=true) {
      let {idx} = this.state
      let {clips} = this.props

      if (ascend) {
        if (idx === clips.length - 1) {
          this.setState({idx: 0})
        } else {
          this.setState({idx: idx + 1})
        }
      } else {
        if (idx === 0) {
          this.setState({idx: clips.length - 1})
        } else {
          this.setState({idx: idx - 1})
        }
      }
    }

    play(props) {
      let {tempo, clips} = props
      let {idx} = this.state
      let currentClip = clips[idx]
      // figure out when to cycle after duration
      if (!currentClip){ return }

      let bps = props.tempo / 60
      let duration = (Math.floor(currentClip.duration * bps * 2) / 2 )* (1 / bps) // rounded beats * beats / seconds


      console.log("currentClip.duration: ", currentClip.duration)
      console.log("flattened duration:", duration)

      //queuing the titlecard
      clearTimeout(this.titleCardTimeOutId)
      this.setState({titleCardVisible: true})
      this.titleCardTimeOutId = setTimeout((currentClip)=>{
        this.setState({titleCardVisible: false})
      }, 1 * bps * 1000) // x beats 

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
      if (nextProps.audioFeatures.id !== this.props.audioFeatures.id ) {
        this.resetState()
        this.cycle()
        this.play(nextProps)
      }

      if(nextProps.clips !== this.props.clips) {
        this.setState({idx: 0})
        this.play(nextProps)
      }
    }

    resetState(){
      this.setState({idx: 0, rhythmFactor: 8, nextIdx: 1, titleCardVisible: false })
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
          <div className="clips_control">
            <div onClick={this.handleClick}>Prev</div>
            <div onClick={this.handleClick}>Stop</div>
            <div onClick={this.handleClick}>Next</div>
          </div>
        </div>
      )
    }
}

export default Clips;
