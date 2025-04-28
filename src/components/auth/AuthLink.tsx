import React from 'react';
import Link from 'next/link';

const AuthLink = ({ text, linkText, href }:LinkProps) => {
  return (
    <div className="mt-6 text-center">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {text}{' '}
        <Link href={href}>
          <span className="font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 hover:underline transition-colors duration-200">
            {linkText}
          </span>
        </Link>
      </p>
    </div>
  );
};

export default AuthLink;