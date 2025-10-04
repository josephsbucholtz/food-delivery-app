'use client';

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <nav className="p-4 bg-gray-100">
      <div className="flex gap-4 items-center">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/home/user" className="hover:underline">View Items</Link>
        
        {/* Only show Admin link if user is an admin */}
        {session?.user?.role === 'ADMIN' && (
          <Link href="/home/admin" className="hover:underline">Admin</Link>
        )}
        
        <div className="ml-auto flex gap-2 items-center">
          {status === 'loading' && (
            <span className="text-sm text-gray-600">Loading...</span>
          )}
          
          {status === 'authenticated' && session?.user ? (
            <>
              <span className="text-sm text-gray-600">
                Welcome, {session.user.name || session.user.email}
                {session.user.role === 'ADMIN' && ' (Admin)'}
              </span>
              <button 
                onClick={handleSignOut}
                className="px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-50"
              >
                Sign Out
              </button>
            </>
          ) : status === 'unauthenticated' && (
            <>
              <Link 
                href="/auth/signin"
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
              >
                Sign In
              </Link>
              <Link 
                href="/auth/signup"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}