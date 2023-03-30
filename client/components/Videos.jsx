import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Moment from 'react-moment'
import { Button, Spinner } from '@chakra-ui/react'

import { VideoGrid } from './utils'

import { refreshFeeds } from '../api'

function Videos () {
  const videos = useSelector(redux => Object.values(redux.videos).sort((a, b) =>  new Date(b.publishedAt) - new Date(a.publishedAt)))
  const uploadLinks = useSelector(redux => Object.values(redux.feeds).map(feed => feed.uploads))
  const lastUpdated = useSelector(redux => redux.auth.user?.lastUpdated)
  const [loading, setLoading] = useState(false)
  
  const refreshVids = () => {
    setLoading(true)
    refreshFeeds(uploadLinks, lastUpdated)
    .then(() => setLoading(false))
  }

  useEffect(() => {
    refreshVids()
  }, [])

  return (
    <div className="video-container" >
      <Button onClick={refreshVids} isLoading={loading} colorScheme='teal' variant='solid'>Refresh Videos</Button>
      <p>Last updated - <Moment fromNow>{lastUpdated}</Moment></p>
      {videos.length ? <VideoGrid videos={videos} /> : <p>You have nothing left to watch!</p>}
    </div>
  )
}

export default Videos
