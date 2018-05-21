import React from 'react';
import $ from "jquery";

class SlideClip extends React.Component {
    constructor(props) {
      super(props)
      this.state = { visible: true,
        rhythm: 1, 
        beatDiv: 4, 
        flashMax: 3, 
        measures:8 }
      this.toggle = this.toggle.bind(this)
      this.flash = this.flash.bind(this)
      this.loopId = 26
    }

    toggle() {
      this.setState({visible: !this.state.visible})
    }

    flash(tempo) {
      let beatMs = 60000/(tempo);
      let {rhythm,beatDiv, flashMax } = this.state
      let max = Math.floor(Math.random() * flashMax);

      for(let i = 0; i <= max; i++) {
        setTimeout(() => this.toggle(), (beatMs/ beatDiv) * i * rhythm)
        let extraKick = Math.floor(Math.random() * 4);
        if(extraKick === 0) {
          let time = (beatMs/ beatDiv) * i * rhythm 
          setTimeout(() => this.toggle(), time + (beatMs / 2))
        }
      }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.url !== this.props.url){
        clearInterval(this.loopId)
        let {measures} = this.state
        let beatMs = 60000 / nextProps.audioFeatures.tempo
        this.loopId = setInterval( () => this.flash(nextProps.audioFeatures.tempo) , beatMs*measures); 
      }
    }

    componentDidMount() {
      let beatMs = 60000/(this.props.audioFeatures.tempo);
      let {measures} = this.state
      this.loopId = setInterval( () => this.flash() , beatMs*measures); //beatMs represents the duration of slide noise clip
    }

    render() {
      let {url, audioFeatures } = this.props
      let beatMs = 60000/(audioFeatures.tempo);
      let {visible} = this.state

      let style = {
        display: visible ? null : 'none',
        mixBlendMode: this.props.blendMode,
        // animation: `swing linear ${beatMs*8}ms infinite`,
        width: '100%',
        height: '70vh',
        position: 'absolute',
        backgroundImage: `url("${url}")`,
        backgroundSize: "contain",
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'black',
        backgroundPosition: 'center',
        zIndex: '91',
        marginTop: '7vh',
        marginLeft: 'auto',
        marginRight: 'auto',
        visibility: this.props.visibility ? "visible" : "hidden"
      }

      return <div id="slideClip" style={style}></div>
    }
  }

export default SlideClip;
