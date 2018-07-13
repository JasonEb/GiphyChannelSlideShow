import $ from 'jquery'

export const fetchClips = (channel) => {
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