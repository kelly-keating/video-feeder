import request from 'superagent'

const YOUTUBE_API = 'https://www.googleapis.com/youtube/v3'
// const API_KEY = TODO: implement .env
const API_KEY = require('./api.json').yt_key

export function getYoutubeChannel (id = 'UC-7oMv6E4Uz2tF51w5Sj49w') {
  return request
    .get(`${YOUTUBE_API}/channels?key=${API_KEY}&id=${id}&part=snippet,contentDetails`)
    .then(req => req.body.items[0])
    .then(channel => formatChannel(channel))
}

export function getYoutubeVideos (id = 'UUxO_ya-RmAXCXJCU54AxYFw') {
  return request
    .get(`${YOUTUBE_API}/playlistItems?key=${API_KEY}&playlistId=${id}&part=snippet,contentDetails&maxResults=50`)
    .then(req => req.body.items)
    .then(videos => videos.map(formatVideo))
}

function formatChannel (channel) {
  const { title, description, customUrl, thumbnails } = channel.snippet
  const { uploads } = channel.contentDetails.relatedPlaylists
  return { 
    id: channel.id, 
    title, description, customUrl, thumbnails, uploads
  }
}

function formatVideo (vid) {
  const { videoId, videoPublishedAt } = vid.contentDetails
  const { title, description, channelId, thumbnails } = vid.snippet
  return {
    id: videoId,
    publishedAt: videoPublishedAt,
    feedId: channelId,
    title, description, thumbnails
  }
}
