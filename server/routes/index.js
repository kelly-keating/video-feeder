const express = require('express')
const router = express.Router()

const { getChannelFeed } = require('./youtubeApi')

// add a channel
  // verify channel id (on front end?)
  // add channel to db
  // get videos for that channel? or just refresh all?

// get all videos
  // get all channels from db
  // for each do a request
  // after, map and combine

module.exports = router