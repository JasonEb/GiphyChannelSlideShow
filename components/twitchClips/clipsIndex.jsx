import React from 'react'
import ReactTable from "react-table"

class ClipsIndex extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.handleHeaderClick = this.handleHeaderClick.bind(this)
    }

    componentDidMount() {
    }

    handleClick(state, rowInfo, column, instance) {
        let {setClipBoxState, searchTwitch} = this.props

        return {
            onClick: (e) => {
                let channel = rowInfo.original.broadcaster.name
                let clips = state.sortedData.map( (datum) => datum._original)
                if (column.Header === 'Channel'){
                    if (e.shiftKey){
                        let searchStr = `@${channel}, month`
                        searchTwitch(searchStr)
                    } else {
                    //remove channel
                    let results = state.data.filter( (clip) => clip.broadcaster.name !== channel )
                    //update state
                    setClipBoxState({clips: results})
                    }
                } else if (column.Header === 'Preview') {
                    // try finding new idx within the new clips
                    setClipBoxState({currentClipIdx: rowInfo.index, searchVisible: false, clips: clips })
                } else {
                    setClipBoxState({currentClipIdx: 0, searchVisible: false, clips: clips })
                }
            }
        }
    }

    handleHeaderClick({sorted}, rowInfo, column, instance) {
        console.log("sorted:", sorted)
        return ({
            sorted: sorted
        });
    }

    render() {
        let {clips} = this.props
        clips = clips.length === 0 ? [{broadcaster: "", views: 0, duration: 0, created_at: 0}] : clips

        let thumbnailCell = (row) => {
            let url = !!row.original.thumbnails ? row.original.thumbnails.tiny : ''
            return <img src={url} />
        }

        let columns = [
            {Header: "Preview", accessor: "thumbnail.small", Cell: thumbnailCell },
            {Header: "Channel", accessor: "broadcaster.name", filterable: true},
            {Header: "Game", accessor: "game"},
            {Header: "Language", accessor: "language", filterable: true},
            {Header: "Clip Title", accessor: "title"},
            {Header: "Views", accessor: "views"},
            {Header: "created_at", accessor: "created_at"},
            {Header: "Duration  ", accessor: "duration"}
        ]

        return <div className="clips_index">
                <ReactTable data={clips} 
                    columns={columns}
                    defaultPageSize={10}
                    getTdProps={this.handleClick}
                    previousText='🡄'
                    nextText='🡆'
                    showPageSizeOptions={false}
                    showPaginationTop={true}
                    showPaginationBottom={false}
                    getPaginationProps={() => ({className: "clips_pagination"})}
                />
        </div>
    }
}

export default ClipsIndex