import React from 'react'
import { connect } from 'react-redux'

import AddFeed from './AddFeed'

import { getChannelInfo, getGroups } from '../api'
import { saveGroups } from '../actions'


class App extends React.Component {

  state = {
    data: null
  }

  componentDidMount() {
    getGroups()
      .then(groups => this.props.dispatch(saveGroups(groups)))

    getChannelInfo('UC-7oMv6E4Uz2tF51w5Sj49w')
      .then(data => {
        console.log(data)
        this.setState({ data })
      })
  }

  renderVideos(data) {
    return (
      <div className="tile is-ancestor">
        {data.videos.map(video => (
          <div key={video.id} className="tile is-parent is-3">
            <article className="tile is-child box">
              <img src={video.thumbnail} className="is-3-tablet"/>
              <p className="title">{video.title}</p>
              <p className="subtitle">{video.description.split('\n')[0]}</p>
            </article>
          </div>
        ))}
      </div>
    )
  }
 
  render() {
    return (
      <div className="container" >
        <h1>Title - Hi :)</h1>
        <p>Navigation Buttons</p>
        <AddFeed />
        <p>Subscriptions List</p>
        {this.state.data && this.renderVideos(this.state.data)}
      </div>
    )
  }
}

export default connect()(App)
