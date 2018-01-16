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
  window.spotifyAuthToken = "BQB8Hd4HkjsZ_QPKUr2v2ZQScKp88x2J9Mkbx9v9mnjuYzIdxrv-_FbxyHFwuXa0MZiKeGUfprvRQt3zCzW9mWNMy6BPV0_SU1i6TGH2AHXLodEW_4C33n4XMyN_JEELtnaw_vGaUPpe1XUhrCU9zpOF416Tub1vri-Te19bWpE"
  window.spotifyUtil = spotifyUtil;
  spotifyUtil.setupHeaders()
  spotifyUtil.getCurrentAudioAnalysis().then( () => {
    window.tempo = window.audioAnalysis.sections[1].tempo
    window.tempo = parseInt(window.tempo)
    console.log(`tempo set! ${window.tempo} bpm`)
  }).then( () => {slideUtil.initializeShow(window.tempo*2)} )
});
