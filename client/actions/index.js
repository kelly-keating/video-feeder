export const ADD_AUTH = 'oh-hello-there'
export const CLEAR_AUTH = 'bye-bye'
export const SAVE_USER = 'got-your-deets'
// export const ADD_ONE_GROUP = 'save-da-group'
// export const ADD_ONE_FEED = 'the-new-hot-thing'
// export const ADD_VIDEOS = 'add-these-videos'
// export const REMOVE_VIDEO = 'and-pooof-its-gone'
export const UPDATE_VIDEOS = 'youre-so-old-school'
// export const SAVE_ALL_DATA = 'heres-the-goss'
export const SAVE_GROUPS = 'groups-groups-groups'
export const SAVE_FEEDS = 'look-at-all-these'
export const SAVE_VIDS = 'heres-the-goss'

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

// export function saveOneGroup (name, data) {
//   return {
//     type: ADD_ONE_GROUP,
//     name, data
//   }
// }

// export function addFeed (id, data) {
//   return {
//     type: ADD_ONE_FEED,
//     id, data
//   }
// }

// export function addVideos (videos) {
//   return {
//     type: ADD_VIDEOS,
//     videos
//   }
// }

// export function updateVideos (videos) {
//   return {
//     type: UPDATE_VIDEOS,
//     videos
//   }
// }

// export function removeVideo (id) {
//   return {
//     type: REMOVE_VIDEO,
//     id
//   }
// }

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
