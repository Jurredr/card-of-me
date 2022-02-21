import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { db } from '../../../firebase'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'null',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'null'
    })
  ],

  // The callbacks
  callbacks: {
    async session({ session, token }) {
      session.user.username = session.user.name
        .split(' ')
        .join('')
        .toLocaleLowerCase()

      session.user.uid = token.sub

      return session
    },

    async signIn({ user, account, profile, email, credentials }) {
      console.log(user, account, profile, email, credentials)
      return true
      // await addDoc(collection(db, 'users'), {
      //   username: session?.user?.username || 'undefined',
      //   email: 'test@gmail.com',
      //   name: {
      //     firstName: 'John',
      //     lastName: 'Doe'
      //   },
      //   lastSeen: serverTimestamp(),
      //   avatar: session?.user?.image,
      //   card: {
      //     lastUpdated: serverTimestamp()
      //   }
      // })
    }
  },

  secret: process.env.JWT_SECRET,

  pages: {
    signIn: '/signin'
  }
})
