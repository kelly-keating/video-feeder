import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'

import { removeVideo } from '../actions'
import { deleteVideo } from '../api/index'

function VideoCard ({ video, dispatch }) {
  const published = moment(video.published)
  const blurb = video.description.split('↵')[0]

  const deleteVid = () => {
    const {id} = video
    deleteVideo(id)
      .then(() => dispatch(removeVideo(id)))
  }

  return (
    <div key={video.id} className="tile is-parent is-3">
      <div className="card">
        <div className="card-image">
          <img src={video.thumbnails.medium.url} className="is-3-tablet" alt="Placeholder image" />
        </div>
        <div className="card-content">
          <p className="title is-5">{video.title}</p>
          <p className="subtitle is-6">{published.format('ddd DD MMM')}</p>
          <div className="content">
            {blurb}
          </div>
          <button onClick={deleteVid} className="button is-danger is-outlined">
            <span>Delete</span>
            <span className="icon is-small">
              <i className="fas fa-times"></i>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default connect()(VideoCard)
