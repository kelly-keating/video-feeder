import { SAVE_FEEDS } from '../actions'

function reducer (state = null, action) {
  switch (action.type) {
    case SAVE_FEEDS:
      return action.feeds
    default:
      return state
  }
}

export default reducer
