'use client'

import ChatMessage from '@/components/chat/ChatMessage';
import ChatInput from '@/components/chat/Input';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { initChat } from '@/app/store/chatSlice';

function Page() {
  const { chat } = useSelector((state: RootState) => state.chat);
  const [isLoading, setIsLoading] = React.useState(true);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const router = useRouter();
  const { chatId } = useParams();

  useEffect(() => {
    if (chatId && isAuthenticated) {
      axios.get(`/api/chat/${chatId}`)
        .then(({ data }) => {
          dispatch(initChat(data.messages));
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [chatId, isAuthenticated, dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-white dark:bg-gray-900">
        <div className="text-center p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Authentication Required
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please sign in to access your chats.
          </p>
          <button
            onClick={() => router.push('/login')}
            className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col min-h-[calc(100vh-64px)] bg-white dark:bg-gray-900'>
      <main className='flex-1 overflow-y-auto py-6'>
        <div className='max-w-3xl mx-auto px-4 space-y-6'>
          {chat.length === 0 && !isLoading ? (
            <div className='flex flex-col items-center justify-center h-[60vh]'>
              <div className='text-center max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm'>
                <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3'>
                  Start a conversation
                </h2>
                <p className='text-gray-600 dark:text-gray-400'>
                  Ask anything or share your thoughts with the AI Assistant.
                </p>
              </div>
            </div>
          ) : (
            <>
              {chat.map((c,idx) => (
                <div 
                  key={idx} 
                  className={`flex ${c.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <ChatMessage content={c.content} role={c.role} />
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 max-w-[80%] shadow-sm">
                    <div className="flex items-center space-x-2">
                      <Loader2 size={16} className="animate-spin text-green-500" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} className="h-4" />
            </>
          )}
        </div>
      </main>

      <footer className='bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800'>
        <div className='max-w-3xl mx-auto p-4'>
          <div className='mb-2'>
            <ChatInput isOpening={false} />
          </div>
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            AI Assistant may produce inaccurate information
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Page;