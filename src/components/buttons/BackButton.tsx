import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const BackButton = () => {
  const router=useRouter();
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-1">
        <button 
          onClick={() => router.back()} 
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Back</h1>
      </div>
    </div>
  )
}

export default BackButton