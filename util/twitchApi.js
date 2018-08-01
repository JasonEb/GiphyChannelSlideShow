import $ from 'jquery'

export const fetchChannelClips = (channel, period='week', language="", limit=100) => {
    period = period.toLowerCase()
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

export const fetchGameClips = (game, period='week', languages="", limit=100) => {
    let langOptions = languages === "" ? "" : "&language=" + languages.trim().split("|").join(",")
    let url = `https://api.twitch.tv/kraken/clips/top?game=${game}&limit=${limit}&period=${period}${langOptions}`
    let headers = { 'Client-ID': 'y82uc6i30qrmg0skrfoqkbv9hv66iz',
                'Accept': 'application/vnd.twitchtv.v5+json' }

    return $.ajax({
        method: 'GET',
        url: url,
        headers: headers
    })
}