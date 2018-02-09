import React from 'react';
import ReactDOM from 'react-dom';
import Slider from './components/slider.jsx';
import * as slideUtil from './util/sliderControls';
import $ from "jquery";
import slideClip from './components/slideClip';
import * as spotifyUtil from './util/spotifyUtil';

// og slider code
/* Glitch for slider */
window.intervals = [];
window.gifs = [];

// spotify implicit grant token


document.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash == '') {
    spotifyUtil.getAuthTokenImplicit()
  } else {
    spotifyUtil.setAuthToken()
  }
  const root = document.getElementById("root");

  //poll spotify for information first and send it as props to slider

  //setup
  window.slideUtil = slideUtil;
  window.currentTrack = ""
  window.audioAnalysis = ""
  window.spotifyUtil = spotifyUtil;
  window.$ = $;

  //begin polling
  spotifyUtil.setupHeaders()
  window.beginT = Date.now()

  spotifyUtil.getCurrentAudioAnalysisAndFeatures().then( () => {
    window.tempo = window.audioAnalysis.sections[1].tempo
    window.tempo = parseFloat(window.tempo)
    console.log(`tempo set! ${window.tempo} bpm`)

    let {name, artists} = window.currentTrack.item
    let artist = artists.map( (artist) => { return artist.name}).join(", ")

    const refreshPage = () => { location.reload() }

    console.log(window.audioAnalysis.sections)

    //set a Timeout to refresh page for a new song
    let { currentTrack } = window
    let resetTime = currentTrack.item.duration_ms - currentTrack.progress_ms
    console.log("reset time: ", resetTime/1000);
    setTimeout( refreshPage , resetTime )

    //at this point all audio analysis and features is fetched
    ReactDOM.render(<Slider artist={artist} songTitle={name} />, root)
    slideUtil.initializeShow(window.tempo)
  })
});
