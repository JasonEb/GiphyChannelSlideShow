import React from 'react'

class ClipsDisplay extends React.Component {
    constructor(props) {
        super(props)

        this.getClipPlayMode = this.getClipPlayMode.bind(this)
    }

    componentDidMount() {
    }

    getClipPlayMode(clipOrder) {
        let result = '⋱'
        switch (clipOrder) {
            case 'ascending':
                result = '⋱'
                break;
            case 'descending':
                result = '⋰'
                break;
            case 'shuffle':
                result = '⤨'
                break;
        }

        return result
    }

    render() {
        let {data} = this.props

        let clips = !!data ? data.clips : [{duration:0}]
        let currentClip = !!data ? data.currentClip : {}
        let currentClipIdx = !!data ? data.currentClipIdx : 0

        let clipsTotal = !!clips ? clips.length : 0
        let currentViews = !!currentClip ? currentClip.views : 0
        let clipOrder = !!data ? data.clipOrder : "descending"
        let playMode = this.getClipPlayMode(clipOrder)

        let clipsDuration = clips.slice(currentClipIdx, clips.length -1).reduce((a,b) => a + b.duration, 0)

        let hours = Math.floor(clipsDuration / 3600)
        let minutes = Math.floor((clipsDuration - (hours * 3600)) / 60)

        return <ul className="clips_display">
            <li>{playMode}</li>
            <li>✇ {currentClipIdx}</li>
            <li>⧖ {hours}h</li>
            <li>⧗ {minutes}m</li>
            <li>🖭 {clipsTotal}</li>
            <li>👁 {currentViews}</li>
        </ul>
    }
}

export default ClipsDisplay