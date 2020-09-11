import request from 'superagent'

export function getChannelFeed(id) {
  return request
    .get('/v1/youtube/channel/' + id)
    .then(req => req.body)
}

export function getPlaylistFeed(id) {
  return request
    .get('/v1/youtube/playlist/' + id)
    .then(req => req.body)
}