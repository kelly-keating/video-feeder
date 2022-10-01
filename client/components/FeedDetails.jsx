import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { ConfirmationButton, VideoGrid } from './utils'

import { removeFeed } from '../api'

function FeedDetails() {
  const goTo = useNavigate()
  const { id } = useParams()
  const feed = useSelector((state) => state.feeds[id])
  const videos = useSelector((redux) =>
    Object.values(redux.videos).filter((video) => video.feedId === id)
  )

  const unsubscribe = () => {
    removeFeed(feed).then(() => goTo('/'))
  }

  return (
    <section>
      {!feed ? (
        <p>No channel</p>
      ) : (
        <div>
          <img src={feed.thumbnails.high.url} />
          <div>
            <h2>{feed.title}</h2>
            <p>
              <a
                href={`https://www.youtube.com/channel/${feed.id}`}
                target="_blank"
              >
                link
              </a>
            </p>
            <ConfirmationButton
              mainText="Remove feed?"
              confirmText="Unsubscribe"
              successFunc={unsubscribe}
            />
            <p>{feed.description}</p>
          </div>
        </div>
      )}
      <h3>Videos from {feed?.title || 'unfollowed channel'}</h3>
      <VideoGrid videos={videos} />
    </section>
  )
}

export default FeedDetails
