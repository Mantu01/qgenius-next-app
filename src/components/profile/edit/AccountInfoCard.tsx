'use client'

import { Calendar, Mail } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface AccountInfoCardProps {
  email: string
  createdAt: string
}

export const AccountInfoCard: React.FC<AccountInfoCardProps> = ({ email, createdAt }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Account Information</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium mb-1.5 text-gray-500 dark:text-gray-400">Email Address</label>
          <div className="relative">
            <Mail size={16} className="absolute top-3 left-3 text-green-600 dark:text-green-500" />
            <div className="pl-9 w-full border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 flex justify-between items-center text-sm">
              <span className="truncate">{email || 'example@email.com'}</span>
              <Link href="/settings/email" className="text-green-600 dark:text-green-400 hover:underline text-xs font-medium ml-2">
                Change
              </Link>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium mb-1.5 text-gray-500 dark:text-gray-400">Member Since</label>
          <div className="relative">
            <Calendar size={16} className="absolute top-3 left-3 text-green-600 dark:text-green-500" />
            <div className="pl-9 w-full border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm">
              {formatDate(createdAt) || 'N/A'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}