'use client'

import React from 'react';

const SubmitButton = ({ text }:{text:string}) => {

  return (
    <button
      type="submit"
      className={`w-full bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg`}
    >
      {text}
    </button>
  );
};

export default SubmitButton;