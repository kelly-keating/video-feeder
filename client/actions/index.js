export const ADD_ONE_GROUP = 'save-da-group'
export const ADD_ONE_SUB = 'the-new-hot-thing'
export const ADD_VIDEOS = 'add-these-videos'
export const REMOVE_VIDEO = 'and-pooof-its-gone'
export const UPDATE_VIDEOS = 'youre-so-old-school'
export const SAVE_ALL_DATA = 'heres-the-goss'

export function saveOneGroup (group) {
  return {
    type: ADD_ONE_GROUP,
    group
  }
}

export function addSub (sub) {
  return {
    type: ADD_ONE_SUB,
    sub
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

export function saveAllTheData ({ videos, groups, subs }) {
  return {
    type: SAVE_ALL_DATA,
    videos,
    groups,
    subs
  }
}
