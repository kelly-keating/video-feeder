import request from 'superagent'

// YOUTUBE INTERACTIONS

export function getChannelInfo (id) {
  return request
    .get('/v1/youtube/channel/' + id)
    .then(req => req.body)
}

export function getPlaylistFeed (id) {
  return request
    .get('/v1/youtube/playlist/' + id)
    .then(req => req.body)
}

// DATABASE INTERACTIONS

export function getAllData () {
  return Promise.all([ getGroups(), getVideos(), getSubs() ])
    .then(all => {
      const [groups, videos, subs] = all
      return { groups, videos, subs }
    })
}

export function getVideos () {
  return request
    .get('/v1/videos')
    .then(res => res.body)
}

export function deleteVideo (id) {
  return request
    .delete('/v1/videos/' + id)
    .then(res => res.body)
}

export function getGroups () {
  return request
    .get('/v1/groups')
    .then(req => req.body)
}

export function addGroup (name) {
  return request
    .post('/v1/groups')
    .send({ name })
    .then(req => req.body)
}

export function getSubs () {
  return request
    .get('/v1/subs')
    .then(req => req.body)
}

export function addSubscription (subscription, videos) {
  return request
    .post('/v1/subs')
    .send({ subscription, videos })
    .then(req => req.body)
}

export function refreshFeeds () {
  return request
    .get('/v1/refresh')
    .then(req => req.body)
}
