import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { openModal } from '../actions'
import { logout } from '../api/firebase/auth'

function Nav() {
  const dispatch = useDispatch()
  const auth = useSelector(redux => redux.auth)
  
  const showModal = (type) => dispatch(openModal(type))

  return (
    <nav className="navbar">
      <img src="/icon-white.png" className="navbar-logo" />

      <div className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            Home
          </Link>

          <Link to="/subs" className="navbar-item">
            Subscriptions
          </Link>

          <Link to="/search" className="navbar-item">
            Search
          </Link>
        </div>

        <div className="navbar-end">
          <button className="navbar-item button" onClick={() => showModal('add')}>
            Add new
          </button>

          <div className="navbar-item">
            <div className="buttons">
              {auth ? (
                <button className="button" onClick={logout}>
                  Log Out
                </button>
              ) : (
                <button className="button" onClick={() => showModal('register')}>
                  Log In
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
