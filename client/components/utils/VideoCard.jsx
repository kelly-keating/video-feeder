import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'

import { delVideo } from '../../api/firebase/db'

function VideoCard ({ video }) {
  const published = moment(video.publishedAt)?.format('ddd DD MMM')
  const desc = video.description?.split('↵')[0]
  const blurb = (desc.length > 100) ? desc.substring(0, 97) + '...' : desc
  
  return (
    <article className="card">
      <div className='card__heading'>
        <h4>{video.title}</h4>
        <button onClick={() => delVideo(video.id)} className="button is-danger is-outlined">
          <i className="fas fa-times"></i>
        </button>
      </div>
      <img src={video.thumbnails?.medium.url} className="is-3-tablet" alt="Placeholder image" />
      <div className="card__body">
        <div className="card__subtitle">
          <div className="card__subtitle_date">
            <p>{published}</p>
          </div>
          <div className="card__subtitle_feed">
            <p><Link to={'/feeds/' + video.feedId}>{video.channelTitle || 'Channel'}</Link></p>
          </div>
        </div>
        <hr></hr>
        <div className="card__body_content">
          <p>{blurb}</p>
        </div>
      </div>
    </article>
  )
}

export default VideoCard
