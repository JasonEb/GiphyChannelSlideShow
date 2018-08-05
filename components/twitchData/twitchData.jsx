import React from 'react'
import * as twitchUtil from '../../util/twitchApi.js'
import ReactTable from "react-table"

class TwitchData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            game: "Black Desert",
            vods: []
        }
    }

    componentDidMount() {
        document.body.style.setProperty('--main-bg', '#E6E6FA')
        document.title = "TwitchData"
        twitchUtil.fetchTopVideos("PLAYERUNKNOWN'S%20BATTLEGROUNDS", "month", "").then((res) => {
            this.setState({vods: res.vods})
        })
    }

    render() {
        let {vods} = this.state
        return (<ReactTable data={vods}
            columns={[
                {Header:"Channel", columns:[
                    {Header: "name", accessor: "channel.name"},
                    {Header: "Display Name", accessor: "channel.display_name"},
                    {Header: "Followers", accessor: "channel.followers"},
                    {Header: "views", accessor: "channel.views"},
                    {Header: "Language", accessor: "channel.language"},
                ]}
            ]}
            className="-striped -highlight"
        >
        </ReactTable>)
    }
}

export default TwitchData
