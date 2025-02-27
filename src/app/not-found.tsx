'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-6">
      <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        Oops!
      </h1>
      <h2 className="text-2xl font-semibold text-gray-800 mt-4">404 - Page Not Found</h2>
      <p className="text-gray-600 mt-2 max-w-lg">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => router.push('/')}
          className="px-6 py-2 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-lg"
        >
          Go to Homepage
        </button>
        <button
          onClick={() => router.back()}
          className="px-6 py-2 text-lg font-semibold text-gray-800 bg-gray-200 hover:bg-gray-300 rounded-lg transition shadow-lg"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
