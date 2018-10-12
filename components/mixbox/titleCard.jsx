import React from 'react'
import GiphySearchBar from './giphySearchBar';

class TitleCard extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        let {artists, name} = this.props.currentTrack.item
        let text = []
        artists = artists.map( (artist) => { return artist.name}).join(", ")
        for (let i = 0; i < 4; i++) { text.push(<span key={i}>
            "{name}"
            <br/>
            {artists}
        </span>)}
        let style = {
            visibility: this.props.visibility ? "visible" : "hidden",
            mixBlendMode : this.props.blendMode
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
