'use client'

import ChatMessage from '@/components/chat/ChatMessage';
import ChatInput from '@/components/chat/Input';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { initChat, setSelctedChat } from '@/app/store/chatSlice';

function Page() {
  const [isLoading, setLoading] = React.useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const { chat, selectedChat } = useSelector((state: RootState) => state.chat);
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const header = selectedChat?.header;
  const { chatId } = useParams();

  useEffect(() => {
    if (chatId && isAuthenticated) {
      axios.get(`/api/chat/${chatId}`)
        .then(({ data }) => {
          dispatch(setSelctedChat({id: data.id, header: data.header}))
          dispatch(initChat(data.messages));
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [chatId, isAuthenticated, dispatch]);

  // Improved scroll behavior
  useEffect(() => {
    if (messagesEndRef.current && chatContainerRef.current) {
      const container = chatContainerRef.current;
      
      // Always scroll to bottom on initial load
      if (isInitialLoad) {
        container.scrollTop = container.scrollHeight;
        setIsInitialLoad(false);
        return;
      }

      // For subsequent updates, only scroll if near bottom
      const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
      
      if (isNearBottom) {
        messagesEndRef.current.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  }, [chat, isInitialLoad]);

  return (
    <div className='flex flex-col h-[calc(100vh-64px)] bg-gray-50/30 dark:bg-gray-900'>
      {header && (
        <header className='border-b border-gray-200/60 dark:border-gray-800/60 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md py-5 sticky top-0 z-10'>
          <div className='max-w-4xl mx-auto px-6'>
            <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-100 truncate tracking-tight'>
              {header || 'Untitled Chat'}
            </h1>
          </div>
        </header>
      )}
      
      <main 
        ref={chatContainerRef}
        className='flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent'
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgb(156 163 175) transparent'
        }}
      >
        <div className='max-w-4xl mx-auto px-6 pb-32 pt-4'> {/* Added pt-4 for top padding */}
          {chat.length === 0 && !isLoading ? (
            <div className='flex flex-col items-center justify-center h-full min-h-[60vh]'>
              <div className='text-center max-w-lg p-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-2xl'>
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-3xl flex items-center justify-center shadow-inner">
                  <svg className="w-10 h-10 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight'>
                  {header ? 'Continue Your Conversation' : 'Start a New Conversation'}
                </h2>
                <p className='text-gray-600 dark:text-gray-400 leading-relaxed text-lg'>
                  {header 
                    ? 'Pick up where you left off with your AI assistant.' 
                    : 'Ask anything or share your thoughts with the AI assistant.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {chat?.map((c, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${c.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in-0 slide-in-from-bottom-4 duration-500`}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <ChatMessage content={c.content} role={c.role} />
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 rounded-2xl px-6 py-4 max-w-[80%] shadow-lg">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Loader2 size={18} className="animate-spin text-green-500" />
                        <div className="absolute inset-0 animate-ping">
                          <Loader2 size={18} className="text-green-500/30" />
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        AI is thinking...
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} className="h-6" />
            </div>
          )}
        </div>
      </main>

      <footer className='bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800'>
        <div className='max-w-3xl mx-auto'>
          <ChatInput isOpening={false} setLoading={setLoading} />
        </div>
      </footer>
    </div>
  )
}

export default Page;