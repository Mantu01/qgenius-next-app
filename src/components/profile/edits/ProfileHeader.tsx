'use client'
import React from 'react'
import Image from 'next/image'
import { Image as ImageIcon, Pencil, User } from 'lucide-react'

interface ProfileHeaderProps {
  coverPreview: string | undefined;
  avatarPreview: string | undefined;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'avatar' | 'coverImage') => void;
  coverImageError?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  coverPreview, 
  avatarPreview, 
  handleFileChange, 
  coverImageError 
}) => {
  return (
    <>
      <div className="relative h-56 bg-gray-200 dark:bg-gray-700">
        {coverPreview ? (
          <>
            <Image 
              src={coverPreview} 
              alt="Cover image" 
              fill
              className="object-cover"
              priority
            />
            <label className="absolute top-4 right-4 cursor-pointer bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 p-2.5 rounded-full shadow-md transition-all flex items-center justify-center">
              <Pencil size={16} className="text-green-600 dark:text-green-500" />
              <input 
                type="file" 
                accept="image/jpeg,image/png,image/webp" 
                onChange={(e) => handleFileChange(e, 'coverImage')} 
                className="hidden" 
              />
            </label>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon size={48} className="text-gray-400 dark:text-gray-500" />
          </div>
        )}
        {coverImageError && (
          <div className="absolute bottom-4 left-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm py-1 px-3 rounded-md shadow">
            {coverImageError}
          </div>
        )}
      </div>

      <div className="relative mx-8 -mt-20">
        <div className="h-36 w-36 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-gray-300 dark:bg-gray-600 shadow-lg relative">
          {avatarPreview ? (
            <>
              <Image 
                src={avatarPreview} 
                alt="Profile avatar" 
                width={144}
                height={144}
                className="object-cover w-full h-full"
                priority
              />
              <label className="absolute bottom-2 right-2 cursor-pointer bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 p-2 rounded-full shadow-md transition-all flex items-center justify-center">
                <Pencil size={14} className="text-green-600 dark:text-green-500" />
                <input 
                  type="file" 
                  accept="image/jpeg,image/png,image/webp" 
                  onChange={(e) => handleFileChange(e, 'avatar')} 
                  className="hidden" 
                />
              </label>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User size={48} className="text-gray-500 dark:text-gray-400" />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ProfileHeader