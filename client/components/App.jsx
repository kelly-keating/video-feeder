import React from 'react'
import { connect } from 'react-redux'

// import AddFeed from './AddFeed'
// import VideoList from './VideoList'

import { getChannelInfo, getGroups } from '../api'
import { saveGroups, addVideos } from '../actions'


class App extends React.Component {

  componentDidMount() {
    getGroups()
      .then(groups => this.props.dispatch(saveGroups(groups)))

    getChannelInfo('UC-7oMv6E4Uz2tF51w5Sj49w')
      .then(data => {
        console.log(data)
        this.props.dispatch(addVideos(data.videos))
      })
  }
 
  render() {
    return (
      <div className="container" >
        <h1>Title - Hi :)</h1>
        <p>Navigation Buttons</p>
        {/* <AddFeed /> */}
        <p>Subscriptions List</p>
        {/* <VideoList /> */}
      </div>
    )
  }
}

export default connect()(App)
