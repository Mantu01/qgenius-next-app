'use client'
import React from 'react'
import Link from 'next/link'
import { 
  User, 
  Mail, 
  Calendar, 
  Save, 
  Shield,
  Gem,
} from 'lucide-react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import AccountInfoSection from './AccountSection'
import PlanVerificationSection from './PlanVerification'
import { useRouter } from 'next/navigation'

interface ProfileFormProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  user: User | null;
  formatDate: (date: string) => string;
  isSubmitting: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  register,
  errors,
  user,
  formatDate,
  isSubmitting,
}) => {
  const router=useRouter();
  return (
    <div className="p-8 pt-12">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Full Name</label>
          <div className="relative">
            <User size={18} className="absolute top-3 left-3 text-green-600 dark:text-green-500" />
            <input
              type="text"
              placeholder="Enter your full name"
              className={`pl-10 w-full border ${errors.fullName ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-600'} rounded-lg p-2.5 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors`}
              {...register('fullName', { required: 'Full name is required' })}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.fullName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Username</label>
          <div className="relative">
            <span className="absolute top-3 left-3 text-green-600 dark:text-green-500">@</span>
            <input
              type="text"
              placeholder="Choose a unique username"
              className={`pl-10 w-full border ${errors.userName ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-600'} rounded-lg p-2.5 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors`}
              {...register('userName', { 
                required: 'Username is required',
                validate: (value) => !value.includes(' ') || 'Username cannot contain spaces'
              })}
            />
            {errors.userName && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.userName.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-6 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AccountInfoSection user={user} formatDate={formatDate} />
            <PlanVerificationSection user={user} />
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white rounded-lg flex items-center transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <Save size={16} className="mr-2" />
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default ProfileForm