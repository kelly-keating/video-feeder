import React from 'react'

function SubTile ({ chanInfo }) {
  return (
    <div>
      <h4>{chanInfo?.title}</h4>
      <img src={chanInfo?.thumbnails.default.url} />
    </div>
  )
}

export default SubTile
