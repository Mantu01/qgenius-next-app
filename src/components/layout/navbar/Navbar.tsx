'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import NavLogo from './NavLogo';
import NavLinks from './NavLinks';
import NavButtons from './NavButtons';
import MobileMenu from './MobileMenu';
import ThemeToggler from './ThemeToggler';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const pathname = usePathname();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    const savedMode = localStorage.getItem('theme');
    if (savedMode) {
      setDarkMode(savedMode === 'dark');
    }
  }, []);

  useEffect(() => {
    const html = document.querySelector('html');
    if (darkMode) {
      html?.classList.add('dark');
      html?.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      html?.classList.remove('dark');
      html?.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Chat', path: '/chat' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm fixed top-0 w-full z-50 shadow-black dark:shadow-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <NavLogo />
          
          <NavLinks navItems={navItems} pathname={pathname} />

          <NavButtons 
            isAuthenticated={isAuthenticated} 
            darkMode={darkMode} 
            toggleTheme={toggleTheme} 
          />

          <div className="flex items-center md:hidden space-x-2">
            <ThemeToggler darkMode={darkMode} toggleTheme={toggleTheme} />
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2"
              aria-expanded={isMenuOpen ? 'true' : 'false'}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <MobileMenu 
          navItems={navItems} 
          pathname={pathname} 
          isAuthenticated={isAuthenticated}
          setIsMenuOpen={setIsMenuOpen}
        />
      )}
    </nav>
  );
}