export const SAVE_ONE_GROUP = 'save-da-group'
export const SAVE_ALL_GROUPS = 'save-all-da-groupz'
export const ADD_VIDEOS = 'add-these-videos'
export const SAVE_ALL_VIDEOS = 'heres-all-the-videos'

export function saveOneGroup(group) {
  return {
    type: SAVE_ONE_GROUP,
    group
  }
}

export function saveGroups(groups) {
  return {
    type: SAVE_ALL_GROUPS,
    groups
  }
}

export function addVideos(videos) {
  return {
    type: ADD_VIDEOS,
    videos
  }
}

export function saveAllTheVideos(videos) {
  return {
    type: SAVE_ALL_VIDEOS,
    videos
  }
}
