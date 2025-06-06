'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux'; // Added for dispatch
import { 
  MessageSquare, Star, FileText, Home, Search, Cpu, Monitor, Wrench,
  ChevronLeft, Menu, History, User, Settings, Bell, Bookmark, Edit,
  Clock, Folder, Tag, BookOpen, CheckSquare, Shield, CreditCard, Link2, 
  Download, Plus, Sparkles
} from 'lucide-react';
import { removeChat } from '@/app/store/chatSlice';

interface SectionItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  isSpecial?: boolean;
  specialColor?: string;
}

interface Section {
  title: string;
  items: SectionItem[];
}

interface SectionConfig {
  active: boolean;
  sections: Section[];
}

interface SectionMap {
  [key: string]: SectionConfig;
}

// Placeholder for Redux action definitions
// Typically, these would be in an actions file or a slice (e.g., using Redux Toolkit)
// Example:
// const SIDEBAR_NEW_CHAT_CLICKED = 'SIDEBAR_NEW_CHAT_CLICKED';
// const SIDEBAR_NEW_NOTE_CLICKED = 'SIDEBAR_NEW_NOTE_CLICKED';
//
// export const newChatClicked = (payload) => ({ type: SIDEBAR_NEW_CHAT_CLICKED, payload });
// export const newNoteClicked = (payload) => ({ type: SIDEBAR_NEW_NOTE_CLICKED, payload });

