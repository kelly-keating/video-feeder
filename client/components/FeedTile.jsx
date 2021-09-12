import React from 'react'

function FeedTile ({ info }) {
  return (
    <div>
      <h4>{info?.title}</h4>
      <img src={info?.thumbnails.default.url} />
    </div>
  )
}

export default FeedTile
