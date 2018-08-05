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

export const fetchGameClips = (game, period='week', languages="", limit=100, cursor="") => {
    let langOptions = languages === "" ? "" : "&language=" + languages.trim().split("|").join(",")
    let cursorOption = cursor.length === 0 ? "" : `&cursor=${cursor}`
    let url = `https://api.twitch.tv/kraken/clips/top?game=${game}&limit=${limit}&period=${period}${langOptions}${cursorOption}`
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

export const getStreams = (game) => {
    let url = `https://api.twitch.tv/kraken/search/streams?query=${game}`

    let headers = { 'Client-ID': 'y82uc6i30qrmg0skrfoqkbv9hv66iz',
                'Accept': 'application/vnd.twitchtv.v5+json' }

    return $.ajax({
        method: 'GET',
        url: url,
        headers: headers
    })
}

export const fetchTopVideos = (game, period='week', languages="", limit=100 , cursor="") => {
    let langOptions = languages === "" ? "" : "&language=" + languages.trim().split("|").join(",")
    let url = `https://api.twitch.tv/kraken/videos/top?game=${game}&period=${period}${langOptions}&limit=${limit}`

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

// sorting vods results //
/*
let { vods } = res
vods.sort((a, b) => {
    const channelA = a.channel
    const channelB = b.channel

    let comparison = 0;
    if (channelA.views < channelB.views) {
        comparison = 1;
    } else if (channelA.views > channelB.views) {
        comparison = -1;
    }
    return comparison;
})
vods.forEach((stream) => {
    console.log("Channel: ", stream.channel.name, '\n' + 'Display Name: ', stream.channel.display_name, '\n' + 'Views:', stream.channel.views, '\n' + 'Language:', stream.channel.language)
})
*/