export default function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch(); // Added: Initialize dispatch
  const [isOpen, setIsOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);
  
  const sectionMap: SectionMap = {
    '/chat': {
      active: pathname.includes('/chat'),
      sections: [
        {
          title: 'Chat Actions',
          items: [
            { 
              name: 'New Chat', 
              path: '/chat', 
              icon: <Plus className="w-5 h-5" />,
              isSpecial: true,
              specialColor: 'red'
            },
          ]
        },
        {
          title: 'Navigation',
          items: [
            { name: 'All Chats', path: '/chat', icon: <MessageSquare className="w-5 h-5" /> },
            { name: 'Chat History', path: '/chat/history', icon: <History className="w-5 h-5" /> },
            { name: 'Favourites', path: '/chat/favourite', icon: <Star className="w-5 h-5" /> },
            { name: 'Templates', path: '/chat/templates', icon: <FileText className="w-5 h-5" /> },
          ]
        },
      ]
    },
    '/note': {
      active: pathname.includes('/note'),
      sections: [
        {
          title: 'Note Actions',
          items: [
            { 
              name: 'New Note', 
              path: '/note/new', 
              icon: <Plus className="w-5 h-5" />,
              isSpecial: true,
              specialColor: 'red'
            },
          ]
        },
        {
          title: 'Notes Management',
          items: [
            { name: 'All Notes', path: '/note', icon: <Edit className="w-5 h-5" /> },
            { name: 'Recent Notes', path: '/note/recent', icon: <Clock className="w-5 h-5" /> },
            { name: 'Bookmarked', path: '/note/bookmarked', icon: <Bookmark className="w-5 h-5" /> },
            { name: 'Folders', path: '/note/folders', icon: <Folder className="w-5 h-5" /> },
          ]
        },
      ]
    },
    '/profile': {
      active: pathname.includes('/profile'),
      sections: [
        {
          title: 'Profile Management',
          items: [
            { name: 'Account', path: '/profile', icon: <User className="w-5 h-5" /> },
            { name: 'Settings', path: '/profile/settings', icon: <Settings className="w-5 h-5" /> },
            { name: 'Notifications', path: '/profile/notifications', icon: <Bell className="w-5 h-5" /> },
            { name: 'Preferences', path: '/profile/preferences', icon: <Sparkles className="w-5 h-5" /> },
          ]
        },
        {
          title: 'Account Settings',
          items: [
            { name: 'Security', path: '/profile?section=security', icon: <Shield className="w-5 h-5" /> },
            { name: 'Subscription', path: '/profile?section=subscription', icon: <CreditCard className="w-5 h-5" /> },
            { name: 'Connected Apps', path: '/profile?section=apps', icon: <Link2 className="w-5 h-5" /> },
            { name: 'Data Export', path: '/profile?section=data', icon: <Download className="w-5 h-5" /> },
          ]
        }
      ]
    }
  };
  
  const activeSectionKey = Object.keys(sectionMap).find(key => sectionMap[key].active);
  const shouldRenderSidebar = Boolean(activeSectionKey);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    setWindowWidth(window.innerWidth); // Set initial width
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    // Sidebar is open by default on desktop, closed on mobile unless shouldRenderSidebar is false
    setIsOpen(shouldRenderSidebar && windowWidth >= 768);
  }, [shouldRenderSidebar, windowWidth]);

  if (!shouldRenderSidebar) return null;
  
  const isActivePath = (path: string) => {
    if (path === pathname) return true;
    if (path.includes('?')) {
      const [basePath, queryString] = path.split('?');
      if (!pathname.includes(basePath)) return false;
      const queryPairs = new URLSearchParams(queryString);
      for (const [key, value] of queryPairs.entries())
        if (searchParams.get(key) !== value) return false;
      return true;
    }
    return false;
  };

  const NavLink = ({ item }: { item: SectionItem }) => {
    const isActive = isActivePath(item.path);
    
    const handleItemClick = () => {
      // Dispatch logic for specific items
      if (item.name === 'New Chat' && item.isSpecial) {
        dispatch(removeChat());
      } else if (item.name === 'New Note' && item.isSpecial) {
        dispatch({ type: 'SIDEBAR_NEW_NOTE_CLICKED', payload: { path: item.path, name: item.name } });
        console.log('Dispatch: New Note Clicked', { path: item.path, name: item.name });
      }

      // Close sidebar on mobile after any link click
      if (windowWidth < 768) {
        setIsOpen(false);
      }
    };
    
    if (item.isSpecial && item.specialColor === 'red') {
      return (
        <Link
          href={item.path}
          onClick={handleItemClick} // Use the combined handler
          className="flex items-center justify-center space-x-3 p-3 mb-4 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <span className="text-white">
            {item.icon}
          </span>
          <span>{item.name}</span>
        </Link>
      );
    }

    return (
      <Link
        href={item.path}
        onClick={handleItemClick} // Use the combined handler
        className={`flex items-center space-x-3 p-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
          isActive
            ? 'bg-gradient-to-r from-red-50 to-indigo-50 dark:from-red-900/20 dark:to-indigo-900/20 text-red-700 dark:text-red-300 border-l-4 border-red-500 shadow-sm'
            : 'text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-800/50 hover:shadow-sm hover:translate-x-1'
        }`}
      >
        <span className={`transition-colors ${
          isActive 
            ? 'text-red-600 dark:text-red-400' 
            : 'text-gray-500 dark:text-gray-400 group-hover:text-green-700 dark:group-hover:text-green-300'
        }`}>
          {item.icon}
        </span>
        <span className="font-medium">{item.name}</span>
      </Link>
    );
  };

  const NavSection = ({ title, items }: { title: string; items: SectionItem[] }) => (
    <div className="mb-8">
      <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 px-3 font-sans">
        {title}
      </h3>
      <nav className="space-y-2 px-2">
        {items.map((item: SectionItem) => (
          <NavLink key={item.path} item={item} />
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile "Open" Toggle Button: Shown when sidebar is closed on mobile */}
      {windowWidth < 768 && !isOpen && (
        <button
          className="fixed top-20 left-4 z-50 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:shadow-xl"
          onClick={() => setIsOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] pt-6 md:pt-0 w-80 md:w-60 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        } md:translate-x-0 md:shadow-lg overflow-hidden`}
        // `aside` itself acts as a positioning context due to `fixed` and `transform`
      >
        {/* Mobile "Close" Toggle Button: Shown inside sidebar when open on mobile */}
        {windowWidth < 768 && isOpen && (
          <button
            className="absolute top-4 right-4 z-50 p-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        {/* Sidebar Content */}
        <div className="h-full flex flex-col bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900 dark:to-gray-900">
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent px-4 py-6">
            {activeSectionKey && sectionMap[activeSectionKey].sections.map((section, index: number) => (
              <NavSection key={index} title={section.title} items={section.items} />
            ))}
          </div>
          
          {/* Footer Section */}
          <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 p-4">
            <Link 
              href="/"
              onClick={() => {
                // Also close sidebar on mobile for home link
                if (windowWidth < 768) {
                  setIsOpen(false);
                }
              }}
              className="flex items-center space-x-3 p-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 hover:shadow-md group"
            >
              <Home className="h-5 w-5 group-hover:text-red-500 transition-colors" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </aside>
      
      {/* Mobile Overlay */}
      {isOpen && windowWidth < 768 && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 mt-16"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}