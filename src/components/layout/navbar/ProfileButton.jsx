import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfileButton({ isAuthenticated }) {
  const router = useRouter();
  
  const handleProfileClick = () => {
    router.push('/account');
  };
  
  if (!isAuthenticated) return null;
  
  return (
    <button
      onClick={handleProfileClick}
      className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
      aria-label="Profile"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
        />
      </svg>
    </button>
  );
}