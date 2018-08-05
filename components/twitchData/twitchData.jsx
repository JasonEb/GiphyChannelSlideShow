import React from 'react'
import * as twitchUtil from '../../util/twitchApi.js'
import ReactTable from "react-table"
import ClipSearchBar from '../twitchClips/clipSearchBar'

class TwitchData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            game: "Black Desert",
            vods: []
        }
        this.searchTwitch = this.searchTwitch.bind(this)
    }

    componentDidMount() {
        document.body.style.setProperty('--main-bg', '#E6E6FA')
        document.title = "TwitchData"
        twitchUtil.fetchTopVideos("PLAYERUNKNOWN'S%20BATTLEGROUNDS", "month", "").then((res) => {
            this.setState({vods: res.vods})
        })
    }

    searchTwitch(searchStr) {
        twitchUtil.searchGames(searchStr).then((searchRes) => {
            let game = searchRes.games[0].name
            twitchUtil.fetchTopVideos(game).then((VODSres)=>{
                this.setState({vods: VODSres.vods, game: game})
            })
        })
    }

    render() {
        let {vods} = this.state
        return (<div className="twitch-data">
            <ClipSearchBar searchTwitch={this.searchTwitch}/>
            <ReactTable data={vods}
                columns={[
                    {Header:"Channel", columns:[
                        {Header: "name", accessor: "channel.name"},
                        {Header: "Display Name", accessor: "channel.display_name"},
                        {Header: "Followers", accessor: "channel.followers"},
                        {Header: "views", accessor: "channel.views"},
                        {Header: "Language", accessor: "channel.language"},
                    ]}
                ]}
                className="-striped -highlight">
            </ReactTable>
        </div>
        )
    }
}

export default TwitchData
