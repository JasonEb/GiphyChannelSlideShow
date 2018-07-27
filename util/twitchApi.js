import $ from 'jquery'

export const fetchChannelClips = (channel, period='week', limit=50) => {
    let url = `https://api.twitch.tv/kraken/clips/top?channel=${channel}&limit=${limit}&period=${period}`

    let headers = { 'Client-ID': 'y82uc6i30qrmg0skrfoqkbv9hv66iz',
                'Accept': 'application/vnd.twitchtv.v5+json' }

    return $.ajax({
        method: 'GET',
        url: url,
        headers: headers
    })
}

export const searchGames = (game) => {
    let url = `https://api.twitch.tv/kraken/search/games?query=${game}`

    let headers = { 'Client-ID': 'y82uc6i30qrmg0skrfoqkbv9hv66iz',
                'Accept': 'application/vnd.twitchtv.v5+json' }

    return $.ajax({
        method: 'GET',
        url: url,
        headers: headers
    })
}    

export const fetchGameClips = (game, period='week', limit=50) => {
    //change this eventually
    
    let url = `https://api.twitch.tv/kraken/clips/top?game=${game}&limit=${limit}&period=${period}`

    let headers = { 'Client-ID': 'y82uc6i30qrmg0skrfoqkbv9hv66iz',
                'Accept': 'application/vnd.twitchtv.v5+json' }

    return $.ajax({
        method: 'GET',
        url: url,
        headers: headers
    })
}