'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  MessageSquare, 
  Star, 
  FileText, 
  Home,
  Search,
  Cpu,
  Monitor,
  Wrench,
  ChevronLeft,
  Menu,
  History
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const isChatPath = pathname.includes('/chat');
  const [isOpen, setIsOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);
  
  // Handle window resize
  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);
    
    // Add resize listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle sidebar visibility based on path and screen size
  useEffect(() => {
    if (!isChatPath) {
      setIsOpen(false);
    } else {
      // Default to open on desktop, closed on mobile
      setIsOpen(windowWidth >= 768);
    }
  }, [isChatPath, windowWidth]);

  // Don't render sidebar at all if not on chat path
  if (!isChatPath) {
    return null;
  }
  
  const navItems = [
    { name: 'Chats', path: '/chat', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'Chat History', path: '/chat/history', icon: <History className="w-5 h-5" /> },
    { name: 'Saved Responses', path: '/chat/saved', icon: <Star className="w-5 h-5" /> },
    { name: 'Templates', path: '/chat/templates', icon: <FileText className="w-5 h-5" /> },
  ];

  const topicItems = [
    { name: 'Quantum Basics', path: '/chat?topic=basics', icon: <Search className="w-5 h-5" /> },
    { name: 'Quantum Algorithms', path: '/chat?topic=algorithms', icon: <Cpu className="w-5 h-5" /> },
    { name: 'Quantum Hardware', path: '/chat?topic=hardware', icon: <Monitor className="w-5 h-5" /> },
    { name: 'Error Correction', path: '/chat?topic=error', icon: <Wrench className="w-5 h-5" /> },
  ];

  const isActivePath = (path: string) => {
    if (path === '/chat' && pathname === '/chat') return true;
    if (path.startsWith('/chat/') && pathname === path) return true;
    if (path.includes('?topic=') && pathname.includes('/chat') && window.location.search.includes(path.split('?')[1])) return true;
    return false;
  };

  // Toggle sidebar for mobile
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile toggle button - positioned fixed for consistent access */}
      <button
        className="md:hidden fixed top-16 left-1 z-40 p-2 bg-white dark:bg-gray-900 rounded-md shadow-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? (
          <ChevronLeft className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>
      
      {/* Main sidebar */}
      <aside
        className={`fixed md:sticky top-16 left-0 z-30 h-[calc(100vh-4rem)] pt-20 md:pt-0 w-72 bg-white dark:bg-gray-900 border-r border-blue-200 dark:border-blue-900 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 overflow-y-auto`}
      >
        <div className="p-5 h-full flex flex-col">
          
          {/* Navigation section */}
          <div className="mb-8 px-2">
            <h3 className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3 pl-2">Navigation</h3>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => windowWidth < 768 && setIsOpen(false)}
                  className={`flex items-center space-x-3 p-3 rounded-lg text-sm font-medium transition-colors ${
                    isActivePath(item.path)
                      ? 'bg-blue-50 dark:bg-gray-800 text-red-600 dark:text-red-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                  }`}
                >
                  <span className={isActivePath(item.path) ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Topics section */}
          <div className="px-2">
            <h3 className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3 pl-2">Popular Topics</h3>
            <nav className="space-y-1">
              {topicItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => windowWidth < 768 && setIsOpen(false)}
                  className={`flex items-center space-x-3 p-3 rounded-lg text-sm font-medium transition-colors
                    ${isActivePath(item.path)
                      ? 'bbg-blue-50 dark:bg-gray-800 text-red-600 dark:text-red-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }`}
                >
                  <span className={isActivePath(item.path) ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Footer section */}
          <div className="mt-auto pt-6 border-t border-blue-100 dark:border-blue-900/50 px-2">
            <Link 
              href="/"
              onClick={() => windowWidth < 768 && setIsOpen(false)}
              className="flex items-center space-x-3 p-3 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              <Home className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </aside>
      
      {/* Overlay for mobile when sidebar is open */}
      {isOpen && windowWidth < 768 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 mt-16"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}