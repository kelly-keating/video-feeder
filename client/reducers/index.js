import { combineReducers } from 'redux'

import auth from './auth'
import groups from './groups'
import feeds from './feeds'
import videos from './videos'

export default combineReducers({
  auth,
  groups,
  feeds,
  videos
})
