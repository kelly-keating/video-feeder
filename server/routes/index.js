const express = require('express')
const router = express.Router()

const { getChannelFeed } = require('./youtubeApi')
const db = require('../db')

// add a channel
  // verify channel id (on front end?)
  // add channel to db
  // get videos for that channel? or just refresh all?

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