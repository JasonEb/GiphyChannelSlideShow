import React from 'react'
import ClipSearchBar from './clipSearchBar'
import NavMenu from '../navMenu'

class ClipSearch extends React.Component {

    render() {

        let visible = this.props.visible
        let style = {display: visible ? null : "none"}

        return <div id="search_card" style={style}>
            <ClipSearchBar
                searchTwitch={this.props.searchTwitch}
                handleKeyPress={this.props.handleKeyPress} />

            <NavMenu />
        </div>
    }
}

export default ClipSearch;
