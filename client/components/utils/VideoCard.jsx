import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'

import { delVideo } from '../../api/firebase/db'

function VideoCard ({ video }) {
  const published = moment(video.publishedAt)?.format('ddd DD MMM')
  const desc = video.description?.split('↵')[0]
  const blurb = (desc.length > 50) ? desc.substring(0, 50) + '...' : desc
  
  return (
    <div key={video.id} className="tile is-parent is-3">
      <div className="card">
        <div>
          <h4 className="title is-5">{video.title}</h4>
          <button onClick={() => delVideo(video.id)} className="button is-danger is-outlined">
            <span>Delete</span>
            <span className="icon is-small">
              <i className="fas fa-times"></i>
            </span>
          </button>
        </div>
        <div className="card-image">
          <img src={video.thumbnails?.medium.url} className="is-3-tablet" alt="Placeholder image" />
        </div>
        <div className="card-content">
          <p className="subtitle is-6"><Link to={'/feeds/' + video.feedId}>{video.channelTitle || 'Channel'}</Link></p>
          <p className="subtitle is-6">{published}</p>
          <div className="content">
            {blurb}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
