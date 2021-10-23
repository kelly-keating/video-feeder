import React, { useState } from 'react'
import { connect } from 'react-redux'

import VideoCard from './VideoCard'

import { refreshFeeds } from '../api'

function VideoList ({ videos, uploadLinks, lastUpdated, uid }) {
  const [loading, setLoading] = useState(false)

  const refreshVids = () => {
    setLoading(true)
    refreshFeeds(uploadLinks, lastUpdated)
      .then(() => setLoading(false))
  }

  const renderVideos = () => {
    return (
      <div className="tile-container grid">
        {videos.map((video, i) => <VideoCard key={i} video={video} />)}
      </div>
    )
  }

  const d = new Date(lastUpdated)
  return (
    <div className="video-container" >
      <button onClick={refreshVids} disabled={loading}>Refresh</button>
      Last Updated - {d.getHours()}:{d.getMinutes()}:{d.getSeconds()} ({d.getDate()}/{d.getMonth() + 1}/{d.getFullYear()})
      {videos.length ? renderVideos() : <p>You have nothing left to watch!</p>}
    </div>
  )
}

function reduxToProps (state) {
  const sortedVids = Object.values(state.videos).sort((a, b) =>  new Date(b.publishedAt) - new Date(a.publishedAt))
  return {
    videos: sortedVids,
    uploadLinks: Object.values(state.feeds).map(data => data.uploads),
    lastUpdated: state.auth.user?.lastUpdated,
    uid: state.auth.uid
  }
}

export default connect(reduxToProps)(VideoList)
