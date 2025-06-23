'use client'

import React from 'react'
import { useSelector } from 'react-redux'

function UnverifiedUserPage() {
  
  const {user}=useSelector((state:RootState)=>state.user);
  
  return (
    <div className="h-[80vh] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <div className="max-w-md mx-auto bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Account Not Verified</h1>
          <div className="w-16 h-1 bg-red-500 mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300">
            Your account is currently unverified. Please verify your email address to access all features.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-lg p-4 mb-6 border border-gray-200 dark:border-gray-600">
          <div className="flex items-start">
            <div className="flex-shrink-0 text-green-500">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium">Verification Email Sent</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                We&apos;ve sent a confirmation email to <span className="font-semibold">{user?.email}</span>.
                Click the link in the email to verify your account.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Didn&apos;t receive the email?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Check your spam folder or request a new verification email below.
            </p>
          </div>

          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            Need help? <a href="#" className="text-gray-700 dark:text-gray-300 underline">Contact Support</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnverifiedUserPage