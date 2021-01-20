import React from 'react'
import { connect } from 'react-redux'

import VideoCard from './VideoCard'

class VideoList extends React.Component {

  renderVideos = () => {
    return (
      <div className="tile is-ancestor">
        {this.props.videos.map((video, i) => <VideoCard key={i} video={video} />)}
      </div>
    )
  }

  render () {
    return (
      <div className="video-container" >
        {this.props.videos && this.renderVideos()}
      </div>
    )
  }
}

function reduxToProps (state) {
  const sortedVids = [...state.videos].sort((a, b) =>  new Date(b.published) - new Date(a.published))
  return {
    videos: sortedVids
  }
}

export default connect(reduxToProps)(VideoList)
