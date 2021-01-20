import { ADD_VIDEOS, SAVE_ALL_DATA, UPDATE_VIDEOS, REMOVE_VIDEO } from '../actions'

function reducer (state = [], action) {
  switch (action.type) {
    case ADD_VIDEOS:
      return [...action.videos, ...state]
    case SAVE_ALL_DATA:
      return action.videos
    case UPDATE_VIDEOS:
      return state.map(video => {
        const match = action.videos.find(v => v.id === video.id)
        return match ? match : video
      })
    case REMOVE_VIDEO:
      return state.filter(video => video.id !== action.id)
    default:
      return state
  }
}

export default reducer
