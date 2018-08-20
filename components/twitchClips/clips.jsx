import React from 'react';
import Clip from './clip';
import ClipTitleCard from './clipTitleCard';

class Clips extends React.Component {
    constructor(props) {
      super(props)
      this.cycle = this.cycle.bind(this)
      this.state = {rhythmFactor: 1,  titleCardVisible: false, cycleForward: true }
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
          break
        case "stop":
          clearTimeout(this.titleCardTimeOutId)
          clearTimeout(this.timeOutID)  
          break
        case "next":
          this.cycle()
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
      let {clips, setClipBoxState, currentClipIdx} = this.props
      let idx = currentClipIdx
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

      // this.setState({idx: newIdx})
      setClipBoxState({currentClipIdx: newIdx})
    }

    play(props) {
      let {tempo, clips, currentClipIdx} = props
      let currentClip = clips[currentClipIdx]
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
      }, duration * 1000)
    }

    componentDidMount() {
    }

    componentWillUnmount() {
      // let {intervalId} = this
      // clearInterval(intervalId)
    }

    componentDidUpdate(prevProps, prevState) {
      //set play for new set of clips
      if (prevProps.audioFeatures.id !== this.props.audioFeatures.id ) {
        this.resetState()
        this.cycle(this.state.cycleForward)
        // this.play(this.props)
      } else if(prevProps.clips !== this.props.clips) {
        this.props.setClipBoxState({currentClipcurrentClipIdx: 0})
        // this.play(this.props)
      } else if(prevProps.currentClipIdx !== this.props.currentClipIdx) {
        this.play(this.props)
      }
    }

    resetState(){
      this.setState({titleCardVisible: false })
      this.props.setClipBoxState({currentClipIdx: 0})
    }

    render() {
      let { clips, tempo, animated, currentClipIdx } = this.props
      let {titleCardVisible, cycleForward, rhythmFactor} = this.state
      let currentClip = clips[currentClipIdx]
      let style = {
        visibility: this.props.visibility ? "visible" : "hidden",
      }
      let bps = tempo / 60

      let clipAnimation = animated ? `bounce ${bps/rhythmFactor}s infinite linear` : ''

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
