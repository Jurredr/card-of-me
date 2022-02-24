// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import {
  collection,
  getFirestore,
  QueryDocumentSnapshot,
  Timestamp
} from 'firebase/firestore'
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

// Converter
const format = {
  // @ts-ignore
  toFirestore(object) {
    const newObjectobject = {}
    for (const key in object) {
      const value = object[key]
      if (value === undefined) continue
      // @ts-ignore
      newObjectobject[key] = value
    }
    return newObjectobject
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<any>) {
    if (!snapshot.exists()) return null
    const newUser = { ...snapshot.data(), id: snapshot.id }
    for (const key in newUser) {
      const value = newUser[key]
      if (value instanceof Timestamp) newUser[key] = value.toDate()
      else newUser[key] = value
    }
    return newUser
  }
}

// Collections
const Users = collection(db, 'users').withConverter(format)
const Sessions = collection(db, 'sessions').withConverter(format)
const Accounts = collection(db, 'accounts').withConverter(format)
const VerificationTokens = collection(db, 'verification_tokens').withConverter(
  format
)

export default app
export { db, storage, Users, Sessions, Accounts, VerificationTokens }
