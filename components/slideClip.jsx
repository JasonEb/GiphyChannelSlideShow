import React from 'react';
import $ from "jquery";

class SlideClip extends React.Component {
    constructor(props) {
      super(props)
      this.state = { visible: false, rhythm: 1, beatDiv: 4, flashMax: 7, measures: 16}
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
      }
      console.log("rhythm,beatDiv, flashMax" ,rhythm,beatDiv, flashMax)
    }

    componentDidMount() {
      let beatMs = 60000/(window.tempo);
      let {measures} = this.state
      let id = setInterval( () => this.flash() , beatMs*measures); //beatMs represents the duration of slide noise clip
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
