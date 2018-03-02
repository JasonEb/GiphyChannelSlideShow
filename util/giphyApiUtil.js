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
    let list = [
        'https://media.giphy.com/media/pAtqeLnnedEY0/giphy.gif',
        'https://media.giphy.com/media/drDNlR1IfDCms/giphy.gif',
        'https://media.giphy.com/media/7Td9Of2U4y2s/giphy.gif' ,
        'https://media.giphy.com/media/5rSGQoyTjYlvW/giphy.gif',
        'https://media.giphy.com/media/N9rNFHB72eIw/giphy.gif' ,
        'https://media.giphy.com/media/JroPe9R0Wp19S/giphy.gif',
        'https://media1.giphy.com/media/drDNlR1IfDCms/giphy.gif',
        'https://media2.giphy.com/media/5TT7baDXvhEiY/giphy.gif',
        'https://media2.giphy.com/media/AyPGV9CREcGMU/giphy.gif',
        'https://media2.giphy.com/mesdia/pAtqeLnnedEY0/giphy.gif',
        'https://media2.giphy.com/media/hxtdEflXBROBW/giphy.gif',
        'https://media3.giphy.com/media/hxtdEflXBROBW/giphy.gif',
        'https://media3.giphy.com/media/dduG6iRQp9MKk/giphy.gif',
        'https://media2.giphy.com/media/S9e5BERjHx45O/giphy.gif:',
        'https://media0.giphy.com/media/CG44ARqf8X20M/giphy.gif',
        'https://media.giphy.com/media/GXiasDXfP0j8Q/giphy.gif',
        'https://media.giphy.com/media/12NA6MjdxtoXL2/giphy.gif',
        'https://media.giphy.com/media/buSRHoRDSD6mc/giphy.gif',
        'https://media.giphy.com/media/qcTAxgEBkz41G/giphy.gif',
        'https://media.giphy.com/media/plOy8VYn4ZMGs/giphy.gif',
        'https://media.giphy.com/media/q4e1yUcoJW6c0/giphy.gif',
        'https://media.giphy.com/media/DBg0ahNm847v2/giphy.gif',
        'https://media.giphy.com/media/3o7aD8Ius3KlrU6W7S/giphy.gif',
        'https://media0.giphy.com/media/5rSGQoyTjYlvW/giphy.gif',
        'https://media2.giphy.com/media/eNMGwf0QEcxP2/giphy.gif',
        'https://media3.giphy.com/media/U7rWTHglrGY7u/giphy.gif',
        'https://media3.giphy.com/media/se9wkjIJGG0Ao/giphy.gif',
        
        //nintendo
        'https://media.giphy.com/media/N9rNFHB72eIw/giphy.gif',
        'https://media.giphy.com/media/S0dxdpIyDNOxi/giphy.gif',
        //neons
        'https://media.giphy.com/media/xUOxfaAKhzC0oiCOhG/giphy.gif',
        'https://media.giphy.com/media/3ohs82QgSrufH5ZdkI/giphy.gif',
        'https://media.giphy.com/media/3ohhwH5ID6da0StBsI/giphy.gif',
        'https://media.giphy.com/media/xUOxf3f85d9JvMrgIg/giphy.gif',
        'https://media.giphy.com/media/l1KdbJpTr5ou0kWB2/giphy.gif',
        'https://media.giphy.com/media/l44QtQcQ0JUozPmve/giphy.gif',
        'https://media.giphy.com/media/xThuWk6BrQheZMf1NS/giphy.gif'
    ]

    //extract id
    let idx = url.indexOf("/media/")
    var id = url.slice(idx + 7, url.length)

    return list.some((bannedUrl) => { return bannedUrl.includes(id) })
}