import $ from 'jquery'

export const setupHeaders = () => {
    //change this eventually
    let authToken = window.spotifyAuthToken;

    $.ajaxSetup({
        headers: { 'Content-Type': 'application/json',
                   'Accept': 'application/json',
                   'Authorization': `Bearer ${authToken}` }
    });
}

export const setAuthToken = (str) => {
    window.spotifyAuthToken = str;
};

export const getCurrentTrack = (fn) => {
    let succ = fn || function(res) { window.currentTrack = res }

    return $.ajax({
      method: 'GET',
      url: `https://api.spotify.com/v1/me/player/currently-playing`,
      success: succ
    })
};

export const getAudioAnalysis = (id, fn) => {
    let succ = fn || function(res) { window.audioAnalysis = res }

    return $.ajax({
        method: 'GET',
        url: `https://api.spotify.com/v1/audio-analysis/${id}`,
        success: succ
    }) 
}

export function getCurrentAudioAnalysis () {
    return getCurrentTrack().then( (res) => getAudioAnalysis(res.item.id))
}