export const ADD_AUTH = 'oh-hello-there'
export const CLEAR_AUTH = 'bye-bye'
export const SAVE_USER = 'got-your-deets'
// export const ADD_ONE_GROUP = 'save-da-group'
// export const ADD_ONE_FEED = 'the-new-hot-thing'
// export const ADD_VIDEOS = 'add-these-videos'
// export const REMOVE_VIDEO = 'and-pooof-its-gone'
export const UPDATE_VIDEOS = 'youre-so-old-school'
export const SAVE_GROUPS = 'groups-groups-groups'
export const SAVE_FEEDS = 'look-at-all-these'
export const SAVE_VIDS = 'heres-the-goss'
export const SHOW_MODAL = 'look-at-this'
export const CLOSE_MODAL = 'dont-look-at-this'

export function saveAuth (auth) {
  return {
    type: ADD_AUTH,
    auth
  }
}

export function removeAuth () {
  return {
    type: CLEAR_AUTH
  }
}

export function saveUser (user) {
  return {
    type: SAVE_USER,
    user
  }
}

export function saveTheVids ( videos ) {
  return {
    type: SAVE_VIDS,
    videos
  }
}

export function saveTheFeeds ( feeds ) {
  return {
    type: SAVE_FEEDS,
    feeds
  }
}

export function saveTheGroups ( groups ) {
  return {
    type: SAVE_GROUPS,
    groups
  }
}

export function openModal () {
  return {
    type: SHOW_MODAL
  }
}

export function hideModal () {
  return {
    type: CLOSE_MODAL
  }
}
