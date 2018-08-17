import React from 'react';
import Clip from './clip';
import ClipTitleCard from './clipTitleCard';

class Clips extends React.Component {
    constructor(props) {
      super(props)
      this.cycle = this.cycle.bind(this)
      this.state = { idx: 0, rhythmFactor: 4,  titleCardVisible: false, cycleForward: true }
      this.intervalId = ''
      this.play = this.play.bind(this)
      this.timeOutID = 1000
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
        case "forward":
          this.setState((prevState)=>({cycleForward: !prevState.cycleForward}))
          break
        case "reverse":
          this.setState((prevState)=>({cycleForward: !prevState.cycleForward}))
          break
      }
    }

    cycle(ascend=true) {
      let {idx} = this.state
      let {clips, setClipBoxState} = this.props
      let newIdx = 0

      if (ascend) {
        if (idx === clips.length - 1) {
          newIdx = 0
        } else {
          newIdx = idx + 1
        }
      } else {
        if (idx === 0) {
          newIdx = clips.length - 1
        } else {
          newIdx = idx - 1
        }
      }

      this.setState({idx: newIdx})
      setClipBoxState({currentClipIdx: newIdx})
    }

    play(props) {
      let {tempo, clips} = props
      let {idx} = this.state
      let currentClip = clips[idx]
      // figure out when to cycle after duration
      if (!currentClip){ return }

      let bps = tempo / 60
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
        this.cycle(this.state.cycleForward)
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
        this.cycle(this.state.cycleForward)
        this.play(nextProps)
      }

      if(nextProps.clips !== this.props.clips) {
        this.setState({idx: 0})
        nextProps.setClipBoxState({currentClipIdx: 0})
        this.play(nextProps)
      }
    }

    resetState(){
      this.setState({idx: 0, titleCardVisible: false })
    }

    render() {
      let { clips, tempo, animated } = this.props
      let {idx,titleCardVisible, cycleForward, rhythmFactor} = this.state
      let currentClip = clips[idx]
      let style = {
        visibility: this.props.visibility ? "visible" : "hidden",
      }
      let bps = tempo / 60

      let clipAnimation = animated ? `blur ${bps/rhythmFactor}s infinite, jerk ${bps/rhythmFactor}s infinite` : ''

      let clipStyle = {
        animation: clipAnimation
      }

      return(
        <div className="clips">
          <ClipTitleCard clip={currentClip} visibility={titleCardVisible} />
          <Clip clip={currentClip} style={clipStyle}/>
          <div className="clips_control">
            <div onClick={this.handleClick}>Prev</div>
            <div onClick={this.handleClick}>Stop</div>
            <div onClick={this.handleClick}>Next</div>
            <div onClick={this.handleClick}>{cycleForward ? "Forward" : "Reverse"}</div>
          </div>
        </div>
      )
    }
}

export default Clips;
