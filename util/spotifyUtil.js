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

export const getAuthTokenImplicit = (url) => {
    // Get the hash of the url
    const hash = window.location.hash
        .substring(1)
        .split('&')
        .reduce(function (initial, item) {
                if (item) {
                    var parts = item.split('=');
                    initial[parts[0]] = decodeURIComponent(parts[1]);
                }
                return initial;
        }, {});
    window.location.hash = '';

    // Set token
    let _token = hash.access_token;

    const authEndpoint = 'https://accounts.spotify.com/authorize'
    
    // v 1.0 = 'a1725413073e48a697827b4895650356'
    // const clientId = '76838704e3d141acb61be1dbd05726b2'
    
    const clientId = 'a1725413073e48a697827b4895650356'
    
    const redirectUri = url
    // , 'playlist-modify-private', 'playlist-modify-public'
    const scopes = [
        'user-read-currently-playing'
    ]
    let scopeStr = encodeURIComponent(scopes.join(" "))
    // If there is no token, redirect to Spotify authorization
    // https://accounts.spotify.com/en/authorize?client_id=a1725413073e48a697827b4895650356&redirect_uri=http:%2F%2F127.0.0.1:8000&scope=user-read-currently-playing%20playlist-modify-private%20playlist-modify-public&response_type=token
    if (!_token) {
        window.location = `${authEndpoint}?&response_type=token&client_id=${clientId}&scope=${scopeStr}&redirect_uri=${redirectUri}`;
    }
}

// spotify info
// spotify:user:22evmk3v6uybspigu2xinbgey
// playlist:6ydEo5XgdHzRN3XHhg1TMw

export const setAuthToken = (str) => {
    window.spotifyAuthToken = str //ToDo remove this
    $.ajaxSetup({
        headers: { 'Content-Type': 'application/json',
                   'Accept': 'application/json',
                   'Authorization': `Bearer ${str}` }
    });

    return str
}

export const addSongToPlaylist = (spotifuUrl) => {
    return $.ajax({
        method: 'POST',
        url: `https://api.spotify.com/v1/me/player/currently-playing`
    })   
}

export const getCurrentTrack = (fn) => {
    let succ = fn || function(res) { window.currentTrack = res }

    return $.ajax({
      method: 'GET',
      url: `https://api.spotify.com/v1/me/player/currently-playing`,
      success: succ
    })
};

export const getAudioAnalysis = (id, fn) => {
    let succ = fn || function(res) {
        window.audioAnalysis = res
    }

    return $.ajax({
        method: 'GET',
        url: `https://api.spotify.com/v1/audio-analysis/${id}`,
        success: succ
    }) 
}

export const getAudioFeatures = (id, fn) => {
    let succ = fn || function(res) {
        window.audioFeatures = res
    }

    return $.ajax({
        method: 'GET',
        url: `https://api.spotify.com/v1/audio-features/${id}`,
        success: succ
    }) 
}

export function getCurrentAudioAnalysisAndFeatures () {
    return getCurrentTrack().then( (res) => {
        return getAudioAnalysisAndFeatures(res.item.id)
    })
}

export function getAudioAnalysisAndFeatures (id) {
    const getAnalysis = getAudioAnalysis(id)
    const getFeatures = getAudioFeatures(id)

    return $.when(getAnalysis, getFeatures)
}

