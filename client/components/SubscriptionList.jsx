import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'

import FeedTile from './FeedTile'

function SubscriptionList () {
  const feeds = useSelector(redux => redux.feeds)
  const groups = useSelector(redux => redux.groups)

  const renderList = (group, idx) => {
    const feedIds = Object.keys(groups[group])
    return (
      <Fragment key={idx}>
        <h3>{group}</h3>
        <div className="subs-group grid">
          {feedIds.map(id => {
            const info = feeds?.[id]
            return <FeedTile key={id} info={info} />
          })}
        </div>
      </Fragment>
    )
  }

  return (
    <div className="container" >
      <p>Subscriptions</p>
      {Object.keys(groups).map(renderList)}
    </div>
  )
}

export default SubscriptionList
