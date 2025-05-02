'use client'

import { Pencil } from 'lucide-react'
import React from 'react'

interface FileUploadButtonProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export const FileUploadButton: React.FC<FileUploadButtonProps> = ({onChange,className}) => {
  return (
    <label className={`cursor-pointer bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 p-2 rounded-full shadow-md transition-all flex items-center justify-center ${className}`}>
      <Pencil size={14} className="text-green-600 dark:text-red-500 font-bold" />
      <input 
        type="file" 
        accept="image/jpeg,image/png,image/webp" 
        onChange={onChange} 
        className="hidden" 
      />
    </label>
  )
}