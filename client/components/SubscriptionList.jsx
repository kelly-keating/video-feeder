import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'

import FeedTile from './FeedTile'
import { ConfirmationButton } from './utils'

import { deleteGroup } from '../api/firebase/db'

function SubscriptionList() {
  const feeds = useSelector((redux) => redux.feeds)
  const groups = useSelector((redux) => redux.groups)

  const renderList = (group, idx) => {
    const feedIds = Object.keys(groups[group])
    return (
      <Fragment key={group}>
        <h3>{group}</h3>
        <ConfirmationButton
          key={group}
          mainText="🗑️"
          confirmText="Delete group"
          successFunc={() => deleteGroup(group)}
        />
        <div className="subs-group grid">
          {feedIds.length > 1 ? (
            <>
              {feedIds.map((id) => {
                const info = feeds?.[id]
                return <FeedTile key={id} info={info} />
              })}
            </>
          ) : (
            <p>(Empty)</p>
          )}
        </div>
      </Fragment>
    )
  }

  return (
    <div className="container">
      <p>Subscriptions</p>
      {Object.keys(groups).map(renderList)}
    </div>
  )
}

export default SubscriptionList
