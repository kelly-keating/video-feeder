import request from 'superagent'
import { apiKey } from './firebase'

const YOUTUBE_API = 'https://www.googleapis.com/youtube/v3'
const API_KEY = apiKey

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
  const channelObj = { 
    id: channel.id, 
    title, description, thumbnails, uploads
  }
  if(customUrl) channelObj.customUrl = customUrl
  return channelObj
}

function formatVideo (vid) {
  const { videoId, videoPublishedAt } = vid.contentDetails
  const { title, description, channelId, thumbnails, channelTitle } = vid.snippet
  return {
    id: videoId,
    publishedAt: videoPublishedAt,
    feedId: channelId,
    title, description, thumbnails, channelTitle
  }
}
