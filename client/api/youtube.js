import request from 'superagent'
import { apiKey } from './firebase'

const YOUTUBE_API = 'https://www.googleapis.com/youtube/v3'
const API_KEY = apiKey

export function getYoutubeVideos (id) {
  return request
    .get(`${YOUTUBE_API}/playlistItems?key=${API_KEY}&playlistId=${id}&part=snippet,contentDetails&maxResults=50`)
    .then(req => req.body.items)
    .then(videos => videos.map(formatVideo))
}

// find by user details

export async function findYoutubeChannel (details) {
  const byId = await getChannelById(details)
  const byUser = await searchByUsername(details)
  const generalSearch = await searchForChannel(details)
  return byId || byUser || generalSearch || null
}

function searchForChannel(name) {
  return request
    .get(`${YOUTUBE_API}/channels?key=${API_KEY}&q=${name}&type=channel&part=snippet,contentDetails&fields=items`)
    .then(req => {
      console.log(req.body)
      return req
    })
    .then(req => req.body.items[0])
    .then(channel => formatChannel(channel))
    .catch(() => null)
}

function searchByUsername(name) {
  return request
    .get(`${YOUTUBE_API}/channels?key=${API_KEY}&forUsername=${name}&part=snippet,contentDetails`)
    .then(req => req.body.items[0])
    .then(channel => formatChannel(channel))
    .catch(() => null)
}

function getChannelById(id) {
  return request
    .get(`${YOUTUBE_API}/channels?key=${API_KEY}&id=${id}&part=snippet,contentDetails`)
    .then(req => req.body.items[0])
    .then(channel => formatChannel(channel))
    .catch(() => null)
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
