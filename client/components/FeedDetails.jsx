import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function FeedDetails () {
  const { id } = useParams()
  const feed = useSelector((state) => state.feeds[id])
  
  return (
    <div>
      <h4>Feed Deets - {id}</h4>
      <p>{feed?.title}</p>
      <img src={feed?.thumbnails.high}/>
    </div>
  )
}

export default FeedDetails
