import React from 'react'
import $ from "jquery";

class TitleCard extends React.Component {
    super(props) {
        this.state = { on: false }
        this.toggle = this.toggle.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount() {

        const turnOff = () => {
            $("#titleCard").hide()
        }
        
        let duration = window.audioAnalysis.sections[0].duration * 1000
        let progressMs = window.currentTrack.progress_ms
        duration = duration - progressMs - window.networkDelay
        window.setTimeout(turnOff, duration)

        //glitch up colors
        for(let i=0;i<4;i++){
            $('.glitch .text span').eq(0).clone().prependTo('.glitch .text');
        }
    }

    render() {
        let {artist, songTitle} = this.props
        return <section id="titleCard">
            <div className="glitch">
                <div className="text">
                    <span>
                    "{songTitle}"
                    <br/>
                    {artist}
                    </span>
                </div> 
                
            </div>
        </section>
    }
  }

export default TitleCard;
