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
  window.slideUtil.initializeShow(140);
  window.spotifyUtil = spotifyUtil;
});
