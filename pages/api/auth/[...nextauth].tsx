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
    async signIn({ user, account, profile, email, credentials }) {
      console.log(user, account, profile, email, credentials)

      // Change user here
      // user.username =
      return true
    }
    // async signIn(params) {
    //   console.log(params)

    //   const user = params.user
    //   const profile = params.profile

    //   // Change user here
    //   params.user = {
    //     username: user.username,
    //     id: user.id,
    //     email: user.email,
    //     name: {
    //       firstName: '',
    //       lastName: ''
    //     },
    //     avatar: null,
    //     card: []
    //   }

    //   if (profile) {
    //     params.user.name.firstName = profile.given_name
    //     params.user.name.lastName = profile.family_name
    //     params.user.avatar = profile.picture
    //   }
    //   return true
    // }
  },

  secret: process.env.JWT_SECRET,

  pages: {
    signIn: '/signin',
    verifyRequest: '/activate'
  }
})
