const express = require('express')
const router = express.Router()

const { getChannelFeed } = require('./youtubeApi')
const db = require('../db')

router.get('/refresh', (req, res) => {
  const now = new Date() 

  db.getSubscriptions()
    .then(subs => subs.map(sub => getChannelFeed(sub.id)))
    .then(updateCalls => Promise.all(updateCalls))
    .then(channels => channels.map(channel => db.getLastUpdate(channel.id)
        .then(lastUpdate => channel.videos.filter(vid => new Date(vid.published) > new Date(JSON.parse(lastUpdate))))
      ))
    .then(oldVidPurge => Promise.all(oldVidPurge)) 
    .then(newVidArrs => newVidArrs.reduce((collector, vidArr) => [...collector, ...vidArr], []))
    .then(newVids => newVids.length ? db.addVideos(newVids.map(video => stringifyVideo(video))).then(() => newVids) : [])
    .then(vids => db.setUpdated(JSON.stringify(now))
        .then(() => res.json(vids))
      )
    .catch(err => console.log(err.message))
     
    // for each channel, get updated, get new
    // with updated, update those vids
    // with new, add those vids
    // return (both? new?) to front end
    
  // TODO: update already existing videos?
})

router.post('/subs', (req, res) => {
  let { subscription, videos } = req.body

  subscription.group_id = subscription.groupId
  delete subscription.groupId
  videos = videos.map(video => stringifyVideo(video))

  const now = new Date()
  subscription.last_updated(JSON.stringify(now))

  db.subExists(subscription.id)
    .then(() => db.addSub(subscription))
    .then(() => db.addVideos(videos))
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
