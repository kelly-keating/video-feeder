import { 
  getDatabase, 
  ref, 
  onValue,
  set  
} from "firebase/database"

const db = getDatabase()
const dbRef = ref(db)

export function startListening (userId, userFn, groupFn, subFn, vidFn) {
  const userRef = ref(db, `${userId}/user`)
  const groupsRef = ref(db, `${userId}/groups`)
  const subsRef = ref(db, `${userId}/channels`) // TODO: channels >> subs in db
  const vidsRef = ref(db, `${userId}/videos`)

  onValue(userRef, (snapshot) => userFn(snapshot.val()))
  onValue(groupsRef, (snapshot) => groupFn(snapshot.val()))
  onValue(subsRef, (snapshot) => subFn(snapshot.val()))
  onValue(vidsRef, (snapshot) => vidFn(snapshot.val()))
}

export function setUpdated (userId) {
  const userRef = ref(db, `${userId}/user/lastUpdated`)
  set(userRef, Date.now())
}

export function addVid (userId, id, video) {
  const videoRef = ref(db, `${userId}/videos/${id}`)
  set(videoRef, video)
}

export default db
