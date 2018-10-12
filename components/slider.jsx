// import React from 'react';
// import SlideClip from './slideClip.jsx'
// import GifsList from './mixbox/gifsList'
// import * as gifUtil from '../util/giphyApiUtil.js' 
// // import TitleCard from './titleCard.jsx'
// import AudioFeaturesCard from './audioFeaturesCard.jsx'
// import GlitchLine from './glitchLine.jsx'
// import Shuffle from 'shuffle-array'
// // import GiphySearchCard from './mixbox/giphySearchCard'
// import VhrOverlay from './vhrOverlay/vhrOverlay'
// import * as spotifyUtil from '../util/spotifyUtil'

// import TwitchChat from './twitchChat/twitchChat'

// class Slider extends React.Component {
//     constructor(props){
//       super(props)
//       this.state = { urls: [], searchVisible: false, 
//         twitchChatVisibility: false,
//         twitchChatBlendMode: "hard-light",
//         titleCardVisibility: true,
//         titleCardBlendMode: 'unset',
//         gifsListVisibility: true,
//         slideClipVisibility: true,
//         slideClipBlendMode: 'unset',
//         audioFeaturesVisibility: false
//       }
//       this.fetchChannelGifs = this.fetchChannelGifs.bind(this)
//       this.fetchMyChannelGifs = this.fetchMyChannelGifs.bind(this)
//       this.searchGiphy = this.searchGiphy.bind(this)
//       this.handleKeyPress = this.handleKeyPress.bind(this)
//       this.channelSelect = this.channelSelect.bind(this)
//       this.updateCurrentlyPlaying = this.updateCurrentlyPlaying.bind(this)
//       this.sequenceCards = this.sequenceCards.bind(this)
//       this.shuffleCurrentCards = this.shuffleCurrentCards.bind(this)
//     }

//     fetchChannelGifs(id) {
//       let offset = Math.floor(Math.random()*75)
//       gifUtil.fetchGiphyChannel(id, offset).then( (res) => {
//         let oldUrls = this.state.urls
//         res.data.forEach( (giphy) => oldUrls.push(giphy.images.original.url) )
//         this.setState({urls: Shuffle(oldUrls)})
//         slideUtil.initializeShow(window.tempo)
//       })
//     }

//     fetchMyChannelGifs(page="1") {
//       let oldUrls;

//       gifUtil.fetchMyGiphys(page).then( (res) => {
//         if (res.next) {
//           page = res.next[res.next.length - 1]
//           return this.fetchMyChannelGifs(page)
//         }
//         oldUrls = this.state.urls
//         res.results.forEach( (giphy) => oldUrls.push(giphy.images.original.url) )
//         oldUrls = Shuffle(oldUrls)
//         this.setState({urls: oldUrls})
//         console.log("oldurls: ", oldUrls)
//         return slideUtil.initializeShow(window.tempo)
//       })
//     }

//     searchGiphy(input="", limit="128") {
//       let offset = Math.floor(Math.random()*100)
//       this.state.urls = []

//       // clear gif list
//       gifUtil.fetchSearchTerms(input, limit, offset).then( (res) => {
//         let oldUrls = this.state.urls
//         res.data.forEach( (giphy) => {
//           let {url} = giphy.images.original

//           //filtering inappropriate gifs
//           if (gifUtil.filteredGiphy(url)) { 
//             console.log("Skipped ", url)
//           } else {
//             oldUrls.push(url)
//           }
//         })
//         oldUrls = Shuffle(oldUrls)
//         this.setState({urls: oldUrls})
//         if (this.state.searchVisible) { this.setState({searchVisible: false})}
//         slideUtil.initializeShow(window.tempo)
//       })      
//     }

//     channelSelect(key) {
//       this.setState({ urls: [] })
//       switch (key) {
//         case "1":
//           this.fetchChannelGifs()
//           break;
//         case "2":
//           this.fetchChannelGifs("6343")
//           break;
//         case "3":
//           this.searchGiphy("`luigi stare`", "100")
//           break;
//         case "4":
//           this.searchGiphy("nintendo animation", "50")
//           break;
//         case "5":
//           this.searchGiphy("hanna barbera", "150")
//           break;
//         case "6":
//           this.searchGiphy("neon", "50")
//           break;
//         case "7":
//           this.searchGiphy("pixel sprite background", "150")
//           break;
//         case "8":
//         this.searchGiphy("tom and jerry", "100")
//           break;     
//       }
//     }

//     handleKeyPress (e) {
//       if (e.key === "`") {
//         this.setState({searchVisible: !this.state.searchVisible})
//       } else {
//         this.channelSelect(e.key)
//       } 
//     }

//     componentWillReceiveProps(nextProps) {
//       // this.fetchChannelGifs("6343")
//       // "6343" for horror gifs
//       // "7425" for pixel gifs
//       // "6191" for cartoony 
//       // check valence. If below a certain threshold, show "dark" show
//       // 0.360 is feels happiness

//       // let {valence, danceability, energy, tempo} = window.audioFeatures
//       // console.log("valence: ", valence, "danceability:", danceability, "energy: ", energy, "tempo: ", tempo)  

//       // this.updateCurrentlyPlaying()

//       // let rng = Math.floor(Math.random()*3)
//       // rng = rng <= 1 ? 0 : Math.ceil(Math.random()*6)
      
