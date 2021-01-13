import React from 'react'
import { connect } from 'react-redux'

class Nav extends React.Component {
  state = {
    isActive: false
  }

  toggleActive = () => {
    this.setState({
      isActive: !this.state.isActive
    })
  }

  render () {
    const loggedIn = true

    return (
      <nav className="navbar is-fixed-top px-2" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/13/SEGA_logo.svg" max-width="112" max-height="28" />
          </a>

          <a role="button" className={this.state.isActive ? "navbar-burger is-active" : "navbar-burger"} onClick={this.toggleActive} aria-label="menu" aria-expanded='false' data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className={this.state.isActive ? "navbar-menu is-active" : "navbar-menu"}>
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
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                Add new
              </a>

              <div className="navbar-dropdown">
                <a className="navbar-item">
                  Channel
                </a>
                <a className="navbar-item">
                  Playlist
                </a>
                <hr className="navbar-divider" />
                <a className="navbar-item">
                  ???
                </a>
              </div>
            </div>

            <div className="navbar-item">
              <div className="buttons">
                {loggedIn ? (
                  <>
                    <a className="button is-light">
                      Log out
                    </a>
                  </>
                ) : (
                  <>
                  <a className="button is-primary">
                    <strong>Sign up</strong>
                  </a>
                  <a className="button is-light">
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
}

export default connect()(Nav)
