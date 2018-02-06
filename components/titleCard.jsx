import React from 'react'
import $ from "jquery";

class TitleCard extends React.Component {
    componentDidMount() {

        const turnOff = () => {
            $("#titleCard").hide()
        }

        let section = window.audioAnalysis.sections.find( (section) => {
          return section.start > 12
        })

        let duration = section.start * 1000

        let progressMs = window.currentTrack.progress_ms
        window.networkDelay = Date.now() - window.beginT
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
