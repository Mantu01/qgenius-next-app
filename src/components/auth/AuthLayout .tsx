'use client'

import React from 'react';
import Image from 'next/image';

//@ts-expect-error: unknown
const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black flex items-center justify-center p-4 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="p-6 flex justify-center border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <Image 
            src="https://res.cloudinary.com/dqznmhhtv/image/upload/v1745812881/image__1_-removebg-preview_cq7xid.png" 
            alt="QGenius Logo"
            width={128} // You can adjust width and height as per your design
            height={64}
            className="h-16 w-auto"
            priority // Optional: to preload the image for faster rendering
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
