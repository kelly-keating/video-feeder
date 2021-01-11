const express = require('express')
const router = express.Router()

const { getChannelFeed } = require('./youtubeApi')
const db = require('../db')

router.post('/subs', (req, res) => {
  let {subscription, videos} = req.body

  subscription.group_id = subscription.groupId
  delete subscription.groupId
  videos = videos.map(video => {
    video.content = JSON.stringify(video.content)
    video.rating = String(video.rating.average)
    return video
  })

  db.subExists(subscription.id)
    .then(() => db.addSub(subscription))
    .then(() => db.addVideos(videos))
    .then(() => res.json("yay"))
    .catch(err => {
      // TODO: ask Ross why this was needed to overwrite 'Internal Server Error'
      res.statusMessage = err.message
      res.status(500).json({ err: err.message })
    })
})

// get videos for a channel
  // get channel info from db
  // get all videos

// get all videos
  // get all channels from db
  // for each do a request
  // after, map and combine

router.get('/groups', (req, res) => {
  db.getGroups()
    .then(groups => res.json(groups))
    .catch(err => res.status(500).json({ err: err.message }))
})

router.post('/groups', (req, res) => {
  db.addGroup(req.body.name)
    .then(ids => res.json(ids))
    .catch(err => res.status(500).json({ err: err.message }))
})

module.exports = router