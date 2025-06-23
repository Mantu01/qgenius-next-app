'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Mail, KeyRound } from 'lucide-react';
import Link from 'next/link';
import SocialLogin from '@/components/auth/SocialLogin';
import InputField from '@/components/auth/InputField';
import SubmitButton from '@/components/auth/SubmitButton';
import AuthLink from '@/components/auth/AuthLink';
import AuthLayout from '@/components/auth/AuthLayout ';
import {useForm} from 'react-hook-form'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { setUser } from '@/app/store/userSlice';
import { useDispatch } from 'react-redux';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch=useDispatch();
  const router=useRouter();

  const togglePassword = () => setShowPassword(prev => !prev);

  const {register,handleSubmit}=useForm<LoginData>();

  const loginFields:InputFieldProps[] = [
    {
      id: 'email',
      register: {...register('email',{
        required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Please enter a valid email address',
          },
      })},
      type: 'email',
      label: 'Email Address',
      icon: <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />,
      placeholder: 'Enter Your Email',
      required: true,
    },
    {
      id: 'password',
      register:{...register('password',{
        required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
      })},
      type: showPassword ? 'text' : 'password',
      label: 'Password',
      icon: <KeyRound className="h-5 w-5 text-gray-400 dark:text-gray-500" />,
      placeholder: 'Enter your password',
      required: true,
      togglePassword,
      toggleIcon: showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />
    }
  ];

  const handleLogin=async(InputData:LoginData)=>{
    try {
      await axios.post('/api/auth/login',InputData);
      dispatch(setUser(null));
      router.push('/');
    } catch (error) {
      //@ts-expect-error: Unknown
      toast.error(error.response.data.message || 'Something went wrong')
    }
  }

  return (
    <AuthLayout>
      <div className="p-8 md:p-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Sign In to Your Account
        </h2>

        <SocialLogin />

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
          {loginFields.map((field) => (
            <div key={field.id}>
              <InputField {...field} />

              {field.id === 'password' && (
                <div className="text-right mt-2">
                  <Link href="/forgot-password">
                    <span className="text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 hover:underline transition-colors duration-200">
                      Forgot password?
                    </span>
                  </Link>
                </div>
              )}
            </div>
          ))}

          <SubmitButton text="Sign In" />
        </form>

        <AuthLink 
          text="Don't have an account?"
          linkText="Create Account"
          href="/signup"
        />
      </div>
    </AuthLayout>
  );
};

export default LoginPage;