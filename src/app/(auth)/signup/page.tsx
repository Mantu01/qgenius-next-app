'use client'

import React, { useState } from 'react';
import { Eye, EyeOff, Mail, KeyRound, User, AtSign } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout ';
import SocialLogin from '@/components/auth/SocialLogin';
import InputField from '@/components/auth/InputField';
import SubmitButton from '@/components/auth/SubmitButton';
import AuthLink from '@/components/auth/AuthLink';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  
  const togglePassword = () => setShowPassword(prev => !prev);

  const {register,handleSubmit}=useForm<SignupData>();
  
  const signupFields:InputFieldProps[] = [
    {
      id: "name",
      register:{...register('fullName',{
        minLength:{
          value:3,
          message:"Name must be of atleast 3 characters"
        }
      })},
      type: "text",
      label: "Full Name",
      icon: <User className="h-5 w-5 text-gray-400 dark:text-gray-500" />,
      placeholder: "Enter Your Name",
      required: true,
    },
    {
      id:'username',
      register:{...register('userName')},
      type:'text',
      label:'Username',
      placeholder:'Enter Username',
      required:true,
      icon:<AtSign className="h-5 w-5 text-gray-400 dark:text-gray-500" />,
    },
    {
      id: "email",
      register:{...register('email', {
        required: 'Email is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Please enter a valid email address',
        },
      })},
      type: "email",
      label: "Email Address",
      icon: <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />,
      placeholder: "Enter Your Email",
      required: true,
    },
    {
      id: "password",
      register:{...register('password', {
        required: 'Password is required',
        minLength: {
          value: 8,
          message: 'Password must be at least 8 characters',
        },
      })},
      type: showPassword ? 'text' : 'password',
      label: "Password",
      icon: <KeyRound className="h-5 w-5 text-gray-400 dark:text-gray-500" />,
      placeholder: "Create a strong password",
      required: true,
      togglePassword,
      toggleIcon: showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />
    }
  ];

  const handleSingup=async(InputData:SignupData)=>{
    try {
      const {data}=await axios.post('/api/auth/signup',InputData);
      toast.success(data.message);
      setIsSuccess(true);
    } catch (error) {
      //@ts-expect-error: unknown
      toast.error(error.response.data.message)
    }
  }

  if (isSuccess) {
    return (
      <AuthLayout>
        <div className="p-8 md:p-10 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Registration Successful!
          </h2>
          <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
            An email has been sent to your email address. Please verify your account and then login.
          </p>
          <button
            onClick={() => router.push('/login')}
            className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
          >
            Go to Login
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="p-8 md:p-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Create Your Account
        </h2>
        
        <SocialLogin />
        
        <form onSubmit={handleSubmit(handleSingup)} className="space-y-6">
          {signupFields.map((field) => (
            <div key={field.id}>
              <InputField {...field} />
            </div>
          ))}
          
          <SubmitButton text="Create Account" />
        </form>
        
        <AuthLink
          text="Already have an account?"
          linkText="Sign In"
          href="/login"
        />
      </div>
    </AuthLayout>
  );
};

export default SignupPage;