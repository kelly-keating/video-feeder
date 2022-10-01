import React from 'react'
import { useNavigate } from 'react-router-dom'

// TODO: FEED GRID util
function FeedTile ({ info }) {
  const goTo = useNavigate()
  
  return (
    <div onClick={() => goTo(`/feeds/${info.id}`)}>
      <h4>{info?.title}</h4>
      <img src={info?.thumbnails.default.url} />
    </div>
  )
}

export default FeedTile
