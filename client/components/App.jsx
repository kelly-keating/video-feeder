import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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

function App () {
  const dispatch = useDispatch()
  const showModal = useSelector(redux => redux.modal)
  const loggedIn = useSelector(redux => Boolean(redux.auth))

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('USER SIGNED IN')
        dispatch(saveAuth(user))
        startDb()
      } else {
        console.log('USER SIGNED OUT')
        dispatch(removeAuth())
      }
    })
    // watch()
  }, [])  
  
  const startDb = () => {
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
              <Route path='/' element={<VideoList />} />
              <Route path='/subs' element={<SubscriptionList />} />
              <Route path='/search' element={<Search />} />
              <Route path='/feeds/:id' element={<FeedDetails />} />
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

export default App
