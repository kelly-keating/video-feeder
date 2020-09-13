import { SAVE_ONE_GROUP, SAVE_ALL_GROUPS } from '../actions'

function reducer(state = [], action) {
  switch(action.type) {
    case SAVE_ONE_GROUP:
      return [...state, action.group]
    case SAVE_ALL_GROUPS:
      return action.groups
    default:
      return state
  }
}

export default reducer
