import React from 'react'
import { connect } from 'react-redux'

function Nav () {
    const loggedIn = true

    return (
      <nav className="navbar" >
        <img src="https://upload.wikimedia.org/wikipedia/commons/1/13/SEGA_logo.svg" max-width="112" max-height="28" />

        <div className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item">
              Home
            </a>

            <a className="navbar-item">
              Subscriptions
            </a>

            <a className="navbar-item">
              Search
            </a>
          </div>

          <div className="navbar-end">
            <a className="navbar-item">
              Add new
            </a>

            <div className="navbar-item">
              <div className="buttons">
                {loggedIn ? (
                  <>
                    <a className="button">
                      Log out
                    </a>
                  </>
                ) : (
                  <>
                  <a className="button">
                    <strong>Sign up</strong>
                  </a>
                  <a className="button">
                    Log in
                  </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
}

export default connect()(Nav)
