import React from 'react'

import VideoCard from './VideoCard'

function VideoGrid({ videos }) {
  return (
    <div className="tile-container grid">
      {videos.map((video, i) => <VideoCard key={i} video={video} />)}
    </div>
  )
}

export default VideoGrid
