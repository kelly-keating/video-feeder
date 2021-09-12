import React from 'react'

function FeedTile ({ chanInfo }) {
  return (
    <div>
      <h4>{chanInfo?.title}</h4>
      <img src={chanInfo?.thumbnails.default.url} />
    </div>
  )
}

export default FeedTile
