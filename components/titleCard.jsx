import React from 'react';

class TitleCard extends React.Component {
    render() {
        let {artist, songTitle} = this.props
        
        console.log(`Artist: ${artist}`)
        console.log(`Song: ${songTitle}`)
        return <div id="titleCard">TEST</div>
    }
  }

export default TitleCard;
