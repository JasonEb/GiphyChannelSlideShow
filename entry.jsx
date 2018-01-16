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
/* Slide change - end code */

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  
  ReactDOM.render(<Slider/>, root);

  //test code intervals
  window.slideUtil = slideUtil;
  window.currentTrack = ""
  window.audioAnalysis = ""
  window.spotifyAuthToken = "BQCercWuTUgZar55EZPy7GZFJV9RasW7rz0hwYKBnpYefLK4IlonNxsZstHkYE9afdweM3C7HWwHEaeMqvdqmZIjOIsH4ijhkFZmVHW1R4ggvHPOQI7DmX_4xskCF_VqEoN5nLqgl3MQpDi9L4UQuljTFrmcDwO03Yl1IUIZGXo"
  window.spotifyUtil = spotifyUtil;
  spotifyUtil.setupHeaders()
  spotifyUtil.getCurrentAudioAnalysis().then( () => {
    window.tempo = window.audioAnalysis.sections[1].tempo
    window.tempo = parseFloat(window.tempo)
    console.log(`tempo set! ${window.tempo} bpm`)
  }).then( () => {
    slideUtil.initializeShow(window.tempo*2)
    let {name, artists} = window.currentTrack.item
    let artist = artists[0].name
    console.log(`Artist: ${artist}`)
    console.log(`Song: ${name}`)
    console.log(window.audioAnalysis.sections)

    //set a Timeout to refresh page for a new song
    let { currentTrack } = window
    let resetTime = currentTrack.item.duration_ms - currentTrack.progress_ms
    console.log("reset time: ", resetTime);
    const refreshPage = () => { location.reload() }
    setTimeout( refreshPage , resetTime )
  })
});
