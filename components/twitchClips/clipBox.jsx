import React from 'react'

import Clips from './clips'
import ClipSearch from './clipSearch'
import ClipsIndex from './clipsIndex'
import VhrOverlay from '../vhrOverlay/vhrOverlay'
import TwitchChat from '../twitchChat/twitchChat'

import * as twitchUtil from '../../util/twitchApi.js'
import Shuffle from 'shuffle-array'

class ClipBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            clips: [],
            searchVisible: false,
            currentStr: `super smash, day`,
            fetchedClips: [],
            clipOrder: 'descending',
            clipAnimated: false,
            clipsIndexVisibility: true,
            // twitch chat
            twitchChatVisibility: false,
            twitchChatBlendMode: "hard-light",
            currentClipIdx: 0
        }

        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.searchTwitch = this.searchTwitch.bind(this)
        this.shuffleClips = this.shuffleClips.bind(this)
        this.filterClips = this.filterClips.bind(this)
        this.fetchChannelClips = this.fetchChannelClips.bind(this)
        this.fetchGameClips = this.fetchGameClips.bind(this)
        this.resetClips = this.resetClips.bind(this)
        this.setClipBoxState = this.setClipBoxState.bind(this)
        this.reverseClips = this.reverseClips.bind(this)
    }

    componentDidMount() {
        document.body.style.setProperty('--main-bg', 'black')
        document.title = "ClipBox"

        let channel = this.props.location.search.substring("?channel=".length)

        if (channel.length === 0) {
            this.searchTwitch(this.state.currentStr)
        } else {
            this.searchTwitch('@' + channel)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.currentStr !== prevState.currentStr) {
            this.setState({ clips: [], fetchedClips: [], cursor: "", clipOrder: "descending", currentClipIdx: 0 })
        }
    }

    fetchChannelClips(channel, period, limit, cursor = "") {
        return twitchUtil.fetchChannelClips(channel, period, limit, cursor).then((fetchRes) => {
            let { clips, _cursor } = fetchRes
            this.setState((prevState) => {
                return {
                    clips: [...prevState.clips, ...clips],
                    searchVisible: false,
                    fetchedClips: [...prevState.clips, ...clips],
                    cursor: _cursor,
                    currentClipIdx: 0
                }
            })
        }).fail((e) => { e.abort() }) 
    }

    fetchGameClips(game, period, languages, limit, cursor = "") {
        return twitchUtil.fetchGameClips(game, period, languages, limit, cursor).then((fetchRes) => {
            let { clips, _cursor } = fetchRes
            this.setState((prevState) => {
                return {
                    clips: [...prevState.clips, ...clips],
                    searchVisible: false,
                    fetchedClips: [...prevState.clips, ...clips],
                    cursor: _cursor,
                    currentClipIdx: 0
                }
            })
        }).fail((e) => { e.abort() })
    }

    filterClips() {
        let { clips } = this.state
        let days = window.prompt("How many days?", 2)
        days = parseInt(days)
        let filtered = twitchUtil.filterClips(clips, days)
        return this.setState({ clips: filtered, idx: 0 })
    }

    handleKeyPress(e) {
        if (e.key === "`") {
            this.setState({ searchVisible: !this.state.searchVisible })
        }
    }

    searchTwitch(input = "") {
        // sample text string - "legend of zelda, week en 50"
        let array = input.split(",")
        let searchStr = array[0]
        let options = !!array[1] ? array[1].match(/\S+/g) : []
        let period = !!options[0] ? options[0].trim() : ""
        let languages = !!options[1] ? options[1].trim() : ""
        let limit = !!options[2] ? options[2].trim() : 100
        let { cursor } = this.state
        cursor = input === this.state.currentStr ? cursor : ''

        if (searchStr.startsWith("@")) {
            let channel = searchStr.substr(1, searchStr.length)
            this.fetchChannelClips(channel, period, limit, cursor)
        } else {
            twitchUtil.searchGames(searchStr).then((searchRes) => {
                let game = searchRes.games[0].name
                this.fetchGameClips(game, period, languages, limit, cursor)
            })
        }

        this.setState({ currentStr: input })
    }

    setClipBoxState(newState) {
        this.setState(newState)
    }

    resetClips() {
        this.setState((prevState, props) => ({ clips: [...prevState.fetchedClips], clipOrder: "descending", currentClipIdx: 0 }))
    }

    reverseClips() {
        let { clipOrder } = this.state
        clipOrder = clipOrder === "descending" ? "ascending" : "descending"

        this.setState((prevState, props) => ({
            clips: [...prevState.clips.reverse()],
            clipOrder: clipOrder,
            currentClipIdx: 0
        }))
    }

    shuffleClips() {
        this.setState((prevState, props) => ({ clips: [...Shuffle(prevState.clips)], clipOrder: "shuffle", currentClipIdx: 0 }))
    }


    render() {
        let { currentTrack, audioAnalysis, audioFeatures, networkDelay } = this.props
        let { clips, twitchChatBlendMode, 
          twitchChatVisibility, currentClipIdx,
          clipOrder, clipAnimated, currentStr } = this.state
        let { setClipBoxState } = this
        let clipsInfo = {
            currentClip: clips[currentClipIdx],
            clips: clips,
            currentClipIdx: currentClipIdx,
            clipOrder: clipOrder
        }


        return <div id="clip-box" tabIndex="1" onKeyPress={this.handleKeyPress}>
            <VhrOverlay currentTrack={currentTrack}
                audioAnalysis={audioAnalysis} audioFeatures={audioFeatures} networkDelay={networkDelay}
                clipsInfo={clipsInfo}
            />

            <ClipSearch visible={this.state.searchVisible}
                searchTwitch={this.searchTwitch}
                clips={clips}
                searchStr={currentStr}
                setClipBoxState={setClipBoxState} />

            <TwitchChat visibility={twitchChatVisibility}
                currentTrack={currentTrack}
                blendMode={twitchChatBlendMode}
                searchGiphy={() => { console.log("no giphy search") }}
                clipsInfo={clipsInfo}
            />

            <Clips clips={clips}
                setClipBoxState={setClipBoxState}
                tempo={this.props.audioFeatures.tempo}
                animated={clipAnimated}
                currentClipIdx={currentClipIdx}
                audioFeatures={audioFeatures} />


            <div className="functions">
                <div onClick={() => { this.searchTwitch(this.state.currentStr) }}>Fetch More</div>
                <div onClick={this.filterClips}>Filter By Days</div>
                <div onClick={this.reverseClips}>Reverse</div>
                <div onClick={() => { this.setState({ searchVisible: !this.state.searchVisible }) }}>Search</div>
                <div onClick={this.shuffleClips}>Shuffle</div>
                <div onClick={this.resetClips}>Reset</div>
            </div>
        </div>
    }
}

export default ClipBox;
