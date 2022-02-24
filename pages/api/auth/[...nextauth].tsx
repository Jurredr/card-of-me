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

      return session
    },

    async signIn({ user, account, profile, email, credentials }) {
      console.log(user, account, profile, email, credentials)

      // Change user here
      return true
    }
  },

  secret: process.env.JWT_SECRET,

  pages: {
    signIn: '/signin',
    verifyRequest: '/activate'
  }
})
