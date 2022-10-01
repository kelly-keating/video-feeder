import React, { useState } from 'react'
import { connect } from 'react-redux'

import { saveNewFeed } from '../api'
import { getYoutubeChannel } from '../api/youtube'
import { addGroup } from '../api/firebase/db'
import { hideModal } from '../actions'

function AddFeed ({ history, groups, dispatch }) {
  const [feedUrl, setFeedUrl] = useState('')
  const [feedData, setFeedData] = useState(null)
  const [loadingFeed, setLoadingFeed] = useState(false)
  const [showNewGroup, setShowNewGroup] = useState(false)
  const [newGroup, setNewGroup] = useState('')
  const [currentGroups, setCurrentGroups] = useState([])

  // TODO: what if they choose a new feed while it's open?

  const closeModal = () => {
    setLoadingFeed(false)
    setShowNewGroup(false)
    setNewGroup('')
    setCurrentGroups([])
    dispatch(hideModal())
  }
  const showAddGroup = () => setShowNewGroup(true)
  const closeNewGroup = () => setShowNewGroup(false)
  const handleNewGroup = (evt) => setNewGroup(evt.target.value)
  const addNewGroup = (evt) => {
    // TODO: make sure text not empty
    evt.preventDefault()
    addGroup(newGroup)
      .then(() => setCurrentGroups([...currentGroups, newGroup]))
      .then(() => setNewGroup(''))
  }
  const clickGroup = (group) => {
    // TODO: groups doesnt have initial state, tho add so does it matter?
    if (currentGroups.includes(group)) {
      setCurrentGroups(currentGroups.filter(g => g !== group))
    } else {
      setCurrentGroups([...currentGroups, group])
    }
  }

  const saveInfo = () => {
    saveNewFeed(feedData, currentGroups)
      .then(() => {
        closeModal()
        history.push('/feeds/' + feedData.id)
      })
  }

  const idSearch = (evt) => {
    evt.preventDefault()
    setLoadingFeed(true)
    getYoutubeChannel(feedUrl)
      .then(data => {
        setFeedData(data)
        setLoadingFeed(false)
      })
  }

  const renderNewGroup = () => {
    return <form onSubmit={addNewGroup}>
      <label htmlFor='newGroup'>New group name:</label>
      <input id='newGroup' className='input' type='text'
        placeholder='New group name'
        value={newGroup}
        onChange={handleNewGroup}
      />
      <button>+</button>
      <button type="button" onClick={closeNewGroup}>x</button>
    </form>
  }

  const renderInfo = () => {
    return (
      <>
        <div>
          <p>This is the feed for</p>
          <h2>{feedData.title}</h2>
        </div>
        <ul>{currentGroups.map(g => <li key={'list-' + g}>{g}</li>)}</ul>
        <div>
          <p>Add to existing group</p>
          {groups.map(g => <button key={g} onClick={() => clickGroup(g)}>{g}</button>)}
        </div>
        {showNewGroup ? renderNewGroup() : <button type="button" onClick={showAddGroup}>Add new group</button>}
      </>
    )
  }

  const renderForm = () => (
    <form onSubmit={idSearch}>
        <label htmlFor='feedId'>Feed Id:</label>
        <input className="input" type="text"
          id='feedId'
          placeholder="Enter channel ID"
          value={feedUrl}
          onChange={e => setFeedUrl(e.target.value)}
        />
        <button disabled={loadingFeed}>Search</button>
    </form>
  )

  return (
    <div className="modal">
      <div className="modal-background" onClick={closeModal} />
      <div className="modal-main">
        <header>
          <p>Add a new feed..</p>
          <button className="delete" onClick={closeModal}>X</button>
        </header>
        <section>
          {renderForm()}
          {feedData && renderInfo()}
        </section>
        <footer>
          {feedData && <button
              // disabled={!this.state.data}
              onClick={saveInfo}
            >
              Save
            </button>
          }
        </footer>
      </div>
    </div>
  )
}

function reduxToProps (state) {
  return {
    groups: Object.keys(state.groups)
  }
}

export default connect(reduxToProps)(AddFeed)
