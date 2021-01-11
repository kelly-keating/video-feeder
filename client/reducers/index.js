import { combineReducers } from 'redux'

import groups from './groups'
import videos from './videos'

export default combineReducers({
  groups,
  videos
})
