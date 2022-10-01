import { SHOW_MODAL, CLOSE_MODAL } from '../actions'

function reducer (state = false, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return true
    case CLOSE_MODAL:
      return false
    default:
      return state
  }
}

export default reducer
