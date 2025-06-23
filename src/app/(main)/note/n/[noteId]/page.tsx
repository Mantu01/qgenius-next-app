'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux';
import { Loader2, Trash2, ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import MarkdownPreview from '@/components/others/MarkdonwPreview';
import { toast } from 'react-toastify';
import PDFGenerator from '@/components/others/PdfGenerator';

interface NoteContent {
  id: string;
  question: string;
  answer: string;
  level: string;
  noteId: string;
}

interface Note {
  id: string;
  topic: string;
  userId: string;
  contenets: NoteContent[];
  createdAt: Date
}

function Page() {
  const { noteId } = useParams();
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/note/${noteId}`);
        setNote(response.data);
      } catch (error) {
        console.error('Error fetching note:', error);
        toast.error('Failed to load note');
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [noteId, isAuthenticated, router]);

  const handleDeleteContent = async (contentId: string) => {
    try {
      setDeletingId(contentId);
      await axios.delete(`/api/note/${noteId}/content/${contentId}`);
      setNote(prev => ({
        ...prev!,
        contenets: prev!.contenets.filter(c => c.id !== contentId)
      }));
      toast.success('Question deleted successfully');
    } catch (error) {
      console.error('Error deleting content:', error);
      toast.error('Failed to delete question');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="flex flex-col items-center">
          <Loader2 className="w-8 h-8 animate-spin text-red-600 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading your note...</p>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Note not found
          </h2>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Go back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          
          {/* Use the new PDFGenerator component */}
          <PDFGenerator note={note} />
        </div>

        <div ref={contentRef} className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-800 transition-colors duration-300">
          <div className="mb-6">
            <h1 className="text-2xl text-center font-bold text-gray-800 dark:text-gray-100 mb-2">
              {note.topic}
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 justify-center">
              <span>{note.contenets.length} questions</span>
            </div>
          </div>

          <div className="space-y-6">
            {note.contenets.map((content, index) => (
              <div
                key={content.id}
                className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Q{index + 1}: {content.question}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      content.level === 'easy' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : content.level === 'medium'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {content.level.toUpperCase()}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteContent(content.id)}
                    disabled={deletingId === content.id}
                    className="p-1.5 text-gray-500 hover:text-red-600 dark:hover:text-red-500 transition-colors duration-200 rounded-full disabled:opacity-50 ml-4"
                    aria-label="Delete question"
                  >
                    {deletingId === content.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="prose dark:prose-invert max-w-none">
                  <MarkdownPreview markdown={content.answer} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;