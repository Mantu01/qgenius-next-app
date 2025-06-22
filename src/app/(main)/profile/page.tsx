'use client'
import React from 'react';
import { useSelector } from 'react-redux';
import { Mail, Clock, BadgeCheck, Gem, Shield, Timer } from 'lucide-react';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileButton from '@/components/profile/ProfilButton';
import ProfileInfoItem from '@/components/profile/ProfileInfoItem';

function Profile() {
  const { user } = useSelector((state: RootState) => state.user);
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 pt-12 pb-8 px-4">
      <div className="max-w-5xl mx-auto rounded-xl overflow-hidden shadow-xl bg-white dark:bg-gray-800">
        <ProfileHeader user={user}/>
        <div className="bg-white dark:bg-gray-800 p-6 pt-20 md:p-10 md:pt-20">
          <div className="mt-6 md:flex md:justify-between md:items-start">
            <div>
              <div className="flex items-center">
                <h1 className="text-3xl font-bold">{user?.fullName}</h1>
                {user?.isVerified ? (
                  <span className="ml-2 text-green-600 dark:text-green-400">
                    <BadgeCheck size={24} />
                  </span>
                ) : (
                  <span className="ml-2 text-gray-400 dark:text-gray-500">
                    <Shield size={24} />
                  </span>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-1 text-lg">@{user?.userName}</p>
            </div>
            <div className="flex gap-3 mt-6 md:mt-0">
              <ProfileButton primary url='/profile/settings/edit'>
                Edit Profile
              </ProfileButton>
              
              {user?.isVerified ? (
                <ProfileButton url='#'>
                  Add Credits
                </ProfileButton>
              ) : (
                <ProfileButton url='#'>
                  Verify Account
                </ProfileButton>
              )}
            </div>
          </div>
          
          {!user?.isVerified && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-700 dark:text-red-400 flex items-center">
                <Shield size={18} className="mr-2" />
                Your account is not verified. Please verify your account to access all features.
              </p>
            </div>
          )}
          
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-3 px-3">Account Information</h2>
            
            <div className="space-y-1">
              {
                [
                  {icon:Mail,text:user?.email},
                  {icon:Clock,text:`Joined on ${formatDate(user?.createdAt)}`},
                  {icon:Timer,text:`Last Updated on ${formatDate(user?.updatedAt)}`}
                ].map((item,idex)=>(
                  <ProfileInfoItem
                    icon={item.icon} 
                    text={item.text}
                  />
                ))}
            </div>
          </div>
          <div className="mt-8 hidden md:block">
            <h3 className="text-lg font-medium mb-4 px-2">Recent Activity</h3>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                Activity feed will appear here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;