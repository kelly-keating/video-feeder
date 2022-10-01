import { SHOW_MODAL, CLOSE_MODAL } from '../actions'

function reducer (state = null, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return action.payload
    case CLOSE_MODAL:
      return null
    default:
      return state
  }
}

export default reducer
