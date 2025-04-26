'use client'

import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const SocialLogin = () => {
  return (
    <>
      <div className="flex justify-center gap-4 mb-6">
        <button
          type="button"
          className="p-3 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
          aria-label="Sign in with Google"
        >
          <FcGoogle className="h-6 w-6" />
        </button>
        <button
          type="button"
          className="p-3 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
          aria-label="Sign in with GitHub"
        >
          <FaGithub className="h-6 w-6 text-gray-800 dark:text-gray-200" />
        </button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
            Or continue with
          </span>
        </div>
      </div>
    </>
  );
};

export default SocialLogin;