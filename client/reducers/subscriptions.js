import { SAVE_SUBS } from '../actions'

function reducer (state = {}, action) {
  switch (action.type) {
    // case ADD_ONE_SUB:
    //   return { ...state, [action.id]: action.data }
    case SAVE_SUBS:
      return action.subs
    default:
      return state
  }
}

export default reducer
