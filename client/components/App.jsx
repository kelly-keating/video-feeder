import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth"

import Nav from './Nav'
import AddFeed from './AddFeed'
import VideoList from './VideoList'
import SubscriptionList from './SubscriptionList'
import Search from './Search'
import FeedDetails from './FeedDetails'
import Bubbles from './Bubbles'

import auth from '../api/firebase/auth'
import { startListening } from '../api/firebase/db'
import { saveAuth, removeAuth, saveUser, saveTheVids, saveTheGroups, saveTheFeeds } from '../actions'

function App ({ dispatch, loggedIn, showModal }) {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('USER SIGNED IN')
        dispatch(saveAuth(user))
        startDb(user.uid)
      } else {
        console.log('USER SIGNED OUT')
        dispatch(removeAuth())
      }
    })
    // watch()
  }, [])  
  
  const startDb = (uid) => {
    const userFn = (user) => dispatch(saveUser(user))
    const groupFn = (groups) => dispatch(saveTheGroups(groups))
    const feedFn = (feeds) => dispatch(saveTheFeeds(feeds))
    const vidFn = (videos) => dispatch(saveTheVids(videos))
    startListening(userFn, groupFn, feedFn, vidFn)
  }

  return (
    <div className="container" >
      <Nav />
      <div className="content" >
        <h1>Title - Hi :)</h1>
        { loggedIn ? (
          <>
            {showModal && <AddFeed />}
            <Routes>
              <Route path='/feeds/:id' element={<FeedDetails />} />
              <Route path='/search' element={<Search />} />
              <Route path='/subs' element={<SubscriptionList />} />
              <Route path='/' element={<VideoList />} />
            </Routes>
            <Bubbles />
          </>
        ) : (
          <p>Please log in</p>
        )}
      </div>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    loggedIn: Boolean(state.auth),
    showModal: state.modal
  }
}

export default connect(mapStateToProps)(App)
