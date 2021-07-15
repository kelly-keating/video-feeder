import { getUsersChannels, getChannelById } from "../components/firebase/db"

export const ADD_USER = 'oh-hello-there'
export const CLEAR_USER = 'bye-bye'
export const ADD_ONE_GROUP = 'save-da-group'
export const ADD_ONE_SUB = 'the-new-hot-thing'
export const ADD_VIDEOS = 'add-these-videos'
export const REMOVE_VIDEO = 'and-pooof-its-gone'
export const UPDATE_VIDEOS = 'youre-so-old-school'
export const SAVE_ALL_DATA = 'heres-the-goss'

export function saveUser (user) {
  return {
    type: ADD_USER,
    user
  }
}

export function removeUser () {
  return {
    type: CLEAR_USER
  }
}

export function saveOneGroup (name, data) {
  return {
    type: ADD_ONE_GROUP,
    name, data
  }
}

export function addSub (id, data) {
  return {
    type: ADD_ONE_SUB,
    id, data
  }
}

export function addVideos (videos) {
  return {
    type: ADD_VIDEOS,
    videos
  }
}

export function updateVideos (videos) {
  return {
    type: UPDATE_VIDEOS,
    videos
  }
}

export function removeVideo (id) {
  return {
    type: REMOVE_VIDEO,
    id
  }
}

export function saveTheVids ( videos ) {
  return {
    type: SAVE_ALL_DATA,
    videos
  }
}

export function saveTheGroups ( groups ) {
  return {
    type: SAVE_ALL_DATA,
    groups
  }
}

export function saveAllTheData ({ videos, groups, subs }) {
  return {
    type: SAVE_ALL_DATA,
    videos,
    groups,
    subs
  }
}

// THUNKS

export function updateDatabase (userId) {
  return (dispatch) => {
    getUsersChannels(userId)
      .then((groups) => {
        dispatch(saveTheGroups(groups))

        const channelIds = Object.values(groups).map(obj => Object.keys(obj)).flat()
        channelIds.forEach((c) => getChannelById(c)
          .then(info => {
            dispatch(addSub(c, info))
          })
        )
      })
  }
}
