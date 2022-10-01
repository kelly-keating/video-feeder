import React from 'react'
import { useNavigate } from 'react-router-dom'

function FeedTile ({ feed }) {
  const goTo = useNavigate()
  
  return (
    <div onClick={() => goTo(`/feeds/${feed.id}`)}>
      <h4>{feed.title}</h4>
      <img src={feed.thumbnails.default.url} />
    </div>
  )
}

export default FeedTile
