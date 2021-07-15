import { 
  getDatabase, 
  ref, 
  onValue, 
  child, 
  get  
} from "firebase/database"

const db = getDatabase()

const dbRef = ref(db)
const vidsRef = ref(db, 'videos')
const usersRef = ref(db, 'users')
const channelsRef = ref(db, 'channels')

export function startListening (fn) {
  onValue(vidsRef, (snapshot) => {
    const data = snapshot.val()
    console.log('DATA:', data)
    
    fn(data)
  })
}

export function getUsersChannels (userId) {
  return get(child(dbRef, `users/${userId}/groups`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val()
      } else {
        console.log("No data available")
        return { default: {}}
      }
    })
    .catch((error) => {
      console.error(error)
    })
}

export function getChannelById (id) {
  console.log('id', id)
  return get(child(channelsRef, id))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val()
      } else {
        console.log("No data available")
        return { default: {}}
      }
    })
    .catch((error) => {
      console.error(error)
    })
}

export default db
