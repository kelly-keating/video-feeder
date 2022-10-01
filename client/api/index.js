import { getYoutubeVideos } from "./youtube"
import { addFeed, addVid, deleteFeed, deleteFeedFromGroup, saveFeedToGroup, setUpdated } from './firebase/db'

export function refreshFeeds(uploadLinks, lastUpdated) {
  const isNew = (d) => new Date(d) > new Date(lastUpdated)

  return Promise.all(uploadLinks.map(getYoutubeVideos))
    .then(allLinks => allLinks.flat())
    .then(vids => vids.filter(vid => isNew(vid.publishedAt)))
    .then(newVids => newVids.map(vid => addVid(vid.id, vid)))
    .then(completeAll)
    .then(() => setUpdated())
}

export function saveNewFeed(data, groups) {
  return addFeed(data.id, data)
    .then(() => groups.map(g => saveFeedToGroup(data.id, g)))
    .then(completeAll)
    .then(() => getYoutubeVideos(data.uploads))
    .then(vids => vids.map(vid => addVid(vid.id, vid)))
    .then(completeAll)
}

export function removeFeed(feed) {
  if(!feed.groups) return deleteFeed(feed.id)
  const groups = Object.keys(feed.groups)
  return deleteFeed(feed.id)
    .then(() => groups.map(g => deleteFeedFromGroup(feed.id, g)))
    .then(completeAll)
}

function completeAll (arr) {
  return arr.length ? Promise.all(arr) : Promise.resolve('Nothing to complete')
}
