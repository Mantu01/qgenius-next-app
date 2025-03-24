'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-red-500 animate-bounce">404</h1>
        <h2 className="text-6xl font-bold text-gray-900 mt-4">Are sir, kahan jaa rhe ho? 🤔</h2>
        <p className="text-xl text-gray-600 mt-6 max-w-md mx-auto">
          Lagta hai aapne galat mod le liya! Koi na, wapas ghar chalte hain. 🏡
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
          >
            Wapas ghar chalo 🚀
          </Link>
        </div>
        <div className="mt-16 flex flex-col items-center">
          <Image 
            src="https://res.cloudinary.com/dqznmhhtv/image/upload/v1740554497/image-removebg-preview_nerxe2.png"
            alt="QGenius Logo"
            width={100}
            height={100}
            className="opacity-80"
          />
        </div>
      </div>
    </div>
  );
}
