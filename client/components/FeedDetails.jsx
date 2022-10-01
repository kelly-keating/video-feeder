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

  return !feed ? (
    <p>loading</p>
  ) : (
    <div>
      <img 
        src={feed.thumbnails.high.url} 
      />
      <div>
        <p>{feed.title}</p>
        <p><a href={`https://www.youtube.com/channel/${feed.id}`} target='_blank' >link</a></p>
        <ConfirmationButton
          mainText='Remove feed?'
          confirmText='Unsubscribe'
          successFunc={unsubscribe}
        />
        <p>{feed.description}</p>
      </div>
    </div>
  )
}

export default FeedDetails
