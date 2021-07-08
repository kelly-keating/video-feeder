import { 
  getDatabase, 
  ref, 
  onValue, 
  child, 
  get  
} from "firebase/database"

const db = getDatabase()


// permission denied

// var starCountRef = db().ref('posts/' + postId + '/starCount')
// starCountRef.on('value', (snapshot) => {
//   const data = snapshot.val()
//   console.log(postElement, data)
// });

// Permission denied
const dbRef = ref(getDatabase());
get(child(dbRef, `users/${userId}`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
})


export default db

