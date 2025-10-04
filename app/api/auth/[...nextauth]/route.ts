import prisma from '@/lib/prisma'
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import NextAuth, {NextAuthOptions} from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  })],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async signIn({user, account}) {
      // Auto-assign admin role to specific emails
      const adminEmails = [
        'sviha195@gmail.com',
        // Add more admin emails here
      ];

      if (account?.provider === 'google' && adminEmails.includes(user.email!)) {
        // This will run after the user is created by PrismaAdapter
        setTimeout(async () => {
          await prisma.user.update({
            where: {email: user.email!},
            data: {role: 'ADMIN'},
          });
        }, 100);
      }

      return true;
    },
    async session({session, user}) {
      // Send properties to the client
      if (session.user) {
        session.user.id = user.id;
        session.user.role = (user as any).role || 'USER';
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export {
  handler as GET, handler as POST
}