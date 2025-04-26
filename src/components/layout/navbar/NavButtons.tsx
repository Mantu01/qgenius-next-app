import React from 'react';
import Link from 'next/link';
import ThemeToggler from './ThemeToggler';
import ProfileButton from './ProfileButton';

export default function NavButtons({ isAuthenticated, darkMode, toggleTheme }) {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <Link
        href={isAuthenticated ? '/features' : '/login'}
        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
      >
        {isAuthenticated && 'Login'}
      </Link>
      
      {isAuthenticated && <ProfileButton isAuthenticated={isAuthenticated} />}
      
      <ThemeToggler darkMode={darkMode} toggleTheme={toggleTheme} />
    </div>
  );
}