import React from 'react'

function FeedDetails ({ match }) {
  const id = match.params.id
  return (
    <div>
      <h4>Feed Deets - {id}</h4>
    </div>
  )
}

export default FeedDetails
