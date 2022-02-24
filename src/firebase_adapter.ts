import {
  addDoc,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  limit,
  query,
  runTransaction,
  updateDoc,
  where
} from 'firebase/firestore'
import { Adapter } from 'next-auth/adapters'
import { Accounts, Sessions, Users, VerificationTokens } from './firebase'

/** @return { import("next-auth/adapters").Adapter } */
export default function CustomFirebaseAdapter(db: Firestore): Adapter {
  return {
    // @ts-expect-error
    async createUser(user) {
      const { id } = await addDoc(Users, user)
      return { ...user, id }
    },
    async getUser(id) {
      const userDoc = await getDoc(doc(Users, id))
      if (!userDoc.exists()) return null
      return Users.converter?.fromFirestore(userDoc)
    },
    async getUserByEmail(email) {
      const userQuery = query(Users, where('email', '==', email), limit(1))
      const userDocs = await getDocs(userQuery)
      if (userDocs.empty) return null
      return Users.converter?.fromFirestore(userDocs.docs[0])
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const accountQuery = query(
        Accounts,
        where('provider', '==', provider),
        where('providerAccountId', '==', providerAccountId),
        limit(1)
      )
      const accountDocs = await getDocs(accountQuery)
      if (accountDocs.empty) return null
      const userDoc = await getDoc(
        doc(Users, accountDocs.docs[0].data().userId)
      )
      if (!userDoc.exists()) return null
      return Users.converter?.fromFirestore(userDoc)
    },
    async updateUser(user) {
      await updateDoc(doc(Users, user.id), user)
      const userDoc = await getDoc(doc(Users, user.id))
      return Users.converter?.fromFirestore(userDoc)
    },
    async deleteUser(userId) {
      const userDoc = doc(Users, userId)
      const accountsQuery = query(Accounts, where('userId', '==', userId))
      const sessionsQuery = query(Sessions, where('userId', '==', userId))
      await runTransaction(db, async (transaction) => {
        transaction.delete(userDoc)
        const accounts = await getDocs(accountsQuery)
        accounts.forEach((account) => transaction.delete(account.ref))
        const sessions = await getDocs(sessionsQuery)
        sessions.forEach((session) => transaction.delete(session.ref))
      })
    },
    async linkAccount(account) {
      const { id } = await addDoc(Accounts, account)
      return { ...account, id }
    },
    async unlinkAccount({ providerAccountId, provider }) {
      const accountQuery = query(
        Accounts,
        where('provider', '==', provider),
        where('providerAccountId', '==', providerAccountId),
        limit(1)
      )
      const accounts = await getDocs(accountQuery)
      if (accounts.empty) return
      await deleteDoc(accounts.docs[0].ref)
    },
    async createSession(session) {
      const { id } = await addDoc(Sessions, session)
      return { ...session, id }
    },
    async getSessionAndUser(sessionToken) {
      const sessionQuery = query(
        Sessions,
        where('sessionToken', '==', sessionToken),
        limit(1)
      )
      const sessionDocs = await getDocs(sessionQuery)
      if (sessionDocs.empty) return null
      const session = Sessions.converter?.fromFirestore(sessionDocs.docs[0])
      if (!session) return null
      const userDoc = await getDoc(doc(Users, session.userId))
      if (!userDoc.exists()) return null
      const user = Users.converter?.fromFirestore(userDoc)
      return { session, user }
    },
    async updateSession(partialSession) {
      const sessionQuery = query(
        Sessions,
        where('sessionToken', '==', partialSession.sessionToken),
        limit(1)
      )
      const sessionDocs = await getDocs(sessionQuery)
      if (sessionDocs.empty) return null
      await updateDoc(sessionDocs.docs[0].ref, partialSession)
    },
    async deleteSession(sessionToken) {
      const sessionQuery = query(
        Sessions,
        where('sessionToken', '==', sessionToken),
        limit(1)
      )
      const sessionDocs = await getDocs(sessionQuery)
      if (sessionDocs.empty) return
      await deleteDoc(sessionDocs.docs[0].ref)
    },
    async createVerificationToken(verificationToken) {
      await addDoc(VerificationTokens, verificationToken)
      return verificationToken
    },
    async useVerificationToken({ identifier, token }) {
      console.log(identifier, token)
      const verificationTokensQuery = query(
        VerificationTokens,
        where('identifier', '==', identifier),
        where('token', '==', token),
        limit(1)
      )
      const verificationTokenDocs = await getDocs(verificationTokensQuery)
      if (verificationTokenDocs.empty) return null
      await deleteDoc(verificationTokenDocs.docs[0].ref)
      const verificationToken = VerificationTokens.converter?.fromFirestore(
        verificationTokenDocs.docs[0]
      )
      delete verificationToken?.id
      return verificationToken
    }
  }
}
