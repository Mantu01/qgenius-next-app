'use client'

import InputField from '@/components/auth/InputField';
import BackButton from '@/components/buttons/BackButton';
import axios from 'axios';
import { Eye, EyeOff, KeyRound, ShieldAlert } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface ResetPasswordData {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const { register, handleSubmit, watch, setError, formState: { errors, isSubmitting } } = useForm<ResetPasswordData>();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleCurrentPassword = () => setShowCurrentPassword(prev => !prev);
  const toggleNewPassword = () => setShowNewPassword(prev => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword(prev => !prev);

  const onSubmit = async (data: ResetPasswordData) => {
    try {
      if (data.newPassword !== data.confirmPassword) {
        setError('confirmPassword', {
          type: 'manual',
          message: 'Passwords do not match'
        });
        return;
      }
      await axios.put('/api/auth/resetpassword',{...data,type:'password'});
      toast.success('Password updated successfully')
    } catch (error) {
      setError('root', {
        type: 'manual',
        //@ts-expect-error: unknown
        message: error.response.data.message || 'Something went wrong'
      });
    }
  };

  const passwordFields = [
    {
      id: 'password',
      register: register('password', {
        required: 'Current password is required',
      }),
      type: showCurrentPassword ? 'text' : 'password',
      label: 'Current Password',
      icon: <KeyRound className="h-5 w-5 text-gray-400 dark:text-gray-500" />,
      placeholder: 'Enter your current password',
      required: true,
      togglePassword: toggleCurrentPassword,
      toggleIcon: showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />
    },
    {
      id: 'newPassword',
      register: register('newPassword', {
        required: 'New password is required',
        minLength: {
          value: 8,
          message: 'Password must be at least 8 characters',
        },
        validate: (value) => {
          if (value === watch('password')) {
            return 'New password must be different from current password';
          }
          return true;
        }
      }),
      type: showNewPassword ? 'text' : 'password',
      label: 'New Password',
      icon: <KeyRound className="h-5 w-5 text-gray-400 dark:text-gray-500" />,
      placeholder: 'Enter your new password',
      required: true,
      togglePassword: toggleNewPassword,
      toggleIcon: showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />
    },
    {
      id: 'confirmPassword',
      register: register('confirmPassword', {
        required: 'Please confirm your new password',
        validate: (value) => value === watch('newPassword') || 'Passwords do not match'
      }),
      type: showConfirmPassword ? 'text' : 'password',
      label: 'Confirm New Password',
      icon: <KeyRound className="h-5 w-5 text-gray-400 dark:text-gray-500" />,
      placeholder: 'Confirm your new password',
      required: true,
      togglePassword: toggleConfirmPassword,
      toggleIcon: showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 pt-5 pb-8 px-4">
      <BackButton/>
      <div className="max-w-xl mx-auto">
        <div className="mt-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Reset Your Password</h1>
            <p className="text-gray-500 dark:text-gray-400">Enter your current password and set a new one</p>
          </div>
          {errors.root && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 flex items-start gap-3">
              <ShieldAlert className="h-5 w-5 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-red-700 dark:text-red-300">{errors.root?.message}</p>
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              {passwordFields.map((field) => (
                <div key={field.id}>
                  <InputField {...field} />
                  {errors[field.id as keyof ResetPasswordData]?.message && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                      {errors[field.id as keyof ResetPasswordData]?.message}
                    </p>
                  )}
                </div>
              ))}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : 'Reset Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword