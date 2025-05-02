'use client'

import InputField from '@/components/auth/InputField';
import BackButton from '@/components/buttons/BackButton';
import { Eye, EyeOff, KeyRound, Mail, ShieldAlert } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const ChangeEmail = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { register, handleSubmit,setError, formState: { errors, isSubmitting } } = useForm<LoginData>();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(prev => !prev);

  const onSubmit = async (data:any) => {
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setError('root',{
        type: 'manual',
        message:'Something went wrong'
      })
    } catch (error:any) {
      console.log(error)
    }
  };

  const loginFields = [
    {
      id: 'email',
      register: register('email', {
        required: 'Email is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Please enter a valid email address',
        },
      }),
      type: 'email',
      label: 'New Email Address',
      icon: <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />,
      placeholder: 'Enter your new email address',
      required: true,
    },
    {
      id: 'password',
      register: register('password', {
        required: 'Password is required',
        minLength: {
          value: 8,
          message: 'Password must be at least 8 characters',
        },
      }),
      type: showPassword ? 'text' : 'password',
      label: 'Current Password',
      icon: <KeyRound className="h-5 w-5 text-gray-400 dark:text-gray-500" />,
      placeholder: 'Enter your current password',
      required: true,
      togglePassword,
      toggleIcon: showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 pt-5 pb-8 px-4">
      <BackButton/>
      <div className="max-w-xl mx-auto">
        <div className="mt-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Update Your Email Address</h1>
          </div>
          {errors.root && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 flex items-start gap-3">
              <ShieldAlert className="h-5 w-5 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-red-700 dark:text-red-300">{errors.root?.message}</p>
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="mb-6 flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="text-green-600 dark:text-green-400 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">Important</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  After changing your email, you'll need to verify the new address. All account notifications will be sent to the new email.
                </p>
              </div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              {loginFields.map((field) => (
                <div key={field.id}>
                  <InputField {...field} />
                  {errors[field.id as keyof LoginData]?.message && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                      {errors.password?.message}
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
                  ) : 'Update Email'}
                </button>
              </div>
            </form>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mt-5 text-center">
          Changing your email will require verification for security purposes.
        </p>
      </div>
    </div>
  )
}

export default ChangeEmail