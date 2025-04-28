'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const footerLinks = [
  {
    title: 'Product',
    links: [
      { name: 'Features', href: '/features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Chat', href: '/chat' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '/about' },
      { name: 'Privacy', href: '/privacy' },
      { name: 'Terms', href: '/terms' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { name: 'Twitter', href: 'https://x.com/Mantu_kumar91' },
      { name: 'GitHub', href: 'https://github.com/Mantu01/qgenius-next-app' },
      { name: 'LinkedIn', href: 'https://www.linkedin.com/in/mantu-kumar-2b5912238/' },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();
  const isHidden = ["/login", "/signup"].includes(pathname) || pathname.startsWith('/chat') || pathname.startsWith('/note') || pathname.startsWith('/profile');

  if (isHidden) return null; // better to not even render the footer instead of "hidden"

  return (
    <footer className="bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-gray-700 transition-colors duration-300 block">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <Image 
                src="https://res.cloudinary.com/dqznmhhtv/image/upload/v1745812881/image__1_-removebg-preview_cq7xid.png"
                alt="QGenius Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Your intelligent assistant for all things
            </p>
          </div>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      target='_blank'
                      href={link.href} 
                      className="text-base text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            &copy; {new Date().getFullYear()} QGenius. No rights reserved, You can do whatever you want.
          </p>
        </div>
      </div>
    </footer>
  );
}
