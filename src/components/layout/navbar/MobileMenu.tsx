import React from 'react';
import Link from 'next/link';

export default function MobileMenu({ navItems, pathname, isAuthenticated, setIsMenuOpen }) {
  return (
    <div className="md:hidden bg-white dark:bg-gray-900">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === item.path
                ? 'bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            {item.name}
          </Link>
        ))}
        
        <Link
          href={isAuthenticated ? '/features' : '/login'}
          className="block w-full text-center mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700"
          onClick={() => setIsMenuOpen(false)}
        >
          Login
        </Link>
        
        {isAuthenticated && (
          <Link
            href="/account"
            className="block w-full text-center mt-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => setIsMenuOpen(false)}
          >
            My Profile
          </Link>
        )}
      </div>
    </div>
  );
}