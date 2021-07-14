import React from 'react'
import { connect } from 'react-redux'

function SubscriptionList ({ groups }) {

  const renderList = (group) => {
    return (
      <>
        <h3>{group}</h3>
      </>
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
    groups: state.groups
  }
}

export default connect(mS2P)(SubscriptionList)
