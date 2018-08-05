import React from 'react'
import * as twitchUtil from '../../util/twitchApi.js'
import ReactTable from "react-table"
import ClipSearchBar from '../twitchClips/clipSearchBar'

class TwitchData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            game: "Black Desert",
            vods: [],
            fetchedVods: []
        }
        this.searchTwitch = this.searchTwitch.bind(this)
        this.removeDuplicateChannels = this.removeDuplicateChannels.bind(this)
        this.resetResults = this.resetResults.bind(this)
    }

    componentDidMount() {
        document.body.style.setProperty('--main-bg', '#E6E6FA')
        document.title = "TwitchData"

        let game = "PLAYERUNKNOWN'S%20BATTLEGROUNDS"
        twitchUtil.fetchTopVideos(game, "month", "").then((res) => {
            let {vods} = res
            this.setState({vods: vods, fetchedVods: [...vods], game: game})
        })
    }

    removeDuplicateChannels() {
        let {vods} = this.state
        let seen = {}, results = []

        vods.forEach( (vod) => {
            if (!seen[vod.channel.name]){
                seen[vod.channel.name] = true
                results.push(vod)
            }
        })

        this.setState({vods: results})
    }

    resetResults() {
        let {vods, fetchedVods} = this.state
        this.setState({vods: [...fetchedVods]})
    }

    searchTwitch(searchStr) {
        twitchUtil.searchGames(searchStr).then((searchRes) => {
            let game = searchRes.games[0].name
            twitchUtil.fetchTopVideos(game).then((VODSres) => {
                let {vods} = VODSres
                this.setState({vods: vods, game: game, fetchedVods: [...vods]})
            })
        })
    }

    render() {
        let {vods, game} = this.state
        return (<div className="twitch-data">
            <ClipSearchBar searchTwitch={this.searchTwitch} />

            <div className="twitch-data-menu">
                <button onClick={this.removeDuplicateChannels}>Remove Repeating Channels</button>
                <button onClick={this.resetResults}>Reset Results</button>
            </div>
            <h1>Top Channels</h1>
            <h2>Game: {game}</h2>
            <ReactTable data={vods}
                columns={[
                    {Header:"Channel", columns:[
                        {Header: "Name", accessor: "channel.name"},
                        {Header: "Display Name", accessor: "channel.display_name"},
                        {Header: "Followers", accessor: "channel.followers"},
                        {Header: "Channel Views", accessor: "channel.views"},
                        {Header: "Language", accessor: "channel.language"},
                        {Header: "Channel Game", accessor: "channel.game", filterable: true},
                        {Header: "VOD Game", accessor: "game",filterable: true}
                    ]}
                ]}
                className="-striped -highlight">
            </ReactTable>
        </div>
        )
    }
}

export default TwitchData
