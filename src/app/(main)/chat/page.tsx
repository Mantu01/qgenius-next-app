'use client'

import React, { useState } from 'react';
import NotLoggedIn from '@/components/auth/notLoggedIn';
import ChatInput from '@/components/chat/Input';
import Image from 'next/image';
import { useSelector } from 'react-redux';

export default function ChatInterface() {

  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  
  // ✅ Add loading state
  const [loading, setLoading] = useState<boolean>(false);

  if (!isAuthenticated) {
    return <NotLoggedIn />;
  }

  return (
    <div className="flex flex-col h-[80vh] bg-gray-50 dark:bg-gray-900">
      <main className="flex-1 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-8 px-4">
            <div className="h-24 w-24 mx-auto mb-6 relative">
              <Image
                src="https://res.cloudinary.com/dqznmhhtv/image/upload/v1745812881/image__1_-removebg-preview_cq7xid.png"
                alt="QGenius Logo"
                fill
                className="object-contain"
              />
            </div>

            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Welcome to QGenius
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              I&apos;m your AI assistant that provides intelligent, well-structured answers.
              <span className="block mt-2 text-green-600 dark:text-green-400">
                Try asking me anything!
              </span>
            </p>

            {/* Optional: Loading Indicator */}
            {loading && (
              <p className="text-blue-600 dark:text-blue-400 animate-pulse text-lg mt-4">
                Generating answer...
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Chat Input */}
      <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
        <div className="max-w-4xl mx-auto px-4">
          <ChatInput setLoading={setLoading} isOpening={true} />
        </div>
      </div>
    </div>
  );
}
