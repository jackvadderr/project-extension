// import connectDB from '@/utils/database'
import { connectDB } from '@/app/utils/database'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import bcrypt from 'bcrypt'
import { getUserByEmail } from '../../user/service'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'E-mail', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        await connectDB()

        const { email, password } = credentials

        const user = await getUserByEmail(email)

        if (!user) {
          return null
        }

        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) {
          return null
        }

        return { email: user.email, id: user._id }
      }
    }),
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ]
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
