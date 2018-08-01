import $ from 'jquery'

export const fetchChannelClips = (channel, period='week', limit=100, cursor="") => {
    period = period.toLowerCase()
    let cursorOption = cursor.length === 0 ? "" : `&cursor=${cursor}`

    let url = `https://api.twitch.tv/kraken/clips/top?channel=${channel}&limit=${limit}&period=${period}${cursorOption}` 
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

export const filterClips = (clips, days=1) => {
    let endDate = new Date()
    let beginDate = new Date()
    beginDate.setDate(beginDate.getDate() - days)

    let filtered = clips.filter((clip) => {
        let clipDate = new Date(clip.created_at)
        return (clipDate > beginDate && clipDate < endDate)
    })

    return filtered
}