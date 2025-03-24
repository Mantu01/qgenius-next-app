'use client'

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {register,handleSubmit,formState}=useForm();

  const handleSignup =async(data)=>{
    console.log(formState)
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-200 via-purple-100 to-pink-50 flex items-center justify-center p-6">
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_rgba(31,38,135,0.2)] w-2/3 overflow-hidden transform hover:scale-[1.03] transition-all duration-500 ease-out border border-gray-100/50">
        <div className="p-8 flex justify-center bg-gradient-to-br from-indigo-600 to-purple-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent)] animate-pulse-slow"></div>
          <img 
            src="https://res.cloudinary.com/dqznmhhtv/image/upload/v1740554497/image-removebg-preview_nerxe2.png" 
            alt="QGeninus Logo" 
            className="h-20 w-auto relative z-10 animate-[float_3s_ease-in-out_infinite]"
          />
        </div>
        <div className="p-10">
          <h2 className="text-4xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 animate-text-gradient">
            Join QGeninus
          </h2>
          
          <form onSubmit={handleSubmit(handleSignup)} className="space-y-7">
          <div className="relative group">
              <label className="block text-gray-600 text-sm font-medium mb-2 transition-colors group-hover:text-indigo-600" htmlFor="username">
                Full Name
              </label>
              <input
                {...register('name',{required:'required',})}
                type="text"
                id="name"
                className="w-full px-5 py-4 rounded-xl bg-gray-50/50 border border-gray-200/50 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200/50 transition-all duration-300 text-gray-700 placeholder-gray-400 shadow-sm"
                placeholder="Enter Your Name"
              />
            </div>
            <div className="relative group">
              <label className="block text-gray-600 text-sm font-medium mb-2 transition-colors group-hover:text-indigo-600" htmlFor="username">
                Username
              </label>
              <input
                {...register('username')}
                type="text"
                id="username"
                className="w-full px-5 py-4 rounded-xl bg-gray-50/50 border border-gray-200/50 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200/50 transition-all duration-300 text-gray-700 placeholder-gray-400 shadow-sm"
                placeholder="Choose a username"
              />
            </div>

            <div className="relative group">
              <label className="block text-gray-600 text-sm font-medium mb-2 transition-colors group-hover:text-indigo-600" htmlFor="email">
                Email Address
              </label>
              <input
                {...register('email',{
                  required: 'Email is required',
                  pattern: {
                    value: /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/,
                    message: 'Please enter a valid email address'
                  }
                })}
                type="email"
                id="email"
                className="w-full px-5 py-4 rounded-xl bg-gray-50/50 border border-gray-200/50 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200/50 transition-all duration-300 peer text-gray-700 placeholder-gray-400 shadow-sm"
                placeholder="Enter your email"
              />
            </div>
            <div className="relative group">
              <label className="block text-gray-600 text-sm font-medium mb-2 transition-colors group-hover:text-indigo-600" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="w-full px-5 py-4 rounded-xl bg-gray-50/50 border border-gray-200/50 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200/50 transition-all duration-300 text-gray-700 placeholder-gray-400 shadow-sm pr-12"
                  placeholder="Create a password"
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
              onClick={()=>console.log(formState.errors.name)}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300/50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-indigo-500/20"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-indigo-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;