import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { ConfirmationButton } from './utils'

import { removeFeed } from '../api'

function FeedDetails () {
  const goTo = useNavigate()
  const { id } = useParams()
  const feed = useSelector((state) => state.feeds[id])

  const unsubscribe = () => {
    removeFeed(feed)
      .then(() => goTo('/'))
  }

  return (
    <div>
      <h4>Feed Deets - {id}</h4>
      <p>{feed?.title}</p>
      <ConfirmationButton
        mainText='Remove feed'
        confirmText='Unsubscribe'
        successFunc={unsubscribe}
      />
      <img 
        src={feed?.thumbnails.high.url} 
      />
    </div>
  )
}

export default FeedDetails
