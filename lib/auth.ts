import {authOptions} from '@/app/api/auth/[...nextauth]/route'
import {getServerSession} from 'next-auth/next'

export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions)
    return (session && session.user) || null
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export function isAdmin(user: any) {
  return user && user.role === 'ADMIN';
}

export function isUser(user: any) {
  return user && user.role === 'USER';
}

// Mock authentication state for development
export const mockAuth = {
  signIn: (credentials: any) => {
    console.log('Mock sign in with:', credentials);
    localStorage.setItem('mockUser', JSON.stringify({
      id: '1',
      email: credentials.email,
      role: credentials.email.includes('admin') ? 'ADMIN' : 'USER',
      name: 'Test User'
    }));
  },

  signOut: () => {
    localStorage.removeItem('mockUser');
  },

  getCurrentUser: () => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('mockUser');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }
};