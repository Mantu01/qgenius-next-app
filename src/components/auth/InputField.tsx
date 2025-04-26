'use client'

import React from 'react';

const InputField: React.FC<InputFieldProps> = ({ 
  id, 
  register, 
  type, 
  label, 
  icon, 
  placeholder, 
  required = false,
  togglePassword,
  toggleIcon
}) => {
  return (
    <div>
      <label 
        htmlFor={id} 
        className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </span>
        <input
          type={type}
          id={id}
          {...register}
          required={required}
          className="w-full pl-10 pr-12 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 dark:focus:border-blue-400 dark:focus:ring-blue-400/30 transition duration-200 ease-in-out text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          placeholder={placeholder}
        />
        {togglePassword && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            {toggleIcon}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;