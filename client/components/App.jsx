import React from 'react'
import { connect } from 'react-redux'

import AddFeed from './AddFeed'
import VideoList from './VideoList'

import { getChannelInfo, getVideosAndGroups, refreshFeeds } from '../api'
import { saveGroups, addVideos, saveAllTheVideos } from '../actions'

class App extends React.Component {
  componentDidMount () {      
    // getChannelInfo('UC-7oMv6E4Uz2tF51w5Sj49w')

    getVideosAndGroups()
      .then(data => {
        const {groups, videos} = data
        this.props.dispatch(saveGroups(groups))
        this.props.dispatch(saveAllTheVideos(videos))
        // TODO: update videos in db, re load videos?
        this.refreshVideos()
      })
      .catch(err => console.log(err.message))
  }

  refreshVideos = () => {
    refreshFeeds()
      .then(videos => this.props.dispatch(addVideos(videos)))
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
