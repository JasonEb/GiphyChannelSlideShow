import React from 'react';

class GiphySearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleKeyPress(e) {
        let {channelSelect} = this.props
        channelSelect(e.key)
    }

    handleSubmit(e) {
        e.preventDefault()
        let {searchGiphy} = this.props
        searchGiphy("street fighter")
    }
    // <div id="search_bar" onKeyPress={this.handleKeyPress} onSubmit={this.handleSubmit} tabIndex="1">
    //         <form>
    //             <label>
    //             Search:
    //             <input type="text" name="name" />
    //             </label>
    //             <input type="submit" value="Submit" />
    //         </form>
    //     </div>
    render() {
        return <div id="search_card">
            <div id="control_bar" onKeyPress={this.handleKeyPress}  tabIndex="1" >CHANNEL</div>
            <form onSubmit={this.handleSubmit}>
                <label><div>{String.fromCodePoint(0x1F50E)}</div>
                    <input type="text" name="name" />
                </label>
                <input type="submit" name="Submit" />
            </form>
        </div>
    }
}

export default GiphySearchBar;
