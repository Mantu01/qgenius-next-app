import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NavLogo() {
  return (
    <div className="flex items-center">
      <Link href="/" className="flex-shrink-0 flex items-center">
        <Image
          src="https://res.cloudinary.com/dqznmhhtv/image/upload/v1740554497/image-removebg-preview_nerxe2.png"
          alt="QGenius Logo"
          width={60}
          height={60}
          className="h-12 w-auto"
        />
      </Link>
    </div>
  );
}