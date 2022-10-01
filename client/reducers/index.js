import { combineReducers } from 'redux'

import auth from './auth'
import groups from './groups'
import feeds from './feeds'
import videos from './videos'
import modal from './modal'

export default combineReducers({
  auth,
  groups,
  feeds,
  videos,
  modal
})
