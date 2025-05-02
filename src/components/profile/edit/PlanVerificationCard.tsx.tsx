'use client'

import { Gem, Shield } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface PlanVerificationCardProps {
  creditsLeft: number
  isVerified: boolean
}

export const PlanVerificationCard: React.FC<PlanVerificationCardProps> = ({creditsLeft, isVerified }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Plan & Verification</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium mb-1.5 text-gray-500 dark:text-gray-400">Credits Available</label>
          <div className="relative">
            <Gem size={16} className="absolute top-3 left-3 text-green-600 dark:text-green-500" />
            <div className="pl-9 w-full border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 flex justify-between items-center text-sm">
              <span>{creditsLeft || 0} credits remaining</span>
              <Link href="/pricing" className="text-green-600 dark:text-green-400 hover:underline text-xs font-medium ml-2">
                Upgrade
              </Link>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium mb-1.5 text-gray-500 dark:text-gray-400">Account Status</label>
          <div className="relative">
            <Shield size={16} className="absolute top-3 left-3 text-green-600 dark:text-green-500" />
            <div className="pl-9 w-full border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 flex justify-between items-center text-sm">
              <div className="flex items-center">
                {isVerified ? (
                  <>
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    <span>Verified Account</span>
                  </>
                ) : (
                  <>
                    <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                    <span>Pending Verification</span>
                  </>
                )}
              </div>
              {!isVerified && (
                <Link href="/verify" className="text-green-600 dark:text-green-400 hover:underline text-xs font-medium ml-2">
                  Verify
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}