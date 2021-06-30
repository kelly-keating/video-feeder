import { combineReducers } from 'redux'

import auth from './auth'
import groups from './groups'
import subscriptions from './subscriptions'
import videos from './videos'

export default combineReducers({
  auth,
  groups,
  subscriptions,
  videos
})
