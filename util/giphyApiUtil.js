import data1 from '../data/results_01.json'
import data2 from '../data/results_02.json'
import data3 from '../data/results_03.json'

// hack code to load json api. manually have to extract gif ids and construct gif url.

export const fetchLocalGifUrls = () => {
    let urls = [];
    let str = '';

    data1.results.forEach((gif) => {
        urls.push(`https://media.giphy.com/media/${gif.id}/giphy.gif`);
    });
    data2.results.forEach((gif) => {
        urls.push(`https://media.giphy.com/media/${gif.id}/giphy.gif`);
    });
    data3.results.forEach((gif) => {
        urls.push(`https://media.giphy.com/media/${gif.id}/giphy.gif`);
    });
    return urls;
}

export const fetchGiphyChannel = (id="2579919") => {
    // 6343 for matt horror work
    let url = `https://api.giphy.com/v1/channels/${id}/gifs?api_key=3eFQvabDx69SMoOemSPiYfh9FY0nzO9x&offset=0&limit=100`
    // let url = `https://api.giphy.com/v1/channels/${id}/gifs?api_key=cpHZy144063Z5Y1Y5yctNwoUmw8OjDIY&offset=0&limit=100`
    return $.ajax({
        method: 'GET',
        url: url
    })
}

export const fetchSearchTerms = (searchStr, limit="32") => {
    // 6343 for matt horror work
    let query = searchStr.replace(" ", "%20")
    let url = `https://api.giphy.com/v1/gifs/search?api_key=3eFQvabDx69SMoOemSPiYfh9FY0nzO9x&q=${query}&offset=0&limit=${limit}`
    return $.ajax({
        method: 'GET',
        url: url
    })
}

export const fetchMyGiphys = (page="1") => {
    return $.ajax({
        method: 'GET',
        url: `https://giphy.com/api/v1/channels/2579919/gifs/?page=${page}`
    })
}

export const filteredGiphy = (url) => {
    let list = {
        'https://media.giphy.com/media/pAtqeLnnedEY0/giphy.gif': true,
        'https://media.giphy.com/media/drDNlR1IfDCms/giphy.gif': true,
        'https://media.giphy.com/media/7Td9Of2U4y2s/giphy.gif' : true,
        'https://media.giphy.com/media/5rSGQoyTjYlvW/giphy.gif': true,
        'https://media.giphy.com/media/N9rNFHB72eIw/giphy.gif' : true,
        'https://media.giphy.com/media/JroPe9R0Wp19S/giphy.gif': true
    }
    
    return typeof list[url] === "undefined" ? false : true
}