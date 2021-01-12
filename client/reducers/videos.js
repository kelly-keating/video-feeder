import { ADD_VIDEOS, SAVE_ALL_VIDEOS } from '../actions'

function reducer (state = [], action) {
  switch (action.type) {
    case ADD_VIDEOS:
      return [...action.videos, ...state]
    case SAVE_ALL_VIDEOS:
      return action.videos
    default:
      return state
  }
}

export default reducer
