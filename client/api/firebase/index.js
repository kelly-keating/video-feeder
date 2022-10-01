import { initializeApp } from 'firebase/app'

export const apiKey = "AIzaSyChsyFJj3pRZ_mtIc-iVtWp61jxdFrCYxo"

const firebaseConfig = {
  apiKey,
  authDomain: 'feeder-312704.firebaseapp.com',
  databaseURL: 'https://feeder-312704-68586.europe-west1.firebasedatabase.app',
  projectId: 'youtube-feeder-312704',
  storageBucket: 'youtube-feeder-312704.appspot.com',
  messagingSenderId: '208689749574',
  appId: '1:208689749574:web:1fdc097f9a017576027447'
}

export default initializeApp(firebaseConfig)
