'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  MessageSquare, Star, FileText, Home, Search, Cpu, Monitor, Wrench,
  ChevronLeft, Menu, History, User, Settings, Bell, Bookmark, Edit,
  Clock, Folder, Tag, BookOpen, CheckSquare, Shield, CreditCard, Link2, Download
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);
  
  const sectionMap: SectionMap = {
    '/chat': {
      active: pathname.includes('/chat'),
      sections: [
        {
          title: 'Navigation',
          items: [
            { name: 'Chats', path: '/chat', icon: <MessageSquare className="w-5 h-5" /> },
            { name: 'Chat History', path: '/chat/history', icon: <History className="w-5 h-5" /> },
            { name: 'Favourite', path: '/chat/favourite', icon: <Star className="w-5 h-5" /> },
            { name: 'Templates', path: '/chat/templates', icon: <FileText className="w-5 h-5" /> },
          ]
        },
        {
          title: 'Popular Topics',
          items: [
            { name: 'Quantum Basics', path: '/chat?topic=basics', icon: <Search className="w-5 h-5" /> },
            { name: 'Quantum Algorithms', path: '/chat?topic=algorithms', icon: <Cpu className="w-5 h-5" /> },
            { name: 'Quantum Hardware', path: '/chat?topic=hardware', icon: <Monitor className="w-5 h-5" /> },
            { name: 'Error Correction', path: '/chat?topic=error', icon: <Wrench className="w-5 h-5" /> },
          ]
        }
      ]
    },
    '/note': {
      active: pathname.includes('/note'),
      sections: [
        {
          title: 'Notes',
          items: [
            { name: 'All Notes', path: '/note', icon: <Edit className="w-5 h-5" /> },
            { name: 'Recent Notes', path: '/note/recent', icon: <Clock className="w-5 h-5" /> },
            { name: 'Bookmarked', path: '/note/bookmarked', icon: <Bookmark className="w-5 h-5" /> },
            { name: 'Folders', path: '/note/folders', icon: <Folder className="w-5 h-5" /> },
          ]
        },
        {
          title: 'Categories',
          items: [
            { name: 'Research', path: '/note?category=research', icon: <BookOpen className="w-5 h-5" /> },
            { name: 'Tasks', path: '/note?category=tasks', icon: <CheckSquare className="w-5 h-5" /> },
            { name: 'Ideas', path: '/note?category=ideas', icon: <Tag className="w-5 h-5" /> },
            { name: 'Projects', path: '/note?category=projects', icon: <FileText className="w-5 h-5" /> },
          ]
        }
      ]
    },
    '/profile': {
      active: pathname.includes('/profile'),
      sections: [
        {
          title: 'Profile',
          items: [
            { name: 'Account', path: '/profile', icon: <User className="w-5 h-5" /> },
            { name: 'Settings', path: '/profile/settings', icon: <Settings className="w-5 h-5" /> },
            { name: 'Notifications', path: '/profile/notifications', icon: <Bell className="w-5 h-5" /> },
            { name: 'Preferences', path: '/profile/preferences', icon: <Star className="w-5 h-5" /> },
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
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    setIsOpen(shouldRenderSidebar && windowWidth >= 768);
  }, [shouldRenderSidebar, windowWidth]);

  if (!shouldRenderSidebar) return null;
  
  const isActivePath = (path:string) => {
    if (path === pathname) return true;
    if (path.includes('?') && 
        pathname.includes(path.split('?')[0]) && 
        window.location.search.includes(path.split('?')[1])) return true;
    return false;
  };

  const NavLink = ({ item }:any) => (
    <Link
      href={item.path}
      onClick={() => windowWidth < 768 && setIsOpen(false)}
      className={`flex items-center space-x-3 p-3 rounded-lg text-sm font-medium transition-colors ${isActivePath(item.path)? 'bg-blue-50:bg-gray-800 text-red-600 dark:text-red-400': 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}
    >
      <span className={isActivePath(item.path) ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}>
        {item.icon}
      </span>
      <span>{item.name}</span>
    </Link>
  );

  const NavSection = ({ title, items }:{title:string,items:SectionItem[]}) => (
    <div className="mb-8 px-2">
      <h3 className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3 pl-2">
        {title}
      </h3>
      <nav className="space-y-1">
        {items.map((item:SectionItem) => <NavLink key={item.path} item={item} />)}
      </nav>
    </div>
  );

  return (
    <>
      <button
        className="md:hidden fixed top-16 left-1 z-40 p-2 bg-white dark:bg-gray-900 rounded-md shadow-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <ChevronLeft className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      
      <aside
        className={`fixed md:sticky top-16 left-0 z-30 h-[calc(100vh-4rem)] pt-20 md:pt-0 w-72 md:w-56 bg-white dark:bg-gray-900 border-r border-blue-200 dark:border-blue-900 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 overflow-y-auto`}
      >
        <div className="p-5 h-full flex flex-col">
          {activeSectionKey && sectionMap[activeSectionKey].sections.map((section, index:number) => (
            <NavSection key={index} title={section.title} items={section.items} />
          ))}
          
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