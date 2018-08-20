import React from 'react'
import ClipSearchBar from './clipSearchBar'
import ClipsIndex from './clipsIndex'
import NavMenu from '../navMenu'

class ClipSearch extends React.Component {

    render() {

        let {visible, clips, setClipBoxState, searchTwitch, searchStr} = this.props

        let style = {display: visible ? null : "none"}

        return <div className="dash_board" style={style}>
            <div id="search_card">
                <ClipSearchBar
                    searchTwitch={this.props.searchTwitch}
                    handleKeyPress={this.props.handleKeyPress}
                    searchStr={searchStr} />
                <NavMenu />
            </div>

            <ClipsIndex clips={clips}
                searchTwitch={searchTwitch}
                setClipBoxState={setClipBoxState} />
        </div>
    }
}

export default ClipSearch;
