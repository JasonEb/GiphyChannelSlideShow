import React from 'react'
import * as twitchUtil from '../../util/twitchApi.js'
import ReactTable from "react-table"
import ClipSearchBar from '../twitchClips/clipSearchBar'

class TwitchData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            game: "PLAYERUNKNOWN'S BATTLEGROUNDS",
            period: "month",
            vods: [],
            fetchedVods: [],
            offset: 0
        }
        this.launchChannel = this.launchChannel.bind(this)
        this.searchTwitch = this.searchTwitch.bind(this)
        this.fetchMore = this.fetchMore.bind(this)
        this.removeDuplicateChannels = this.removeDuplicateChannels.bind(this)
        this.resetResults = this.resetResults.bind(this)
    }

    componentDidMount() {
        document.body.style.setProperty('--main-bg', '#E6E6FA')
        document.title = "TwitchData"

        let {game, period} = this.state
        twitchUtil.fetchTopVideos(game, period, "").then((res) => {
            let {vods} = res
            this.setState({vods: vods, fetchedVods: [...vods], game: game, offset: vods.length})
        })
    }

    fetchMore() {
        let {game, period, offset} = this.state
        twitchUtil.fetchTopVideos(game, period, '', 100, offset)
        .then((VODSres) => {
            let {vods} = VODSres
            this.setState( (prevState) => {
                return { vods: [...prevState.fetchedVods, ...vods],
                    fetchedVods: [...prevState.fetchedVods, ...vods],
                    offset: prevState.offset + vods.length
                }
            })
        })
    }

    launchChannel(state, rowInfo, column, instance) {
        return {
            onClick: (e) => {
                let channel = rowInfo.original.channel.name
                this.props.history.push(`/clipbox?channel=${channel}`)
            }
        }
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
        let {offset, period} = this.state
        twitchUtil.searchGames(searchStr)
        .then( (searchRes) => {
            let game = searchRes.games[0].name
            twitchUtil.fetchTopVideos(game, period, '', 100, offset)
            .then((VODSres) => {
                let {vods} = VODSres
                this.setState( (prevState) => {
                    return { vods: vods,
                        game: game,
                        fetchedVods: [...vods],
                        offset: vods.length
                    }
                })
            })
        })
    }

    render() {
        let {vods, game, fetchedVods} = this.state
        return (<div className="twitch-data">
            <ClipSearchBar searchTwitch={this.searchTwitch} />

            <div className="twitch-data-menu">
                <button onClick={this.removeDuplicateChannels}>Remove Repeating Channels</button>
                <button onClick={this.resetResults}>Reset Results</button>
                <button onClick={this.fetchMore}>Fetch More Results</button>
            </div>
            <h1>Channels of the Top {fetchedVods.length} vods</h1>
            <h2>Game: {game}</h2>
            <ReactTable data={vods} getTdProps={this.launchChannel}
                columns={[
                    {Header:"Channel", columns:[
                        {Header: "Name", accessor: "channel.name"},
                        {Header: "Display Name", accessor: "channel.display_name"},
                        {Header: "Channel Views", accessor: "channel.views"},
                        {Header: "Followers", accessor: "channel.followers"},
                        {Header: "Language", accessor: "channel.language", filterable: true},
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
