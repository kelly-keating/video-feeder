export const SAVE_ONE_GROUP = 'save-da-group'
export const SAVE_ALL_GROUPS = 'save-all-da-groupz'

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