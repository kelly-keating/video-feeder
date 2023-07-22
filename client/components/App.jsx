import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth"

import AddFeed from './AddFeed'
import FeedDetails from './FeedDetails'
import Nav from './Nav'
import Search from './Search'
import SignIn from './SignIn'
import Subscriptions from './Subscriptions'
import Videos from './Videos'

import auth from '../api/firebase/auth'
import { startListening } from '../api/firebase/db'
import { saveAuth, removeAuth, saveUser, saveTheVids, saveTheGroups, saveTheFeeds, hideModal } from '../actions'
import { Spinner } from '@chakra-ui/spinner'

function App () {
  const dispatch = useDispatch()
  const currentModal = useSelector(redux => redux.modal)
  const loggedIn = useSelector(redux => Boolean(redux.auth))
  const hasLoaded = useSelector(redux => Boolean(redux.groups && redux.feeds && redux.videos))

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
  }, [])
  
  const startDb = () => {
    const userFn = (user) => dispatch(saveUser(user))
    const groupFn = (groups) => dispatch(saveTheGroups(groups))
    const feedFn = (feeds) => dispatch(saveTheFeeds(feeds))
    const vidFn = (videos) => dispatch(saveTheVids(videos))
    startListening(userFn, groupFn, feedFn, vidFn)
  }

  const renderPages = () => (
    <>
      {currentModal === 'add' && <AddFeed />}
      <Routes>
        <Route path='/' element={<Videos />} />
        <Route path='/subs' element={<Subscriptions />} />
        <Route path='/search' element={<Search />} />
        <Route path='/feeds/:id' element={<FeedDetails />} />
      </Routes>
    </>
  )

  return (
    <div className="container" >
      <Nav />
      <div className="content" >
        <h1>RSS FEEDER</h1>
        {!loggedIn ? <SignIn /> : (
          hasLoaded ? renderPages() : <Spinner />
        )}
      </div>
    </div>
  )
}

export default App
