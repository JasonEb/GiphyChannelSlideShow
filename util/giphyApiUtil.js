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

export const fetchMyGiphys = (page="1") => {
    return $.ajax({
        method: 'GET',
        url: `https://giphy.com/api/v1/channels/2579919/gifs/?page=${page}`
    })
}

export const shuffle = (array) => {
    let i = 0
      , j = 0
      , temp = null
  
    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }

    return array
  }