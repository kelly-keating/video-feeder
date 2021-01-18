import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import Nav from './Nav'
import AddFeed from './AddFeed'
import VideoList from './VideoList'
import SubscriptionList from './SubscriptionList'

import { getAllData, getChannelInfo, refreshFeeds } from '../api'
import { saveAllTheData, addVideos, updateVideos } from '../actions'

class App extends React.Component {
  componentDidMount () {      
    // getChannelInfo('UC-7oMv6E4Uz2tF51w5Sj49w')

    getAllData()
      .then(data => {
        this.props.dispatch(saveAllTheData(data))      
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
      <div className="container pt-5" >
        <h1>Title - Hi :)</h1>
        <Nav />
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
