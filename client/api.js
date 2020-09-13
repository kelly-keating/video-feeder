import request from 'superagent'

export function getChannelInfo(id) {
  return request
    .get('/v1/youtube/channel/' + id)
    .then(req => req.body)
}

export function getPlaylistFeed(id) {
  return request
    .get('/v1/youtube/playlist/' + id)
    .then(req => req.body)
}

export function getGroups() {
  return request
    .get('/v1/groups')
    .then(req => req.body)
}

export function addGroup(name) {
  return request
    .post('/v1/groups')
    .send({ name })
    .then(req => req.body[0])
}
