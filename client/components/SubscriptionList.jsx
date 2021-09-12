import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import FeedTile from './FeedTile'

function SubscriptionList ({ groups, feeds }) {

  const renderList = (group, idx) => {
    const channelIds = Object.keys(groups[group])
    return (
      <Fragment key={idx}>
        <h3>{group}</h3>
        <ul>
          {channelIds.map(id => {
            const chanInfo = feeds?.[id]
            return <FeedTile key={id} chanInfo={chanInfo} />
          })}
        </ul>
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

function mS2P (state) {
  return {
    groups: state.groups,
    feeds: state.feeds
  }
}

export default connect(mS2P)(SubscriptionList)
