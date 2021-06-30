import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth"

import Nav from './Nav'
import AddFeed from './AddFeed'
import VideoList from './VideoList'
import SubscriptionList from './SubscriptionList'

import auth from './firebase/auth'
import { getAllData, getChannelInfo, refreshFeeds } from '../api/index'
import { getYoutubeChannel, getYoutubeVideos } from '../api/youtube'
import { saveAllTheData, addVideos, updateVideos, saveUser, removeUser } from '../actions'


function App ({ dispatch }) {
  useEffect(() => {
    getYoutubeChannel()
      .then(data => console.log('Channel:', data))
      .catch(err => console.log('Error:', err))

    getYoutubeVideos()
      .then(data => console.log('Videos:', data))
      .catch(err => console.log('Error:', err))

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log('USER SIGNED IN')
        dispatch(saveUser(user))
      } else {
        // User is signed out
        console.log('USER SIGNED OUT')
        dispatch(removeUser())
      }
    })

    // getChannelInfo('UC-7oMv6E4Uz2tF51w5Sj49w')
    //   .then(data => console.log('Data:', data))
    //   .catch(err => console.log('Error:', err))

    // getAllData()
    //   .then(data => {
    //     this.props.dispatch(saveAllTheData(data))      
    //     this.refreshVideos()
    //   })
    //   .catch(err => console.log(err.message))
  }, [])     

  // const refreshVideos = () => {
  //   refreshFeeds()
  //     .then(videos => {
  //       this.props.dispatch(addVideos(videos.new))
  //       this.props.dispatch(updateVideos(videos.updated))
  //     })
  //     .catch(err => console.log(err.message))
  // }

  return (
    <div className="container" >
      <h1>Title - Hi :)</h1>
      <Nav />
      {/* <AddFeed /> */}
      <Switch>
        {/* <Route path='/subs' component={SubscriptionList} /> */}
        <Route path='/' component={VideoList} />
      </Switch>
    </div>
  )
}

export default connect()(App)
