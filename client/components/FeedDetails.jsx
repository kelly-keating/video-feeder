import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { removeFeed } from '../api'

function FeedDetails () {
  const goTo = useNavigate()
  const { id } = useParams()
  const feed = useSelector((state) => state.feeds[id])

  const [showConfirmation, setShowConfirmation] = useState(false)
  const toggleConfirm = () => setShowConfirmation(!showConfirmation)

  const unsubscribe = () => {
    removeFeed(feed)
      .then(() => goTo('/'))
  }

  return (
    <div>
      <h4>Feed Deets - {id}</h4>
      <p>{feed?.title}</p>
      {showConfirmation ?
      <>
        <button onClick={unsubscribe}>Unsubscribe</button>
        <button onClick={toggleConfirm}>Cancel</button>
      </>
      :
      <button onClick={toggleConfirm}>Remove feed</button>
      }
      <img 
        src={feed?.thumbnails.high.url} 
      />
    </div>
  )
}

export default FeedDetails
