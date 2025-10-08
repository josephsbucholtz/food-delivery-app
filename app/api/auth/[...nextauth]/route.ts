import {verifyPassword} from '@/lib/auth-utils'
import prisma from '@/lib/prisma'
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import NextAuth, {NextAuthOptions} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Email and Password',
      credentials: {
        email: {label: 'Email', type: 'email', placeholder: 'john@example.com'},
        password: {label: 'Password', type: 'password'}
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error('Email and password are required');
        }

        // Find user by email
        const user =
            await prisma.user.findUnique({where: {email: credentials.email}}) as
            any;  // Type assertion to access password field

        if (!user || !user.password) {
          throw new Error('Invalid email or password');
        }

        // Verify password
        const isPasswordValid =
            await verifyPassword(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error('Invalid email or password');
        }

        // Return user object (NextAuth will handle session creation)
        return {
          id: user.id,
          email: user.email,
          name: user.name ||
              `${user.firstName || ''} ${user.lastName || ''}`.trim() || null,
          role: user.role,
        };
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async signIn({user, account}) {
      // Auto-assign admin role to specific emails
      const adminEmails = [
        'sviha195@gmail.com',    // Your correct email
        'vihashah@gmail.com',    // Alternative email if needed
        'your-email@gmail.com',  // Replace with your actual Google email
        // Add more admin emails here
      ];

      if (account && account.provider === 'google' && user.email &&
          adminEmails.includes(user.email)) {
        // Update role immediately for admin emails
        try {
          await prisma.user.update({
            where: {email: user.email as string},
            data: {role: 'ADMIN'},
          });
          console.log(`Updated ${user.email} to ADMIN role`);
        } catch (error) {
          console.error('Error updating user role:', error);
        }
      }

      return true;
    },
    async jwt({token, user}) {
      // Add user role to token for credentials-based auth
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({session, user, token}) {
      // Send properties to the client
      if (session.user) {
        session.user.id = (user && user.id) || (token.sub as string);
        // For database sessions, user.role should be the current role from
        // database
        session.user.role = (user as any && (user as any).role) || 'USER';
      }
      return session
    },
  },
  session: {
    strategy: 'database',  // Use database sessions for OAuth
  },
}

const handler = NextAuth(authOptions)
export {
  handler as GET, handler as POST
}