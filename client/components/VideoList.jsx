import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { VideoGrid } from './utils'

import { refreshFeeds } from '../api'

function VideoList () {
  const videos = useSelector(redux => Object.values(redux.videos).sort((a, b) =>  new Date(b.publishedAt) - new Date(a.publishedAt)))
  const uploadLinks = useSelector(redux => Object.values(redux.feeds).map(feed => feed.uploads))
  const lastUpdated = useSelector(redux => redux.auth.user?.lastUpdated)
  const [loading, setLoading] = useState(false)
  
  const refreshVids = () => {
    setLoading(true)
    refreshFeeds(uploadLinks, lastUpdated)
    .then(() => setLoading(false))
  }

  const d = new Date(lastUpdated)

  return (
    <div className="video-container" >
      <button onClick={refreshVids} disabled={loading}>Refresh</button>
      Last Updated - {d.getHours()}:{d.getMinutes()}:{d.getSeconds()} ({d.getDate()}/{d.getMonth() + 1}/{d.getFullYear()})
      {videos.length ? <VideoGrid videos={videos} /> : <p>You have nothing left to watch!</p>}
    </div>
  )
}

export default VideoList
