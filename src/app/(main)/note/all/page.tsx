'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'

interface Note {
  id: string
  topic: string
  userId: string
  createdAt: string
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function Page() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('/api/note')
        setNotes(response.data.Notes)
      } catch (err) {
        setError('Failed to fetch notes. Please try again later.')
        console.error('Error fetching notes:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="animate-pulse text-black dark:text-white">
          Loading notes...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-red-600 dark:text-red-400">
          {error}
          <button 
            onClick={() => window.location.reload()}
            className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black p-6">
      <h1 className="text-3xl font-bold mb-8 text-black dark:text-white">
        My Notes
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <Link 
            key={note.id} 
            href={`/note/n/${note.id}`}
            className="block border border-gray-300 dark:border-gray-700 rounded-lg p-6 
                      hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200
                      hover:border-green-500 dark:hover:border-green-500"
          >
            <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
              {note.topic}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Created: {formatDate(note.createdAt)}
            </p>
            <div className="flex justify-end">
              <span className="text-xs px-2 py-1 rounded-full bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
                {note.topic === 'Data Structure and Algorithms' ? 'DSA' : note.topic}
              </span>
            </div>
          </Link>
        ))}
      </div>
      
      {notes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            No notes found. Create your first note!
          </p>
          <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Create Note
          </button>
        </div>
      )}
    </div>
  )
}

export default Page