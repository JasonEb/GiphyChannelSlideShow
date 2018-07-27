import $ from 'jquery'

export const fetchChannelClips = (channel) => {
    //change this eventually
    
    let url = `https://api.twitch.tv/kraken/clips/top?channel=${channel}&limit=50`

    let headers = { 'Client-ID': 'y82uc6i30qrmg0skrfoqkbv9hv66iz',
                'Accept': 'application/vnd.twitchtv.v5+json' }

    return $.ajax({
        method: 'GET',
        url: url,
        headers: headers
    })
}

export const searchGames = (game) => {
    let url = `https://api.twitch.tv/kraken/search/games?query=${game}&period=month&limit=100`

    let headers = { 'Client-ID': 'y82uc6i30qrmg0skrfoqkbv9hv66iz',
                'Accept': 'application/vnd.twitchtv.v5+json' }

    return $.ajax({
        method: 'GET',
        url: url,
        headers: headers
    })
}    

export const fetchGameClips = (game) => {
    //change this eventually
    
    let url = `https://api.twitch.tv/kraken/clips/top?game=${game}&limit=50`

    let headers = { 'Client-ID': 'y82uc6i30qrmg0skrfoqkbv9hv66iz',
                'Accept': 'application/vnd.twitchtv.v5+json' }

    return $.ajax({
        method: 'GET',
        url: url,
        headers: headers
    })
}