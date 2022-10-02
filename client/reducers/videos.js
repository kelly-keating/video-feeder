import { SAVE_VIDS } from '../actions'

function reducer (state = null, action) {
  switch (action.type) {
    case SAVE_VIDS:
      return action.videos
    default:
      return state
  }
}

export default reducer
