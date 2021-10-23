import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import SignIn from './SignIn'

function Nav () {
    return (
      <nav className="navbar" >
        <img src="/icon-white.png" className="navbar-logo" />

        <div className="navbar-menu">
          <div className="navbar-start">
            <Link to='/' className="navbar-item">
              Home
            </Link>

            <Link to='/subs' className="navbar-item">
              Subscriptions
            </Link>

            <Link to='/search' className="navbar-item">
              Search
            </Link>
          </div>

          <div className="navbar-end">
            <a className="navbar-item">
              Add new
            </a>

            <div className="navbar-item">
              <div className="buttons">
                <SignIn />
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
}

export default connect()(Nav)
