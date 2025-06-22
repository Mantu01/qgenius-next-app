import { useRouter } from 'next/navigation';
import React from 'react'

function NotLoggedIn() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50/50 dark:bg-gray-900/90 backdrop-blur-sm">
      <div className="text-center p-8 max-w-md w-full mx-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-md">
          <svg 
            className="w-10 h-10 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
            />
          </svg>
        </div>
        
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Authentication Required
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed">
          You need to be signed in to access this page. Please log in to continue to your account.
        </p>
        
        <div className="space-y-3">
          <button
            onClick={() => router.push('/login')}
            className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg transition-all duration-200 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 shadow hover:shadow-md"
          >
            Sign In to Continue
          </button>
          
          <button
            onClick={() => router.push('/signup')}
            className="w-full px-6 py-2.5 text-sm text-red-600 dark:text-red-400 font-medium rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Don't have an account? Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotLoggedIn