import React from 'react'
import { useSelector } from 'react-redux'

function FeedDetails ({ match }) {
  const id = match.params.id
  const feed = useSelector((state) => state.feeds[id])

  console.log(feed)
  
  return (
    <div>
      <h4>Feed Deets - {id}</h4>
      <p>{feed?.title}</p>
      <img src={feed?.thumbnails.high}/>
    </div>
  )
}

export default FeedDetails
