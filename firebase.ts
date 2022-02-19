// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDFuI5fYd5BEI9DptRwVDmdQpH5M5N0YxA',
  authDomain: 'card-of-me.firebaseapp.com',
  projectId: 'card-of-me',
  storageBucket: 'card-of-me.appspot.com',
  messagingSenderId: '627163001645',
  appId: '1:627163001645:web:a8dea97d3440afde4c59a4',
  measurementId: 'G-LCTJSXLXJ6'
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()

export default app
export { db, storage }