//       // switch (0) {
//       //   default:
//       //     // this.searchGiphy("flamingo", "110")
//       //     // this.searchGiphy("mario nintendo", "150")
//       //     // this.fetchMyChannelGifs()
//       //     this.searchGiphy("glitch", "150")
//       //     // this.fetchChannelGifs("7144")
//       //     // this.searchGiphy("glitch", "150")
//       //     this.fetchChannelGifs();
//       //     break;
//       //   case 2:
//       //     // this.searchGiphy("luigi stare", "150")
//       //     this.searchGiphy("ssbm", "150")
//       //     break;
//       //   case 3:
//       //     this.searchGiphy("nintendo animation", "200")
//       //     break;
//       //   case 4:
//       //     this.searchGiphy("neon", "150")
//       //     break;
//       //   case 5:
//       //     this.searchGiphy("pixel sprite background", "200")
//       //     break;
//       //   case 6:
//       //   this.searchGiphy("retro", "150")
//       //     break;
//       //   case 7:
//       //     //darkness gifs
//       //     this.fetchChannelGifs("6343")
//       //     break;
//       //   case 8:
//       //     this.searchGiphy("dogs", "200")
//       //     break; 
//       // }

//       // this.shuffleCurrentCards()
//       // this.sequenceCards()
//     }

//     updateCurrentlyPlaying () {
//       //periodically check track status
//       let tempo = this.props.audioFeatures.tempo

//       let checkInterval = 60000 / tempo * 12

//       // let self = this

//       setInterval( () => {
//         spotifyUtil.getCurrentTrack(()=>{}).then( (res) => {
//           let previousId = this.props.currentTrack.item.id
//           let newId = res.item.id

//           if (newId !== previousId) {
//             // todo update this
//             let idx = window.location.href.indexOf("/#")
//             // window.location = window.location.href.slice(0,idx)
//           }
//           this.setState({currentTrack: res})
//         })
//       }, checkInterval)
//     }
    
//     componentDidMount() {
//       console.log("Component mounted?")
//     }

//     sequenceCards(){
//       let {sections} = this.props.audioAnalysis
//       let section = sections.find( (section) => {
//         return section.start > 12
//       })
//       let duration = section.start * 1000
//       let progressMs = this.props.currentTrack.progress_ms
//       let beatMs = 60000/(section.tempo)
//       window.networkDelay = Date.now() - window.beginT
//       //intro card

//       duration = duration - progressMs - window.networkDelay
//       window.setTimeout(() => {
//         this.setState({
//           titleCardVisibility: false
//         })
//       }, duration)

//       //titleCard blend effect
//       window.setTimeout(()=>{
//           this.setState({titleCardBlendMode: "hard-light"})
//       }, duration / 2)

//       //half way
//       section = sections[ Math.floor(sections.length / 2)]

//       let timestamp = section.start * 1000
//       beatMs = 60000/(section.tempo)
//       progressMs = this.props.currentTrack.progress_ms
//       timestamp = timestamp - progressMs - window.networkDelay
//       window.setTimeout(() => {
//         this.setState({
//           twitchChatVisibility: true,
//           slideClipBlendMode: "hard-light"
//         })
//       }, timestamp)
//       window.setTimeout(() => {
//         this.setState({
//           twitchChatVisibility: false
//         })       
//       }, (timestamp + beatMs*32))

//       //0.75 the way
//       section = sections[ Math.floor(sections.length * 0.75)]
//       timestamp = section.start * 1000
//       timestamp = timestamp - progressMs - window.networkDelay
//       beatMs = 60000/(section.tempo)
//       window.setTimeout(() => {
//         this.setState({
//           audioFeaturesVisibility: true
//         })
//       }, timestamp)
//       window.setTimeout(() => {
//         this.setState({
//           audioFeaturesVisibility: false
//         })       
//       }, (timestamp + beatMs*16))

//       //outro 
//       section = sections[sections.length - 1]
//       timestamp = section.start * 1000 - progressMs - window.networkDelay
//       window.setTimeout(()=>{
//         this.setState({titleCardVisibility: true})
//       }, timestamp)
//     }
    
//     shuffleCurrentCards() {
//       this.setState({urls: Shuffle(this.state.urls)})
//     }

//     render() {
//       let { urls, searchCard, notShuffle } = this.state
//       let { titleCardVisibility,titleCardBlendMode, twitchChatVisibility, twitchChatBlendMode,
//         gifsListVisibility, slideClipVisibility, audioFeaturesVisibility, slideClipBlendMode
//        } = this.state

//       let {tempo} = window

//       let {artist, songTitle, bpm, currentTrack, audioAnalysis, audioFeatures} = this.props
//       // <img className="dj" src="https://media.giphy.com/media/9W3vciwN2JAsg/giphy.gif" />

//       // <TwitchChat visibility={twitchChatVisibility} currentTrack={currentTrack} blendMode={twitchChatBlendMode}
//       // searchGiphy={this.searchGiphy} shuffleCurrentCards={this.shuffleCurrentCards} />
//       //         <AudioFeaturesCard visibility={audioFeaturesVisibility} audioFeatures={audioFeatures} audioAnalysis={audioAnalysis} />
//       return <div id="slider" onKeyPress={this.handleKeyPress}  tabIndex="1" >
//         <VhrOverlay currentTrack={currentTrack} 
//           audioAnalysis={audioAnalysis} audioFeatures={audioFeatures}
//         />

//         <GiphySearchCard visible={this.state.searchVisible} 
//           channelSelect={this.channelSelect}
//           searchGiphy={this.searchGiphy}
//           handleKeyPress={this.handleKeyPress} />

//         <TitleCard artist={artist} songTitle={songTitle}
//           channelSelect={this.channelSelect}
//           searchGiphy={this.searchGiphy}
//           handleKeyPress={this.handleKeyPress}
//           visibility={titleCardVisibility}
//           blendMode={titleCardBlendMode} />

//         <GifsList gifUrls={urls.slice(1, 29)} tempo={tempo} visibility={gifsListVisibility} />
//         <SlideClip url={urls[0]} visibility={slideClipVisibility} blendMode={slideClipBlendMode}/>


//       </div>
//     }
//   }

// export default Slider;
