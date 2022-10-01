import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { FeedGrid, VideoList } from './utils'

function Search () {
  const videos = useSelector(redux =>  Object.values(redux.videos).sort((a, b) =>  new Date(b.publishedAt) - new Date(a.publishedAt)))
  const feeds = useSelector(redux => Object.values(redux.feeds))

  const [formData, setFormData] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [matchCase, setMatchCase] = useState(false)
  const [includeTitle, setIncludeTitle] = useState(true)
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

    if(includeTitle) {
      matches.videos = videos.filter(v => compare(v.title))
    }
    if(includeFeeds) {
      matches.feeds = feeds.filter(feed => compare(feed.title))
    }
    if (includeDescription) {
      matches.descs = videos.filter(v => {
        const isMatch = compare(v.description)
        if (!isMatch) return false
        const alreadyFound = matches.videos?.find(foundVid => foundVid.id === v.id)
        if (alreadyFound) return false
        return true
      })
    }

    const vidResults = []
    if(includeTitle) vidResults.push(...matches.videos)
    if(includeDescription) vidResults.push(...matches.descs)

    return <>
      {includeFeeds ? <FeedGrid feeds={matches.feeds} title='Subscriptions' /> : null}
      {vidResults.length ? <VideoList title='videos' videos={vidResults} /> : <h3>No video results</h3>}
    </>
  }

  const handleCheck = (evt) => {
    const funcs = {
      matchCase: setMatchCase,
      includeTitle: setIncludeTitle,
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
        <label htmlFor='matchCase'>Match case</label>
        <input type='checkbox' name='matchCase' checked={matchCase} onChange={handleCheck} />
        <label htmlFor='includeTitle'>Title</label>
        <input type='checkbox' name='includeTitle' checked={includeTitle} onChange={handleCheck} />
        <label htmlFor='includeFeeds'>Author</label>
        <input type='checkbox' name='includeFeeds' checked={includeFeeds} onChange={handleCheck} />
        <label htmlFor='includeDescription'>Description</label>
        <input type='checkbox' name='includeDescription' checked={includeDescription} onChange={handleCheck} />
      </form>
      {searchTerm ? renderResults() : <p>Search a thing bish!</p>}
    </div>
  )
}

export default Search
