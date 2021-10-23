import moment from 'moment'
import React from 'react'

import { delVideo } from '../api/firebase/db'

function VideoListItem ({ video }) {
  const published = moment(video.publishedAt)
  const desc = video.description?.split('↵')[0]
  const blurb = (desc.length > 50) ? desc.substring(0, 50) + '...' : desc

  const deleteVid = () => {
    const { id } = video
    delVideo(id)
  }
  
  return (
    <div key={video.id} className="list-item">
      <div className="list-item-image">
        <img src={video.thumbnails?.default.url} className="is-3-tablet" alt="Placeholder image" />
      </div>
      <div className="list-item-content">
        <p className="title is-5">{video.title}</p>
        <p className="subtitle is-6">{published?.format('ddd DD MMM')}</p>
      </div>
      <button onClick={deleteVid} className="button is-danger is-outlined">
        Delete
      </button>
    </div>
  )
}

export default VideoListItem
