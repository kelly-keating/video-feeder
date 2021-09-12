import React from 'react'
import { connect } from 'react-redux'

import VideoCard from './VideoCard'

// import { setUpdated } from './firebase/db'
import { refreshFeeds } from '../api'

function VideoList ({ videos, uploadLinks, lastUpdated, uid }) {

  const refreshVids = () => {
    refreshFeeds(uid, uploadLinks, lastUpdated)
    // setUpdated(uid)
  }

  const renderVideos = () => {
    return (
      <div className="tile is-ancestor">
        {videos.map((video, i) => <VideoCard key={i} video={video} />)}
      </div>
    )
  }

  const d = new Date(lastUpdated)
  return (
    <div className="video-container" >
      <button onClick={refreshVids}>Refresh</button>
      Last Updated - {d.getHours()}:{d.getMinutes()}:{d.getSeconds()} ({d.getDate()}/{d.getMonth() + 1}/{d.getFullYear()})
      {videos.length ? renderVideos() : <p>You have nothing left to watch!</p>}
    </div>
  )
}

function reduxToProps (state) {
  const sortedVids = Object.values(state.videos).sort((a, b) =>  new Date(b.publishedAt) - new Date(a.publishedAt))
  return {
    videos: sortedVids,
    uploadLinks: Object.values(state.feeds).map(data => data.uploadsId),
    lastUpdated: state.auth.user?.lastUpdated,
    uid: state.auth.uid
  }
}

export default connect(reduxToProps)(VideoList)
