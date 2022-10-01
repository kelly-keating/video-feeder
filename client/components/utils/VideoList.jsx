import React from 'react'

import ListItem from './ListItem'

function VideoList ({ title, videos }) {
  return (
    <section>
      <h3>{title}</h3>
      <div>
        {videos.map(v => <ListItem video={v} key={v.id} />)}
      </div>
    </section>
  )
}

export default VideoList
