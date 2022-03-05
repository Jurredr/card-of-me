import { addDoc, getDocs, limit, query, where } from 'firebase/firestore'
import { User } from 'next-auth'
import { Users } from './firebase'

export async function getUserByEmail(email: string) {
  const userQuery = query(
    Users,
    where('email', '==', email.toLowerCase()),
    limit(1)
  )
  const userDocs = await getDocs(userQuery)
  userDocs.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data())
  })
  if (userDocs.empty) return null
  return userDocs.docs[0]
}

export async function getUserByUsername(username: string) {
  const userQuery = query(
    Users,
    where('username', '==', username.toLowerCase()),
    limit(1)
  )
  const userDocs = await getDocs(userQuery)
  userDocs.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data())
  })
  if (userDocs.empty) return null
  return userDocs.docs[0]
}

export async function createUser(user: User) {
  const { id } = await addDoc(Users, user)
  return { ...user, id }
}
