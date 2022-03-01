import NextAuth, { DefaultSession } from 'next-auth'
import { GoogleProfile } from 'next-auth/providers/google'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User
    expires: string
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    id: string
    username: string
    email: string
    name: {
      firstName: string
      lastName: string
    }
    image: string | null | undefined
  }

  /**
   * Usually contains information about the provider being used
   * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
   */
  interface Account {}

  /** The OAuth profile returned from your provider */
  interface Profile extends GoogleProfile {}
}
