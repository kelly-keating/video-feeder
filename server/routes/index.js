const express = require('express')
const router = express.Router()

const { getChannelFeed } = require('./youtubeApi')
const db = require('../db')

router.get('/refresh', (req, res) => {
  const now = new Date() 

  db.getSubscriptions()
    .then(subs => subs.map(sub => getChannelFeed(sub.id)))
    .then(updateCalls => Promise.all(updateCalls))
    .then(channels => [getUpdatedVids(channels), getNewVids(channels)])
    .then(funcArr => Promise.all(funcArr))
    .then(vidArr => {
      const [updatedVids, newVids] = vidArr
      const dbSafe = vidArr => vidArr.map(video => stringifyVideo(video))

      return updateAllVids(dbSafe(updatedVids))
        .then(() => newVids.length ? db.addVideos(dbSafe(newVids)) : [])
        .then(() => ({
          new: newVids,
          updated: updatedVids
        }))
    })
    .then(vidObj => db.setUpdated(JSON.stringify(now)).then(() => vidObj))
    .then(vidObj => res.json(vidObj))
    .catch(err => console.log(err.message))
})

router.get('/subs', (req, res) => {
  db.getSubscriptions()
    .then(subs => subs.map(sub => parseSub(sub)))
    .then(subs => res.json(subs))
    .catch(err => res.status(500).json({ err: err.message }))
})

router.post('/subs', (req, res) => {
  let { subscription, videos } = req.body

  subscription.group_id = subscription.groupId
  delete subscription.groupId
  videos = videos.map(video => stringifyVideo(video))

  const now = new Date()
  subscription.last_updated = JSON.stringify(now)

  db.subExists(subscription.id)
    .then(() => db.addSub(subscription))
    .then(() => videos.length ? db.addVideos(videos) : [])
    .then(() => res.json('yay'))
    .catch(err => {
      // TODO: ask Ross why this was needed to overwrite 'Internal Server Error'
      res.statusMessage = err.message
      res.status(500).json({ err: err.message })
    })
})

router.get('/videos', (req, res) => {
  db.getVideos()
    .then(videos => videos.map(vid => parseVideo(vid)))
    .then(videos => res.json(videos))
    .catch(err => res.status(500).json({ err: err.message }))
})

router.get('/groups', (req, res) => {
  db.getGroups()
    .then(groups => res.json(groups))
    .catch(err => res.status(500).json({ err: err.message }))
})

router.post('/groups', (req, res) => {
  db.addGroup(req.body.name)
    .then(ids => res.json(ids[0]))
    .catch(err => res.status(500).json({ err: err.message }))
})

module.exports = router

// ----- UTILS ----- 

function stringifyVideo (video) {
  video.content = JSON.stringify(video.content)
  video.rating = JSON.stringify(video.rating)
  return video
}

function parseVideo (video) {
  video.content = JSON.parse(video.content)
  video.rating = JSON.parse(video.rating)
  return video
}

function parseSub (sub) {
  sub.last_updated = JSON.parse(sub.last_updated)
  return sub
}

function makeOneArray (arrays) {
  return arrays.reduce((collector, arr) => [...collector, ...arr], [])
}

function getUpdatedVids (channels) {
  const channelUpdateFuncs = channels.map(channel => {
    const existenceChecks = channel.videos.map(vid => db.vidExists(vid.id).then(() => null).catch(() => vid))
    
    return Promise.all(existenceChecks)
      .then(existingVids => existingVids.filter(vid => vid !== null))
      .then(incoming => incoming.map((vid) => db.getVideoById(vid.id).then(orig => ({ orig, new: vid }))))
      .then(pairingFuncs => Promise.all(pairingFuncs))
      .then(pairs => pairs.filter(pair => pair.orig.updated !== pair.new.updated))
      .then(changedArr => changedArr.map(changed => changed.new))
  })
  return Promise.all(channelUpdateFuncs)
    .then(updatedVidArrs => makeOneArray(updatedVidArrs))
}

function getNewVids (channels) {
  const newVidFuncs = channels.map(channel => {
    return db.getLastUpdate(channel.id)
      .then(lastUpdate => channel.videos.filter(vid => new Date(vid.published) > new Date(JSON.parse(lastUpdate))))
  })
  return Promise.all(newVidFuncs)
    .then(newVidArrs => makeOneArray(newVidArrs))
}

function updateAllVids (vids) {
  const updates = vids.map(vid => db.updateVideo(vid.id, vid))
  return Promise.resolve( updates.length ? Promise.all(updates) : [])
}
