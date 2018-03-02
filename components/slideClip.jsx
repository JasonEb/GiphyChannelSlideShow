import React from 'react';
import $ from "jquery";

class SlideClip extends React.Component {
    constructor(props) {
      super(props)
      this.state = { visible: true,
        mixBlendMode: "hard-light",
        rhythm: 1, 
        beatDiv: 4, 
        flashMax: 3, 
        measures:8 }
      this.toggle = this.toggle.bind(this)
      this.flash = this.flash.bind(this)
    }

    toggle() {
      this.setState({visible: !this.state.visible})
    }

    flash() {
      let beatMs = 60000/(window.tempo);
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

    componentDidMount() {
      let beatMs = 60000/(window.tempo);
      let {measures} = this.state
      let id = setInterval( () => this.flash() , beatMs*measures); //beatMs represents the duration of slide noise clip
    }

    render() {
      let {url} = this.props
      let {visible, mixBlendMode} = this.state

      let style = {
        display: visible ? null : 'none',
        mixBlendMode: mixBlendMode,
        width: '100%',
        height: '70vh',
        position: 'absolute',
        backgroundImage: `url("${url}")`,
        backgroundSize: "contain",
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'black',
        backgroundPosition: 'center',
        zIndex: '91',
        marginTop: '5%',
        marginLeft: 'auto',
        marginRight: 'auto'
      }

      return <div id="slideClip" style={style}></div>
    }
  }

export default SlideClip;
