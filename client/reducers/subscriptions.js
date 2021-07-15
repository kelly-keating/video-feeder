import { ADD_ONE_SUB, SAVE_ALL_DATA } from '../actions'

function reducer (state = [], action) {
  switch (action.type) {
    case ADD_ONE_SUB:
      return { ...state, [action.id]: action.data }
    case SAVE_ALL_DATA:
      return action.subs || state
    default:
      return state
  }
}

export default reducer
