import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import CustomFirebaseAdapter from '../../../src/firebase_adapter'
import { db } from '../../../src/firebase'

export default NextAuth({
  // Adapter
  adapter: CustomFirebaseAdapter(db),

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'null',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'null'
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
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
