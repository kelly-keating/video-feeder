import React from 'react'
import { connect } from 'react-redux'

import { firebaseConfig } from './firebase'

import VideoCard from './VideoCard'

function VideoList ({ videos }) {

  const renderVideos = () => {
    return (
      <div className="tile is-ancestor">
        {videos.map((video, i) => <VideoCard key={i} video={video} />)}
      </div>
    )
  }

  return (
    <div className="video-container" >
      <button onClick={() => console.log('boop')}>Refresh</button>
      {videos.length ? renderVideos() : <p>You have nothing left to watch!</p>}
    </div>
  )
}

function reduxToProps (state) {
  const sortedVids = Object.values(state.videos).sort((a, b) =>  new Date(b.publishedAt) - new Date(a.publishedAt))
  return {
    videos: sortedVids
  }
}

export default connect(reduxToProps)(VideoList)
