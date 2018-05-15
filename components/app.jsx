import React from 'react'
import { Route, Switch, NavLink, withRouter} from 'react-router-dom'

import Slider from './slider'
import OverlaySlider from './overlaySlider'
import GifBox from './gifBox.jsx'

import * as spotifyUtil from '../util/spotifyUtil';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            spotifyAuthToken: '',
            networkDelay: Date.now(),
            currentTrack: {
                item: { duration_ms: 0, name: "", artists: [""], album: "", id: "initial"},
                progress_ms: 60000,
            },
            audioAnalysis: {
                bars: [{start: 0.26534, duration: 1.97734, confidence: 0.32}],
                beats: [{start: 0.26534, duration: 0.48953, confidence: 0.668}],
                sections: [{
                    confidence:1,
                    duration: 8.7619,
                    key:0,
                    key_confidence:0,
                    loudness:-11.28,
                    mode:1,
                    mode_confidence:0,
                    start:12,
                    tempo:120.54,
                    tempo_confidence:0.36,
                    time_signature:4,
                    time_signature_confidence:1
                },
                {
                    confidence:1,
                    duration: 8.7619,
                    key:0,
                    key_confidence:0,
                    loudness:-11.28,
                    mode:1,
                    mode_confidence:0,
                    start:17,
                    tempo:120.54,
                    tempo_confidence:0.36,
                    time_signature:4,
                    time_signature_confidence:1
                }],
                segments: [{
                    confidence: 0,
                    duration: 0.2126,
                    loudness_max: -15.81,
                    loudness_max_time: 0.0227,
                    loudness_start: -22.33,
                    pitches: [1,1],
                    timbre: [1,1],
                }]
            },
            audioFeatures: {
                "danceability" : 0.741,
                "energy" : 0.635,
                "key" : 9,
                "loudness" : -6.415,
                "mode" : 0,
                "speechiness" : 0.0355,
                "acousticness" : 0.0000212,
                "instrumentalness" : 0.771,
                "liveness" : 0.133,
                "valence" : 0.845,
                "tempo" : 131.993,
                "type" : "audio_features",
                "id" : "6bqpl6Hi7fVGycbPA55CmL",
                "uri" : "spotify:track:6bqpl6Hi7fVGycbPA55CmL",
                "track_href" : "https://api.spotify.com/v1/tracks/6bqpl6Hi7fVGycbPA55CmL",
                "analysis_url" : "https://api.spotify.com/v1/audio-analysis/6bqpl6Hi7fVGycbPA55CmL",
                "duration_ms" : 238182,
                "time_signature" : 4
              }
        }

        this.setupSpotify = this.setupSpotify.bind(this)
        this.spotifyWorker = this.spotifyWorker.bind(this)
        this.spotifyLoopId = 99
    }
    
    setupSpotify() {
        let token = window.location.hash.slice(14,182)
        this.setState({spotifyAuthToken: token})
        spotifyUtil.setAuthToken(token)

        //fill data
        
        spotifyUtil.getCurrentTrack().then( (res) => {
            let beginT = Date.now()
            spotifyUtil.getAudioFeatures(res.item.id, (res1) => {
                spotifyUtil.getAudioAnalysis(res.item.id, (res2)=>{
                    this.setState({currentTrack: res, 
                        audioFeatures: res1, audioAnalysis: res2, 
                        networkDelay: Date.now() - beginT})
                    let tempo = res2.sections[0].tempo
                    clearInterval(this.spotifyLoopId)
                    this.spotifyLoopId = this.spotifyWorker(tempo)
                })
            })
        })
    }

    spotifyWorker(tempo) {
        let beatMs = 60000 / tempo
        return setInterval(()=> {
            spotifyUtil.getCurrentTrack().then((res)=>{
                this.setState({currentTrack: res})
            })
        }, beatMs*8)
    }

    componentDidMount() {
        if (window.location.hash === '') {
            const returnUrl = 'http://127.0.0.1:8000'
            spotifyUtil.getAuthTokenImplicit(returnUrl)
          } else {
            this.setupSpotify()

            // figure out how to auto redirect routes...
            this.props.history.push("/gifbox")
        }
    }

    //todo
    // figure out why titlecard visibility is not working with beginT network delay
    
    componentDidUpdate(prevProps, prevState) {
        let currentTrack = this.state.currentTrack
        let prevTrack = prevState.currentTrack

        if (currentTrack.item.id !== prevTrack.item.id) { 
            //update state
            //clear loops

            //begin loops
            //initialize data
            
            spotifyUtil.getCurrentTrack().then( (res) => {
                let beginT = Date.now()
                spotifyUtil.getAudioFeatures(res.item.id, (res1) => {
                    spotifyUtil.getAudioAnalysis(res.item.id, (res2)=>{
                        this.setState({currentTrack: res, 
                            audioFeatures: res1, audioAnalysis: res2,
                            networkDelay: Date.now() - beginT })
                        let tempo = res2.sections[0].tempo
                        clearInterval(this.spotifyLoopId)
                        this.spotifyLoopId = this.spotifyWorker(tempo)
                    })
                })
            })
        }
        // return true      
    }

    render() {
        let {currentTrack, audioAnalysis, audioFeatures, spotifyAuthToken, networkDelay} = this.state
        let {initialSpotifyCall} = this
        // <Route path="/" render={
        //     (props) => <Slider {...props} currentTrack={currentTrack} audioAnalysis={audioAnalysis} audioFeatures={audioFeatures} />}
        // />
        return (
            <div id="app">
                <Switch>
                    <Route exact path="/gifbox" render={
                        (props) => <GifBox {...props} currentTrack={currentTrack} networkDelay={networkDelay} audioAnalysis={audioAnalysis} audioFeatures={audioFeatures} initialSpotifyCall={initialSpotifyCall} />}
                    />

                    <Route exact path="/overlay" render={
                        (props) => <OverlaySlider {...props} currentTrack={currentTrack} audioAnalysis={audioAnalysis} audioFeatures={audioFeatures}  />}
                    />
                </Switch>
            </div>
        )
    }
}

export default withRouter(App)

// <div className="navBar">
// <NavLink exact className="nav-item" activeStyle={{ fontWeight: 'bold' }} to='/'>Away Screen</NavLink>
// <NavLink className="nav-item" activeStyle={{ fontWeight: 'bold' }} to='/greenscreen'>Green Screen</NavLink>
// </div>

