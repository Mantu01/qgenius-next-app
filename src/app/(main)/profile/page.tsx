'use client'
import React from 'react';
import { useSelector } from 'react-redux';
import { Mail, Clock, BadgeCheck, Gem } from 'lucide-react';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileButton from '@/components/profile/ProfilButton';
import ProfileInfoItem from '@/components/profile/ProfileInfoItem';

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
      <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl bg-white dark:bg-gray-800">
        <ProfileHeader user={user} defaultImage={defaultImage} />
        <div className="bg-white dark:bg-gray-800 p-6 pt-20 md:p-10 md:pt-20">
          <div className="mt-6 md:flex md:justify-between md:items-start">
            <div>
              <div className="flex items-center">
                <h1 className="text-3xl font-bold">{user?.fullName}</h1>
                {user?.isVerified && (
                  <span className="ml-2 text-blue-600 dark:text-blue-400">
                    <BadgeCheck size={24} />
                  </span>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-1 text-lg">@{user?.userName}</p>
            </div>
            <div className="flex gap-3 mt-6 md:mt-0">
              <ProfileButton primary>Edit Profile</ProfileButton>
              <ProfileButton>Add Credits</ProfileButton>
            </div>
          </div>
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-3 px-3">Account Information</h2>
            
            <div className="space-y-1">
              <ProfileInfoItem
                icon={Mail} 
                text={user?.email} 
              />
              <ProfileInfoItem 
                icon={Gem} 
                text={`Credits remaining: ${user?.creaditsLeft}`} 
              />
              <ProfileInfoItem 
                icon={Clock} 
                text={`Joined on ${formatDate(user?.createdAt)}`} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;