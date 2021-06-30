import React from 'react'
import { connect } from 'react-redux'

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
      {videos && renderVideos()}
    </div>
  )
}

function reduxToProps (state) {
  const sortedVids = [...state.videos].sort((a, b) =>  new Date(b.published) - new Date(a.published))
  return {
    videos: sortedVids
  }
}

export default connect(reduxToProps)(VideoList)
