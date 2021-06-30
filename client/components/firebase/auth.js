import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut 
} from "firebase/auth"

const auth = getAuth()
export default auth

export function register (email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user
      console.log('REGISTERED USER:', user)
      return user
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log("REGISTER ERROR:", errorCode, errorMessage)
    })
}

export function login (email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user
      console.log('SIGNED IN USER:', user)
      return user
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log("SIGN IN ERROR:", errorCode, errorMessage)
    })
}

export function logout () {
  return signOut(auth)
    .then(() => {
      console.log('LOGGED OUT')
    }).catch((error) => {
      console.log('LOG OUT ERROR:', error.code, error.message)
    })
}
