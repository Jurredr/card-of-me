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
    async jwt({ token, user, account, profile, isNewUser }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      if (user) {
        // Add a new prop on token for user data
        token.data = user
      }
      return token
    },
    async session({ session, user, token }) {
      session.user = user
      return session
    },
    async signIn({ user, account, profile, email, credentials }) {
      console.log(user, account, profile, email, credentials)

      // Change user here
      // user.username =
      return true
    }
  },

  secret: process.env.JWT_SECRET,

  pages: {
    signIn: '/signin',
    verifyRequest: '/activate'
  }
})
