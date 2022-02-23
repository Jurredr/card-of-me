import { getDocs, limit, query, where } from 'firebase/firestore'
import { Users } from './firebase'

// @ts-expect-error
export async function getUserByEmail(email) {
  const userQuery = query(Users, where('email', '==', email), limit(1))
  const userDocs = await getDocs(userQuery)
  userDocs.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data())
  })
  if (userDocs.empty) return null
  return userDocs.docs[0]
}
