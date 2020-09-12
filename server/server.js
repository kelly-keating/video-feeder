const path = require('path')
const express = require('express')

const youtubeRoutes = require('./routes/youtube')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/v1/youtube', youtubeRoutes)

module.exports = server
