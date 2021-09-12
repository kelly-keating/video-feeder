import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import SignIn from './SignIn'

function Nav () {
    return (
      <nav className="navbar" >
        <img src="https://upload.wikimedia.org/wikipedia/commons/1/13/SEGA_logo.svg" max-width="112" max-height="28" />

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
