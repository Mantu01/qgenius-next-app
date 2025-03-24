'use client'

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // Assuming you're using lucide-react for icons

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-200 via-purple-100 to-pink-50 flex items-center justify-center p-6">
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_rgba(31,38,135,0.2)] w-full max-w-lg overflow-hidden transform hover:scale-[1.03] transition-all duration-500 ease-out border border-gray-100/50">
        {/* Logo Header with Glow */}
        <div className="p-8 flex justify-center bg-gradient-to-br from-indigo-600 to-purple-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent)] animate-pulse-slow"></div>
          <img 
            src="https://res.cloudinary.com/dqznmhhtv/image/upload/v1740554497/image-removebg-preview_nerxe2.png" 
            alt="QGeninus Logo" 
            className="h-20 w-auto relative z-10 animate-[float_3s_ease-in-out_infinite]"
          />
        </div>

        {/* Form Content */}
        <div className="p-10">
          <h2 className="text-4xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 animate-text-gradient">
            Welcome Back
          </h2>
          
          <form className="space-y-7">
            <div className="relative group">
              <label className="block text-gray-600 text-sm font-medium mb-2 transition-colors group-hover:text-indigo-600" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className="w-full px-5 py-4 rounded-xl bg-gray-50/50 border border-gray-200/50 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200/50 transition-all duration-300 peer text-gray-700 placeholder-gray-400 shadow-sm"
                  placeholder="Enter your email"
                />
                <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 transition-colors peer-focus:text-indigo-500">
                  @
                </span>
              </div>
            </div>

            <div className="relative group">
              <label className="block text-gray-600 text-sm font-medium mb-2 transition-colors group-hover:text-indigo-600" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="w-full px-5 py-4 rounded-xl bg-gray-50/50 border border-gray-200/50 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200/50 transition-all duration-300 text-gray-700 placeholder-gray-400 shadow-sm pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-indigo-600 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300/50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-indigo-500/20"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <a
                href="/auth/signup"
                className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-indigo-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                Create Account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;