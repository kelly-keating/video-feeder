import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import SubTile from './SubTile'

function SubscriptionList ({ groups, subs }) {

  const renderList = (group, idx) => {
    const channelIds = Object.keys(groups[group])
    return (
      <Fragment key={idx}>
        <h3>{group}</h3>
        <ul>
          {channelIds.map(id => {
            const chanInfo = subs?.[id]
            return <SubTile key={id} chanInfo={chanInfo} />
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
    subs: state.subscriptions
  }
}

export default connect(mS2P)(SubscriptionList)
