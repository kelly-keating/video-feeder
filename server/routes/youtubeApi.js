const request = require('superagent')
const xml2jsParser = require('superagent-xml2jsparser')


function getChannelFeed (id) {
  return request
    .get('https://www.youtube.com/feeds/videos.xml?channel_id=' + id)
    .accept('xml')
    .buffer(true)
    .parse(xml2jsParser)
    .then(res => {
      const {feed} = res.body
      
      feed.id = feed["yt:channelId"][0]
      feed.title = feed.title[0]
      feed.published = feed.published[0]

      const {name, uri} = feed.author[0]
      feed.author = name[0]
      feed.uri = uri[0]

      feed.videos = feed.entry.map(entry => {
        const video = {}

        video.id = entry["yt:videoId"][0]
        video.title = entry.title[0]
        video.published = entry.published[0]
        video.updated = entry.updated[0]
        video.link = entry.link[0].$.href

        const media = entry["media:group"][0]
        const stats = media["media:community"][0]

        video.thumbnail = media["media:thumbnail"][0].$.url
        video.description = media["media:description"][0]
        video.content = media["media:content"][0].$

        video.views = stats["media:statistics"][0].$.views
        video.rating = stats["media:starRating"][0].$

        return video
      })

      delete feed["yt:channelId"]
      delete feed.link
      delete feed.$
      delete feed.entry

      return feed
    })
}

// .get('https://www.youtube.com/feeds/videos.xml?playlist_id=' + req.params.id)
// TODO: are playlists in a different format to channels?

module.exports = {
  getChannelFeed
}