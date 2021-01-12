import React from 'react'
import { connect } from 'react-redux'

class SubscriptionList extends React.Component {

  render () {
    return (
      <div className="container" >
        <p>Subscriptions</p>
      </div>
    )
  }
}

export default connect()(SubscriptionList)
