import { getDatabase, ref, onValue, set, remove } from "firebase/database"

import { getUserId } from './auth'

const db = getDatabase()
export default db

export function startListening (userFn, groupFn, feedFn, vidFn) {
  const userId = getUserId()
  const userRef = ref(db, `${userId}/user`)
  const groupsRef = ref(db, `${userId}/groups`)
  const feedsRef = ref(db, `${userId}/feeds`)
  const vidsRef = ref(db, `${userId}/videos`)

  onValue(userRef, (snapshot) => userFn(snapshot.val()))
  onValue(groupsRef, (snapshot) => groupFn(snapshot.val()))
  onValue(feedsRef, (snapshot) => feedFn(snapshot.val()))
  onValue(vidsRef, (snapshot) => vidFn(snapshot.val()))
}

// USER

export function setUpdated () {
  const userRef = ref(db, `${getUserId()}/user/lastUpdated`)
  return set(userRef, Date.now())
}

// GROUP

export function addGroup (name) {
  const groupRef = ref(db, `${getUserId()}/groups/${name}`)
  return set(groupRef, { placeholder: true })
}

export function deleteGroup (name) {
  const groupRef = ref(db, `${getUserId()}/groups/${name}`)
  return remove(groupRef)
}

export function saveFeedToGroup (feedId, group) {
  const groupRef = ref(db, `${getUserId()}/groups/${group}/${feedId}`)
  const feedRef = ref(db, `${getUserId()}/feeds/${feedId}/groups/${group}`)
  return Promise.all([ set(groupRef, true), set(feedRef, true) ])
}

export function deleteFeedFromGroup (feedId, group) {
  const groupRef = ref(db, `${getUserId()}/groups/${group}/${feedId}`)
  const feedRef = ref(db, `${getUserId()}/feeds/${feedId}/groups/${group}`)
  return Promise.all([ remove(groupRef), remove(feedRef) ])
}

// FEED

export function addFeed (id, data) {
  const feedRef = ref(db, `${getUserId()}/feeds/${id}`)
  return set(feedRef, data)
}

export function deleteFeed (id) {
  const feedRef = ref(db, `${getUserId()}/feeds/${id}`)
  return remove(feedRef)
}

// VIDEO

export function addVid (id, video) {
  const videoRef = ref(db, `${getUserId()}/videos/${id}`)
  return set(videoRef, video)
}

export function delVideo (id) {
  const videoRef = ref(db, `${getUserId()}/videos/${id}`)
  return remove(videoRef)
}
