import React from 'react'
import { useSelector } from 'react-redux'

import { ConfirmationButton, FeedGrid } from './utils'

import { deleteGroup } from '../api/firebase/db'

function Subscriptions() {
  const feeds = useSelector((redux) => redux.feeds)
  const groups = useSelector((redux) => redux.groups)
  const uncategorized = Object.values(feeds).filter(f => !f.groups)
  
  const formattedGroups = Object.entries(groups).map(entry => {
    const [groupName, obj] = entry
    const feedIds = Object.keys(obj).filter(g => g !== 'placeholder')
    const feedObjs = feedIds.map(id => feeds[id])
    return {
      title: groupName,
      feeds: feedObjs
    }
  })

  // TODO: where should we delete groups?
  //       <ConfirmationButton
  //         key={group}
  //         mainText="🗑️"
  //         confirmText="Delete group"
  //         successFunc={() => deleteGroup(group)}
  //       />

  return (
    <div className="container">
      <h2>Subscriptions</h2>
      {formattedGroups.map(group => (
        <FeedGrid key={group.title} title={group.title} feeds={group.feeds} />
      ))}
      <FeedGrid key='other' title='Uncategorized' feeds={uncategorized} />
    </div>
  )
}

export default Subscriptions
