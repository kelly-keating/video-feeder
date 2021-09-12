import { ADD_AUTH, CLEAR_AUTH, SAVE_USER } from '../actions'

function reducer (state = null, action) {
  switch (action.type) {
    case ADD_AUTH:
      return action.auth
    case CLEAR_AUTH:
      return null
    case SAVE_USER:
      return { ...state, user: action.user }
    default:
      return state
  }
}

export default reducer
