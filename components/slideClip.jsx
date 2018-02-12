import React from 'react';
import $ from "jquery";

class SlideClip extends React.Component {
    constructor(props) {
      super(props)
      this.state = { visible: false }
      this.toggle = this.toggle.bind(this)
      this.flash = this.flash.bind(this)
    }

    toggle() {
      this.setState({visible: !this.state.visible})
    }

    flash() {
      console.log("Flash")
      let beatMs = 60000/(window.tempo);
      let max = Math.floor(Math.random() * 7);

      for(let i = 1; i <= max; i++) {
        setTimeout(() => this.toggle(), (beatMs/ 4)*i)
      }
    }

    componentDidMount() {
      let beatMs = 60000/(window.tempo);
      let id = setInterval( () => this.flash() , beatMs*8); //beatMs represents the duration of slide noise clip
    }

    render() {
      let {url} = this.props
      let {visible} = this.state

      let style = {
        display: visible ? null : 'none',
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundImage: `url("${url}")`,
        backgroundSize: "100%, cover",
        zIndex: '90'
      }

      return <div id="slideClip" style={style}></div>
    }
  }

export default SlideClip;
