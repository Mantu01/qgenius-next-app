'use client'
import React from 'react'
import { X } from 'lucide-react'

interface FormAlertProps {
  errorMessage: string;
  onClear: () => void;
}

const FormAlert: React.FC<FormAlertProps> = ({ errorMessage, onClear }) => {
  return (
    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 flex justify-between items-center">
      <span>{errorMessage}</span>
      <button onClick={onClear} className="p-1">
        <X size={16} />
      </button>
    </div>
  )
}

export default FormAlert