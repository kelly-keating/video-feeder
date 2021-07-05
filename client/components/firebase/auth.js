import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut 
} from "firebase/auth"

const auth = getAuth()
export default auth

export function register (email, password, errFn) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user
      console.log('REGISTERED USER:', user)
      return user
    })
    .catch(({ code }) => errFn(readError(code)))
}

export function login (email, password, errFn) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user
      console.log('SIGNED IN USER:', user)
      return user
    })
    .catch(({ code }) => errFn(readError(code)))
}

export function logout () {
  return signOut(auth)
    .then(() => {
      console.log('LOGGED OUT')
    }).catch((error) => {
      console.log('LOG OUT ERROR:', error.code, error.message)
    })
}

function readError (code) {
  console.log(code)
  switch (code) {
    case 'auth/weak-password':
      return 'Password too weak'
    case 'auth/email-already-in-use':
      return 'Email already registered'
    case 'auth/wrong-password':
      return 'Password incorrect'
    case 'auth/user-not-found':
      return 'Email incorrect'
    case 'auth/too-many-requests':
      return 'Too many requests - please try again later'
    default:
      return code
  }
}
