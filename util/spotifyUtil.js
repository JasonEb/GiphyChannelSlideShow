import $ from 'jquery'

const setupHeaders = () => {
    let authToken = 'Bearer BQAGTnTHfop3nIMz7SYk-tDLTEbyMBQr72fb6yUpmmt8BhSfKf5umpT4eVLIVEKtnKAXFZXLYwd0tHtivhVtNJGLbcHWkUZ52Z_ZY7TsjuASSGL3lkbqPRJr1paYDCSg4EypRk6OQ5P7cgkmyfpd1aLvdRfjDV9T1J5Q1HRKvbU'

    $.ajaxSetup({
        headers: { 'Content-Type': 'application/json',
                   'Accept': 'application/json',
                   'Authorization': `${authToken}` }
    });
}

export const getCurrentTrack = () => {
    setupHeaders()

    return $.ajax({
      method: 'GET',
      url: `https://api.spotify.com/v1/me/player`
    })
};

export const getAudioAnalysis = (id) => {
    setupHeaders()

    return $.ajax({
        method: 'GET',
        url: `https://api.spotify.com/v1/audio-analysis/${id}`
    }) 
}

export const getCurrentAudioAnalysis = (id) => {
    return getCurrentTrack().then( (res) => {
        return getAudioAnalysis(res.item.id)
    })
}