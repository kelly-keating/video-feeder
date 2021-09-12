import { SAVE_GROUPS } from '../actions'

function reducer (state = {}, action) {
  switch (action.type) {
    // case ADD_ONE_GROUP:
    //   return { ...state, [action.name]: action.data}
    case SAVE_GROUPS:
      return action.groups
    default:
      return state
  }
}

export default reducer
