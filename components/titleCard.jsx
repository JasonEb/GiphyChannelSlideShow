import React from 'react'
import GiphySearchBar from './giphySearchBar';

class TitleCard extends React.Component {
    constructor(props){
        super(props)
        this.state = {visible: true, mixBlendMode: "normal"}
        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.setState({visible: !this.state.visible})
    }

    componentDidMount() {
        let {sections} = window.audioAnalysis
        let section = sections.find( (section) => {
          return section.start > 12
        })
        let duration = section.start * 1000
        let progressMs = window.currentTrack.progress_ms

        //intro card
        window.networkDelay = Date.now() - window.beginT
        duration = duration - progressMs - window.networkDelay
        window.setTimeout(this.toggle, duration)

        //titleCard blend effect
        window.setTimeout(()=>{
            this.setState({mixBlendMode: "hard-light"})
        }, duration / 2)
        //outro 
        section = sections[sections.length - 1]
        let timeStamp = section.start * 1000 - progressMs - window.networkDelay
        window.setTimeout(this.toggle, timeStamp)
    }

    render() {
        let {artist, songTitle} = this.props
        let text = []
        for(let i = 0; i < 4; i++) { text.push(<span key={i}>
            "{songTitle}"
            <br/>
            {artist}
        </span>)
        }
        let {visible, mixBlendMode} = this.state
        let style = {
            display: visible ? null : "none",
            mixBlendMode : mixBlendMode
        }

        return <section id="titleCard" style={style}>
            <div className="glitch">
                <div className="text">
                    {text}
                </div>
            </div>
        </section>
    }
  }

export default TitleCard;
