import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Modal } from './utils'

import { saveNewFeed } from '../api'
import { findYoutubeChannel } from '../api/youtube'
import { addGroup } from '../api/firebase/db'

import { hideModal } from '../actions'

function AddFeed() {
  const [feedUrl, setFeedUrl] = useState('UCSHtaUm-FjUps090S7crO4Q')
  const [feedData, setFeedData] = useState(null)
  const [loadingFeed, setLoadingFeed] = useState(false)
  const [showNewGroup, setShowNewGroup] = useState(false)
  const [newGroup, setNewGroup] = useState('')
  const [currentGroups, setCurrentGroups] = useState([])

  const goTo = useNavigate()
  const dispatch = useDispatch()
  const groups = useSelector((redux) => Object.keys(redux.groups))

  // TODO: what if they choose a new feed while it's open?

  const showAddGroup = () => setShowNewGroup(true)
  const closeNewGroup = () => setShowNewGroup(false)
  const handleNewGroup = (evt) => setNewGroup(evt.target.value)
  const closeModal = () => dispatch(hideModal())

  const addNewGroup = (evt) => {
    evt.preventDefault()
    addGroup(newGroup)
      .then(() => setCurrentGroups([...currentGroups, newGroup]))
      .then(() => setNewGroup(''))
  }

  const clickGroup = (group) => {
    // TODO: groups doesnt have initial state, tho add so does it matter?
    if (currentGroups.includes(group)) {
      setCurrentGroups(currentGroups.filter((g) => g !== group))
    } else {
      setCurrentGroups([...currentGroups, group])
    }
  }

  const saveInfo = () => {
    saveNewFeed(feedData, currentGroups)
      .then(() => goTo('/feeds/' + feedData.id))
      .then(() => closeModal())
  }

  const idSearch = async (evt) => {
    evt.preventDefault()
    setLoadingFeed(true)
    findYoutubeChannel(feedUrl).then((data) => {
      setFeedData(data)
      setLoadingFeed(false)

      console.log('get channel', data)
    })
  }

  const renderNewGroup = () => {
    return (
      <form onSubmit={addNewGroup}>
        <label htmlFor="newGroup">New group name:</label>
        <input
          id="newGroup"
          className="input"
          type="text"
          placeholder="New group name"
          value={newGroup}
          onChange={handleNewGroup}
        />
        <button disabled={newGroup === '' || groups.includes(newGroup)}>
          +
        </button>
        <button type="button" onClick={closeNewGroup}>
          Hide
        </button>
      </form>
    )
  }

  const renderInfo = () => {
    return (
      <>
        <div>
          <p>This is the feed for</p>
          <h2>{feedData.title}</h2>
        </div>
        <ul>
          {currentGroups.map((g) => (
            <li key={'list-' + g}>{g}</li>
          ))}
        </ul>
        <div>
          <p>Add to existing group</p>
          {groups.map((g) => (
            <button key={g} onClick={() => clickGroup(g)}>
              {g}
            </button>
          ))}
        </div>
        {showNewGroup ? (
          renderNewGroup()
        ) : (
          <button type="button" onClick={showAddGroup}>
            Add new group
          </button>
        )}
      </>
    )
  }

  const renderForm = () => (
    <form onSubmit={idSearch}>
      <label htmlFor="feedId">Feed Id:</label>
      <input
        className="input"
        type="text"
        id="feedId"
        placeholder="Enter channel ID"
        value={feedUrl}
        onChange={(e) => setFeedUrl(e.target.value)}
      />
      <button disabled={loadingFeed}>Search</button>
    </form>
  )

  return (
    <Modal title="Add a new feed..">
      <section>
        {renderForm()}
        {feedData && renderInfo()}
      </section>
      <footer>
        {feedData && (
          <button
            // disabled={!this.state.data}
            onClick={saveInfo}
          >
            Save
          </button>
        )}
      </footer>
    </Modal>
  )
}

export default AddFeed
