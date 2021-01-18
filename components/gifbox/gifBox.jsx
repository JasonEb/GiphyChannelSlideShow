import React from 'react';
import * as spotifyUtil from '../../util/spotifyUtil'
import * as gifUtil from '../../util/giphyApiUtil'
import * as slideUtil from '../../util/sliderControls'
import Shuffle from 'shuffle-array'

import VhrOverlay from '../vhrOverlay/vhrOverlay'
import TwitchChat from '../twitchChat/twitchChat'
import TitleCard from '../mixbox/titleCard'
import GifSlide from '../mixbox/gifSlide'
import SlideClip from '../slideClip'
import GiphySearchCard from '../searchForms/giphySearchCard'

class GifBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //titlecard
            titleCardVisibility: true,
            titleCardBlendMode: 'unset',
            titleCardAnimation: '',
            twitchChatVisibility: false,
            twitchChatBlendMode: "hard-light",
            slideClipVisibility: true,
            searchVisible: false,
            slideClipBlendMode: 'unset',
            currentGiphyTerm: 'lofi',
            urls: []
        }

        this.sequenceTitleCardBehavior = this.sequenceTitleCardBehavior.bind(this)
        this.resetState = this.resetState.bind(this)
        this.ids = {}
        this.clearSequences = this.clearSequences.bind(this)
        this.fetchChannelGifs = this.fetchChannelGifs.bind(this)
        this.fetchMyChannelGifs = this.fetchMyChannelGifs.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.searchGiphy = this.searchGiphy.bind(this)
        this.fadeoutIdx = 0
    }

    clearSequences() {
        let id;
        for (id in this.ids) {
            clearTimeout(this.ids[id])
        }
        slideUtil.stopShow()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.audioFeatures.id !== this.props.audioFeatures.id) {
            this.resetState()
            this.searchGiphy(this.state.currentGiphyTerm)
            this.sequenceTitleCardBehavior(nextProps)
            console.table(nextProps.audioFeatures)
        }
    }

    componentDidMount() {
        document.body.style.setProperty('--main-bg', 'black')
        document.title = "MixBox"
        this.resetState()
        this.sequenceTitleCardBehavior(this.props)
        this.searchGiphy(this.state.currentGiphyTerm)

        let titleCardEl = document.getElementById("titleCard")
    }

    componentWillUnmount() {
        this.clearSequences()
    }

    fetchChannelGifs(id) {
        let offset = Math.floor(Math.random() * 75)
        gifUtil.fetchGiphyChannel(id, offset).then((res) => {
            let oldUrls = this.state.urls
            res.data.forEach((giphy) => oldUrls.push(giphy.images.original.url))
            this.setState({ urls: Shuffle(oldUrls) })
            // slideUtil.initializeShow(window.tempo)
        })
    }

    fetchMyChannelGifs(page = "1") {
        gifUtil.fetchMyGiphys(page).then((res) => {
            if (res.next) {
                page = res.next[res.next.length - 1]
                this.fetchMyChannelGifs(page)
            }
            let oldUrls = this.state.urls
            let newUrls = res.results.map((result) => { return result.images.original.url })
            this.setState({ urls: Shuffle([...oldUrls, ...newUrls]), currentGiphyTerm: "@scruggs" })
        })
    }

    handleKeyPress(e) {
        if (e.key === "`") {
            this.setState({ searchVisible: !this.state.searchVisible })
        }
    }

    resetState() {
        this.setState( (state) => { return {
            titleCardVisibility: true,
            titleCardBlendMode: 'unset',
            // titleCardAnimation: '',
            twitchChatVisibility: false,
            twitchChatBlendMode: "hard-light",
            searchVisible: false,
            slideClipBlendMode: 'unset',
            urls: Shuffle(state.urls)
            }
        })

        let titleCardEl = document.getElementById("titleCard")
        titleCardEl.style.mixBlendMode = "unset"
        titleCardEl.style.backgroundColor = "black"
    }

    sequenceTitleCardBehavior(props) {
        this.clearSequences()

        let {fadeoutIdx} = this
        let { sections } = props.audioAnalysis
        let titleCardEl = document.getElementById("titleCard")

        let section = sections.find((section) => {
            return section.start >= 10.0
        })
        console.log("intro section: ", section, section.start)
        let duration = section.start * 1000
        let progressMs = props.currentTrack.progress_ms
        let beatMs = 60000 / (section.tempo)
        let { networkDelay } = props

        //intro card
        console.log("Sequence set for ", props.currentTrack.item.name)
        console.log("netWorkDelay at sequenceTitleBehavior", networkDelay)
        let timestamp = duration - progressMs - networkDelay
        console.log("timestamp at gifBox: ", timestamp)

        //set fadeout immediately
        let titleCardAnimation = `fadeout${fadeoutIdx % 2 + 1} ${timestamp}ms ease-in ${timestamp}ms 1 running`
        this.fadeoutIdx++;
        titleCardEl.style.animation = titleCardAnimation

        //intro card effect
        this.ids.titleCardB = setTimeout(() => {
            titleCardEl.style.mixBlendMode = 'hard-light'
        }, timestamp / 2)

        // turn off title background color
        beatMs = 60000 / (section.tempo)
        this.ids.titleCardIntroA = setTimeout(() => {
            // this.setState({
            //     titleCardVisibility: false
            // })
            titleCardEl.style.backgroundColor = "transparent"
            titleCardEl.style.mixBlendMode = "unset"
        }, timestamp + 4*beatMs)

        // half way
        section = sections[Math.round(sections.length / 2)]
        timestamp = section.start * 1000 - networkDelay - progressMs

        this.ids.halfWayMarkA = setTimeout(() => {
            this.setState({
                slideClipBlendMode: 'hard-light',
                twitchChatVisibility: true
            })
            // slideUtil.initializeShow(section.tempo)
        }, timestamp)

        beatMs = 60000 / (section.tempo)
        this.ids.halfWayMarkB = setTimeout(() => {
            let { urls } = this.state
            let newUrls = [urls[0], ...Shuffle(urls.slice(1, urls.length - 1))]
            this.setState({
                twitchChatVisibility: false,
                urls: newUrls
            })
        }, timestamp + beatMs * 16)

        //outro
        section = sections[sections.length - 1]
        timestamp = section.start * 1000 - progressMs - networkDelay
        beatMs = 60000 / (section.tempo)

        this.ids.outro = setTimeout(() => {
            this.setState({ titleCardVisibility: true })
            titleCardAnimation = `fadeout${fadeoutIdx % 2 + 1} ${4 * beatMs}ms ease-in ${4 * beatMs}ms 1 running`
            titleCardEl.style.animationDirection = "reverse";

            timestamp = duration - progressMs - networkDelay
            this.ids.outroFadeOut = setTimeout( () => {titleCardEl.style.backgroundColor = "black";}, timestamp)
        }, timestamp)
    }

    searchGiphy(input = "", limit = "26") {
        let offset = Math.floor(Math.random() * 100)
        this.state.urls = []

        if (input === "@scruggs") {
            this.fetchMyChannelGifs()
        } else {
            // clear gif list
            gifUtil.fetchSearchTerms(input, limit, offset).then((res) => {
                let oldUrls = this.state.urls
                res.data.forEach((giphy) => {
                    let { url } = giphy.images.original

                    //filtering inappropriate gifs
                    if (gifUtil.filteredGiphy(url)) {
                        console.log("Skipped ", url)
                    } else {
                        oldUrls.push(url)
                    }
                })
                oldUrls = Shuffle(oldUrls)
                this.setState({ urls: oldUrls, currentGiphyTerm: input })
            })
        }
        if (this.state.searchVisible) { this.setState({ searchVisible: false }) }
    }

    render() {
        let { currentTrack, audioAnalysis, audioFeatures, networkDelay } = this.props
        let { titleCardVisibility, titleCardBlendMode,
            urls, searchVisible, titleCardAnimation,
            twitchChatBlendMode, twitchChatVisibility } = this.state

        let url = urls[0]
        // url = "https://media.giphy.com/media/REO8lAYODdm3C/giphy.gif"

    //     <div className="functions">
    //     <div onClick={() => { this.setState({ searchVisible: !this.state.searchVisible }) }}>Search</div>
    // </div>

        return <div id="slider" tabIndex="1" onKeyPress={this.handleKeyPress} >
            <VhrOverlay currentTrack={currentTrack}
                audioAnalysis={audioAnalysis} audioFeatures={audioFeatures} networkDelay={networkDelay} />
            <GiphySearchCard visible={searchVisible}
                searchGiphy={this.searchGiphy}
                handleKeyPress={this.handleKeyPress} />
            <TitleCard currentTrack={currentTrack}
                visibility={titleCardVisibility}
                blendMode={titleCardBlendMode}
                animation={titleCardAnimation}
            />

            <GifSlide url={url} visibility={true} />
            <TwitchChat visibility={twitchChatVisibility}
                currentTrack={currentTrack}
                blendMode={twitchChatBlendMode}
                searchGiphy={this.searchGiphy} />
        </div>
    }
}

export default GifBox;
