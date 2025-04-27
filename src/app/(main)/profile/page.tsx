'use client'
import React from 'react';
import { useSelector } from 'react-redux';
import { Mail, Clock, DollarSign, Bookmark, BadgeCheck } from 'lucide-react';

function Profile() {
  const { user } = useSelector((state: RootState) => state.user);
  
  const defaultImage = "https://wallpapers.com/images/hd/raiden-shogun-chibi-0sqo5cbp1jtzfvf3.jpg";
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-8 px-4">
      <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
        <div className="h-40 bg-blue-100 dark:bg-blue-900 relative">
          <img 
            src={user?.coverImage || defaultImage} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 relative">
          <div className="absolute -top-16 left-6">
            <div className="h-32 w-32 rounded-full bg-gray-200 dark:bg-gray-700 border-4 border-white dark:border-gray-800 overflow-hidden">
              <img 
                src={user?.avatar || defaultImage} 
                alt={user?.fullName} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="mt-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">{user?.fullName}</h1>
              {user?.isVerified && (
                <span className="ml-2 text-blue-600 dark:text-blue-400">
                  <BadgeCheck size={20} />
                </span>
              )}
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mt-1">@{user?.userName}</p>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-center">
                <Mail size={20} className="text-blue-600 dark:text-blue-400" />
                <span className="ml-2">{user?.email}</span>
              </div>
              
              <div className="flex items-center">
                <Clock size={20} className="text-blue-600 dark:text-blue-400" />
                <span className="ml-2">
                  Joined on {formatDate(user?.createdAt)}
                </span>
              </div>
              
              <div className="flex items-center">
                <DollarSign size={20} className="text-blue-600 dark:text-blue-400" />
                <span className="ml-2">
                  Credits remaining: {user?.creaditsLeft}
                </span>
              </div>
              
              <div className="flex items-center">
                <Bookmark size={20} className="text-blue-600 dark:text-blue-400" />
                <span className="ml-2">
                  ID: {user?.id}
                </span>
              </div>
            </div>
            
            <div className="mt-8">
              <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-200">
                Edit Profile
              </button>
              <button className="ml-4 border border-red-600 text-red-600 dark:text-red-400 dark:border-red-400 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 font-medium py-2 px-4 rounded-md transition duration-200">
                Add Credits
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;