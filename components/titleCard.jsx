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
        let max = Math.floor(Math.random() * 3);

        if (max == 1) {
            max = Math.floor(Math.random() * 4);
        } else {
            max = 3
        }
        
        for(let i=0;i<max;i++){
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
