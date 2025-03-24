'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Recent Chats', path: '/chat', icon: '📝' },
    { name: 'Saved Responses', path: '/chat/saved', icon: '⭐' },
    { name: 'Templates', path: '/chat/templates', icon: '📋' },
  ];

  const topicItems = [
    { name: 'Quantum Basics', path: '/chat?topic=basics', icon: '🔍' },
    { name: 'Quantum Algorithms', path: '/chat?topic=algorithms', icon: '⚙️' },
    { name: 'Quantum Hardware', path: '/chat?topic=hardware', icon: '💻' },
    { name: 'Error Correction', path: '/chat?topic=error', icon: '🔧' },
  ];

  return (
    <>
      {/* Mobile sidebar toggle */}
      <button
        className="md:hidden fixed top-20 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
      
      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="p-5 h-full flex flex-col">
          <Link 
            href="/chat"
            className="w-full mb-6 bg-blue-600 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-700 transition-colors"
          >
            New Chat
          </Link>
          
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Navigation</h3>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center space-x-3 p-2 rounded-md text-sm transition-colors ${
                    pathname === item.path
                      ? 'bg-blue-100 text-blue-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
          
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Popular Topics</h3>
            <nav className="space-y-1">
              {topicItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="flex items-center space-x-3 p-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="mt-auto pt-6 border-t border-gray-200">
            <Link 
              href="/"
              className="flex items-center space-x-3 p-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
              </svg>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30 mt-16"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
} 