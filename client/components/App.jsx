import React from 'react'
import { connect } from 'react-redux'

import AddFeed from './AddFeed'
import VideoList from './VideoList'

import { getChannelInfo, getVideosAndGroups } from '../api'
import { saveGroups, addVideos } from '../actions'

class App extends React.Component {
  componentDidMount () {      
    // getChannelInfo('UC-7oMv6E4Uz2tF51w5Sj49w')

    // TODO: update videos in db, re load videos?
    getVideosAndGroups()
      .then(data => {
        const {groups, videos} = data
        this.props.dispatch(saveGroups(groups))
        this.props.dispatch(addVideos(videos))
      })
      .catch(err => console.log(err.message))
  }

  render () {
    return (
      <div className="container" >
        <h1>Title - Hi :)</h1>
        <p>Navigation Buttons</p>
        <AddFeed />
        <p>Subscriptions List</p>
        <VideoList />
      </div>
    )
  }
}

export default connect()(App)
