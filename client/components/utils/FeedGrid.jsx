import React from 'react'

import FeedTile from './FeedTile'

function FeedGrid({ title, feeds }) {
  return (
    <div>
      <h3>{title}</h3>
      <div className="subs-group grid">
        {feeds.length ? (
          feeds.map((feed) => <FeedTile key={feed.id} feed={feed} />)
        ) : (
          <p>(Empty)</p>
        )}
      </div>
    </div>
  )
}

export default FeedGrid
