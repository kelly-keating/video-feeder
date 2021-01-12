import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'

class VideoList extends React.Component {
  renderCard = (video) => {
    const published = moment(video.published)

    return (
      <div key={video.id} className="tile is-parent is-3">
        <div className="card">
          <div className="card-image">
            <img src={video.thumbnail} className="is-3-tablet" alt="Placeholder image" />
          </div>
          <div className="card-content">
            <p className="title is-5">{video.title}</p>
            <p className="subtitle is-6">{published.format('ddd DD MMM')}</p>
            <div className="content">
              {video.description.split('\n')[0]}
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderVideos = () => {
    return (
      <div className="tile is-ancestor">
        {this.props.videos.map(video => this.renderCard(video))}
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
