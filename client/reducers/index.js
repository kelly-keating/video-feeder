import { combineReducers } from 'redux'

import groups from './groups'
import subscriptions from './subscriptions'
import videos from './videos'

export default combineReducers({
  groups,
  subscriptions,
  videos
})
