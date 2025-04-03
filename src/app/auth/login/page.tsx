'use client'

import React, { useState } from 'react';
import { Eye, EyeOff, Mail, KeyRound } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black flex items-center justify-center p-4 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="p-6 flex justify-center border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <img 
            src="https://res.cloudinary.com/dqznmhhtv/image/upload/v1740554497/image-removebg-preview_nerxe2.png" 
            alt="QGenius Logo"
            className="h-16 w-auto"
          />
        </div>

        <div className="p-8 md:p-10">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            Sign In to Your Account
          </h2>
          
          {/* Social Login Buttons */}
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

          {/* Divider */}
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

          <form className="space-y-6">
            {/* Email Input */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 dark:focus:border-blue-400 dark:focus:ring-blue-400/30 transition duration-200 ease-in-out text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  required
                  className="w-full pl-10 pr-12 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 dark:focus:border-blue-400 dark:focus:ring-blue-400/30 transition duration-200 ease-in-out text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="text-right mt-2">
                <Link href="/auth/forgot-password"> 
                  <span className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-colors duration-200">
                    Forgot password?
                  </span>
                </Link>
              </div>
            </div>

            {/* Submit Button - Red */}
            <button
              type="submit"
              className="w-full bg-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-900 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
            >
              Sign In
            </button>
          </form>

          {/* Sign Up Link - Blue */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link href="/auth/signup">
                <span className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-colors duration-200">
                  Create Account
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;