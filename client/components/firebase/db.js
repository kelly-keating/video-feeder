import { 
  getDatabase, 
  ref, 
  onValue, 
  child, 
  get  
} from "firebase/database"

const db = getDatabase()
const vidsRef = ref(db, 'videos')

export function startListening (fn) {
  return onValue(vidsRef, (snapshot) => {
    const data = snapshot.val();
    console.log('DATA:', data);
    
    fn(data)
  })
}

export default db
