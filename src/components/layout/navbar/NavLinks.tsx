import React from 'react';
import Link from 'next/link';

export default function NavLinks({ navItems, pathname }) {
  return (
    <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
      {navItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path))
              ? 'bg-blue-50 dark:bg-gray-800 text-red-600 dark:text-red-400'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
          }`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}