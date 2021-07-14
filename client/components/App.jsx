import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth"

import Nav from './Nav'
import AddFeed from './AddFeed'
import VideoList from './VideoList'
import SubscriptionList from './SubscriptionList'

import auth from './firebase/auth'
import { startListening } from './firebase/db'
import { getAllData, getChannelInfo, refreshFeeds } from '../api/index'
import { getYoutubeChannel, getYoutubeVideos } from '../api/youtube'
import { saveAllTheData, addVideos, updateVideos, saveUser, removeUser, saveTheVids, updateDatabase } from '../actions'

// import { getDatabase, ref, child, get } from "firebase/database"

function App ({ dispatch, loggedIn }) {
  useEffect(() => {
    // getYoutubeChannel()
    //   .then(data => console.log('Channel:', data))
    //   .catch(err => console.log('Error:', err))

    // getYoutubeVideos()
    //   .then(data => console.log('Videos:', data))
    //   .catch(err => console.log('Error:', err))

    startListening((videos) => dispatch(saveTheVids(videos)))

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log('USER SIGNED IN')
        dispatch(saveUser(user))
        dispatch(updateDatabase(user.uid))
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

  /*
  const refreshVideos = () => {
    refreshFeeds()
      .then(videos => {
        this.props.dispatch(addVideos(videos.new))
        this.props.dispatch(updateVideos(videos.updated))
      })
      .catch(err => console.log(err.message))
  }
  */

  return (
    <div className="container" >
      <Nav />
      <div className="content" >
        <h1>Title - Hi :)</h1>
        { loggedIn ? (
          /* <AddFeed /> */
          <Switch>
            <Route path='/subs' component={SubscriptionList} />
            <Route path='/' component={VideoList} />
          </Switch>
        ) : (
          <p>Please log in</p>
        )}
      </div>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    loggedIn: Boolean(state.auth)
  }
}

export default connect(mapStateToProps)(App)
