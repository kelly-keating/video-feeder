import { ADD_ONE_SUB, SAVE_ALL_DATA } from '../actions'

function reducer (state = [], action) {
  switch (action.type) {
    case ADD_ONE_SUB:
      return [...state, action.sub]
    case SAVE_ALL_DATA:
      return action.subs || state
    default:
      return state
  }
}

export default reducer
