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
          className="pl-10 w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
          placeholder={placeholder}
        />
        {togglePassword && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
          >
            {toggleIcon}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;