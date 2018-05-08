import React from 'react'
import { Route, Switch, NavLink } from 'react-router-dom'

import Slider from './slider'

import * as spotifyUtil from '../util/spotifyUtil';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            spotifyAuthToken: '123test',
            currentTrack: {
                item: {duration_ms: 0, name: "", artists: [""], album: ""}
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
                    start:13,
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
    }
    
    setupSpotify() {
        let token = spotifyUtil.setAuthToken()
        this.setState({spotifyAuthToken: token})
        spotifyUtil.setAuthToken()

        spotifyUtil.getCurrentTrack().then( (res) => {
            spotifyUtil.getAudioFeatures(res.item.id, (res1) => {
                spotifyUtil.getAudioAnalysis(res.item.id, (res2)=>{
                    this.setState({currentTrack: res, audioFeatures: res1, audioAnalysis: res2})
                })
            })
        })
    }

    componentDidMount() {
        if (window.location.hash === '#/') {
            spotifyUtil.getAuthTokenImplicit()
          } else {
            this.setupSpotify()
        }
    }

    render() {
        let {currentTrack, audioAnalysis, audioFeatures} = this.state

        return (
            <div id="app">
                <Switch>
                <Route path="/" render={
                        (props) => <Slider {...props} currentTrack={currentTrack} audioAnalysis={audioAnalysis} audioFeatures={audioFeatures} />}
                    />
                </Switch>
            </div>
        )
    }
}

export default App

// <div className="navBar">
// <NavLink exact className="nav-item" activeStyle={{ fontWeight: 'bold' }} to='/'>Away Screen</NavLink>
// <NavLink className="nav-item" activeStyle={{ fontWeight: 'bold' }} to='/greenscreen'>Green Screen</NavLink>
// </div>

