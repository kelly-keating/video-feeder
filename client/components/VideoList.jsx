import React from 'react'
import { connect } from 'react-redux'
import request from 'superagent'

import { firebaseConfig } from './firebase'
import { private_key } from '../../_docs/api.json'

import VideoCard from './VideoCard'

function VideoList ({ videos }) {

  const getVideos = () => {
    const key = private_key
    const url = firebaseConfig.databaseURL + '/users.json?auth=' + key
    request.get(url)
      .then(r => console.log(r))
      .catch(e => console.log('ERROR', e.message))
  }

  const renderVideos = () => {
    return (
      <div className="tile is-ancestor">
        {videos.map((video, i) => <VideoCard key={i} video={video} />)}
      </div>
    )
  }

  return (
    <div className="video-container" >
      <button onClick={getVideos}>Refresh</button>
      {videos.length ? renderVideos() : <p>You have nothing left to watch!</p>}
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
