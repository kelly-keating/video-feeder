import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import AddFeed from './AddFeed'
import VideoList from './VideoList'
import SubscriptionList from './SubscriptionList'

import { getChannelInfo, getVideosAndGroups, refreshFeeds } from '../api'
import { saveGroups, addVideos, saveAllTheVideos, updateVideos } from '../actions'

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
      .then(videos => {
        this.props.dispatch(addVideos(videos.new))
        this.props.dispatch(updateVideos(videos.updated))
      })
      .catch(err => console.log(err.message))
  }

  render () {
    return (
      <div className="container" >
        <h1>Title - Hi :)</h1>
        <p>Navigation Buttons</p>
        <AddFeed />
        <Switch>
          <Route path='/subs' component={SubscriptionList} />
          <Route path='/' component={VideoList} />
        </Switch>
      </div>
    )
  }
}

export default connect()(App)
