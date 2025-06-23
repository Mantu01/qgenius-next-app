'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="text-center max-w-xl">
        <h1 className="text-9xl font-extrabold text-red-600 drop-shadow-lg">404</h1>
        <h2 className="text-4xl md:text-5xl font-semibold mt-4 text-gray-800 dark:text-white">
          Are sir, kahan jaa rhe ho? 🤔
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-4 text-base">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-white bg-red-600 hover:bg-red-700 transition rounded-md font-medium shadow-md"
          >
            <Home size={20} />
            Go Home
          </Link>

          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-6 py-3 text-white bg-green-600 hover:bg-green-700 transition rounded-md font-medium shadow-md"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>

        <div className="mt-16 flex justify-center">
          <Image 
            src="https://res.cloudinary.com/dqznmhhtv/image/upload/v1745812881/image__1_-removebg-preview_cq7xid.png"
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
