import React from 'react'
import { connect } from 'react-redux'


class VideoList extends React.Component {

  renderVideos() {
    return (
      <div className="tile is-ancestor">
        {this.props.videos.map(video => (
          <div key={video.id} className="tile is-parent is-3">
            <div className="card">
              <div className="card-image">
                <img src={video.thumbnail}  className="is-3-tablet" alt="Placeholder image" />
              </div>
              <div className="card-content">
                <p className="title is-5">{video.title}</p>
                <p className="subtitle is-6">{new Date(video.published).toLocaleString()}</p>
                <div className="content">
                  {video.description.split('\n')[0]}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
 
  render() {
    return (
      <div className="video-container" >
        {this.props.videos && this.renderVideos()}
      </div>
    )
  }
}

function reduxToProps(state) {
  return {
    videos: state.videos
  }
}

export default connect(reduxToProps)(VideoList)
