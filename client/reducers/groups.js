import { SAVE_GROUPS } from '../actions'

function reducer (state = null, action) {
  switch (action.type) {
    case SAVE_GROUPS:
      return action.groups
    default:
      return state
  }
}

export default reducer
