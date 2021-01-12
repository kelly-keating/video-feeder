import { ADD_VIDEOS, SAVE_ALL_VIDEOS, UPDATE_VIDEOS } from '../actions'

function reducer (state = [], action) {
  switch (action.type) {
    case ADD_VIDEOS:
      return [...action.videos, ...state]
    case SAVE_ALL_VIDEOS:
      return action.videos
    case UPDATE_VIDEOS:
      return state.map(video => {
        const match = action.videos.find(v => v.id === video.id)
        return match ? match : video
      })
    default:
      return state
  }
}

export default reducer
