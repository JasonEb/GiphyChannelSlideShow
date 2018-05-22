import React from 'react'
import GiphySearchBar from './giphySearchBar'
import NavMenu from './navMenu'

class GiphySearchCard extends React.Component {

    render() {

        let visible = this.props.visible
        let style = {display: visible ? null : "none"}
        
        return <div id="search_card" style={style}>
            <GiphySearchBar 
                channelSelect={this.props.channelSelect}
                searchGiphy={this.props.searchGiphy}
                handleKeyPress={this.props.handleKeyPress} />
            
            <NavMenu />
        </div>
    }
  }

export default GiphySearchCard;
