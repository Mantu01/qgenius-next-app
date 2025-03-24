import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <Image 
                src="https://res.cloudinary.com/dqznmhhtv/image/upload/v1740554497/image-removebg-preview_nerxe2.png"
                alt="QGenius Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-blue-600">QGenius</span>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Your intelligent assistant for all things quantum computing
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Product</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/features" className="text-base text-gray-600 hover:text-blue-600">Features</Link></li>
              <li><Link href="/pricing" className="text-base text-gray-600 hover:text-blue-600">Pricing</Link></li>
              <li><Link href="/chat" className="text-base text-gray-600 hover:text-blue-600">Chat</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" className="text-base text-gray-600 hover:text-blue-600">About</Link></li>
              <li><Link href="/privacy" className="text-base text-gray-600 hover:text-blue-600">Privacy</Link></li>
              <li><Link href="/terms" className="text-base text-gray-600 hover:text-blue-600">Terms</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Connect</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-base text-gray-600 hover:text-blue-600">Twitter</Link></li>
              <li><Link href="#" className="text-base text-gray-600 hover:text-blue-600">GitHub</Link></li>
              <li><Link href="#" className="text-base text-gray-600 hover:text-blue-600">LinkedIn</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            &copy; {currentYear} QGenius. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 