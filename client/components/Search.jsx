import React, { useState } from 'react'
import { connect } from 'react-redux'
import FeedTile from './FeedTile'

import VideoCard from './VideoCard'

function Search ({ videos, feeds }) {

  const [formData, setFormData] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [matchCase, setMatchCase] = useState(false)
  const [includeFeeds, setIncludeFeeds] = useState(false)
  const [includeDescription, setIncludeDescription] = useState(false)

  const handleTyping = (e) => {
    setFormData(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchTerm(formData)
  }

  const renderResults = () => {
    const matches = {}
    const searchStr = matchCase ? searchTerm : searchTerm.toLowerCase()
    const compare = (str) => (matchCase ? str : str.toLowerCase()).includes(searchStr)

    matches.videos = videos.filter(v => compare(v.title))
    if(includeFeeds) {
      matches.feeds = feeds.filter(feed => compare(feed.title))
    }
    if (includeDescription) {
      matches.descs = videos.filter(v => {
        const isMatch = compare(v.description)
        if (!isMatch) return false
        const alreadyFound = matches.videos.find(foundVid => foundVid.id === v.id)
        if (alreadyFound) return false
        return true
      })
    }

    return <>
      {includeFeeds && <>
        <h3>Subscriptions</h3>
        {matches.feeds.map(s => <FeedTile info={s} key={s.id} />)}
      </>}
      <h3>Videos</h3>
      {matches.videos.map(v => <VideoCard video={v} key={v.id} />)}
      {includeDescription && matches.descs.map(v => <VideoCard video={v} key={v.id} />)}
    </>
  }

  const handleCheck = (evt) => {
    const funcs = {
      matchCase: setMatchCase,
      includeDescription: setIncludeDescription,
      includeFeeds: setIncludeFeeds
    } 
    funcs[evt.target.name](evt.target.checked)
  }

  return (
    <div className="search-container" >
      <h2>Search</h2>
      <form onSubmit={handleSearch}>
        <label htmlFor=''>Search Term:</label>
        <input type='text' name='search' value={formData} onChange={handleTyping} />
        <button>Search</button>
        <label htmlFor='matchCase'>Match search case:</label>
        <input type='checkbox' name='matchCase' checked={matchCase} onChange={handleCheck} />
        <label htmlFor='includeFeeds'>Search subscriptions:</label>
        <input type='checkbox' name='includeFeeds' checked={includeFeeds} onChange={handleCheck} />
        <label htmlFor='includeDescription'>Search video descriptions:</label>
        <input type='checkbox' name='includeDescription' checked={includeDescription} onChange={handleCheck} />
      </form>
      {searchTerm ? renderResults() : <p>Search a thing bish!</p>}
    </div>
  )
}

function reduxToProps (state) {
  return {
    videos: Object.values(state.videos).sort((a, b) =>  new Date(b.publishedAt) - new Date(a.publishedAt)),
    feeds: Object.values(state.feeds)
  }
}

export default connect(reduxToProps)(Search)
