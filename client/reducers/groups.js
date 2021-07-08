import { ADD_ONE_GROUP, SAVE_ALL_DATA } from '../actions'

function reducer (state = [], action) {
  switch (action.type) {
    case ADD_ONE_GROUP:
      return [...state, action.group]
    case SAVE_ALL_DATA:
      return action.groups || state
    default:
      return state
  }
}

export default reducer
