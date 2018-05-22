import React from 'react';

class GiphySearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = { searchStr: ''};
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({searchStr: e.currentTarget.value});
    }

    handleSubmit(e) {
        e.preventDefault()
        let {searchGiphy} = this.props
        searchGiphy(this.state.searchStr)
    }

    render() {
        return <div id="search_bar" >
            <div id="control_bar" onKeyPress={this.props.handleKeyPress}  tabIndex="2" >GIPHY</div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    <input type="text" value={this.state.searchStr} onChange={this.handleChange}  />
                </label>
                <input type="submit" value="SEARCH" />
            </form>
        </div>
    }
}

export default GiphySearchBar;
