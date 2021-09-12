import request from 'superagent'

import { getYoutubeVideos } from "./youtube"
import { addVid } from '../components/firebase/db'

// YOUTUBE INTERACTIONS

// export function getChannelInfo (id) {
//   return request
//     .get('/v1/youtube/channel/' + id)
//     .then(req => req.body)
// }

// export function getPlaylistFeed (id) {
//   return request
//     .get('/v1/youtube/playlist/' + id)
//     .then(req => req.body)
// }

// DATABASE INTERACTIONS

export function refreshFeeds(userId, uploadLinks, lastUpdated) {
  const isNew = (d) => (d - lastUpdated) > 0

  return Promise.all(uploadLinks.map(getYoutubeVideos))
    .then(allLinks => allLinks.flat())
    .then(vids => vids.filter(vid => isNew(vid)))
    .then(newVids => newVids.map(vid => addVid(userId, vid.id, vid)))
    .then(arr => arr.length ? Promise.all(arr) : Promise.resolve('No new vids'))
}
