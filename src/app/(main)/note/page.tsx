"use client"

import React, { useState } from 'react'
import { NotebookText, Send, Plus, Trash2, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import InputField from '@/components/auth/InputField';
import { useSelector } from 'react-redux';
import NotLoggedIn from '@/components/auth/notLoggedIn';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type FormData = {
  questions: {
    text: string;
    level: string;
  }[];
  topic: string;
};

const QuestionsPage = () => {
  const { register, handleSubmit, control, setValue, watch } = useForm<FormData>({
    defaultValues: {
      questions: [{ text: '', level: 'medium' }],
      topic: ''
    }
  });

  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const questions = watch('questions');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const addQuestionField = () => {
    if (questions.length < 15) {
      setValue('questions', [...questions, { text: '', level: 'medium' }]);
    }
  }

  const removeQuestionField = (index: number) => {
    if (questions.length > 1) {
      const newQuestions = [...questions];
      newQuestions.splice(index, 1);
      setValue('questions', newQuestions);
    }
  }

  const saveQuestions = async (data: FormData) => {
    if (!data.topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    const validQuestions = data.questions.filter(q => q.text.trim() !== '');
    if (validQuestions.length === 0) {
      setError('Please enter at least one question');
      return;
    }

    setError('');
    setIsProcessing(true);

    try {
      const payload = {
        questions: validQuestions.map(q => ({
          question: q.text,
          level: q.level
        })),
        topic: data.topic
      };

      const response = await axios.post('/api/note', payload);
      router.push(`/note/n/${response.data.noteId}`);
    } catch (err) {
      setError('Failed to create note. Please try again.');
      console.error('Error creating note:', err);
    } finally {
      setIsProcessing(false);
    }
  }

  const allQuestionsEmpty = questions.every(q => q.text.trim() === '');

  if (!isAuthenticated) {
    return <NotLoggedIn />
  }

  return (
    <div className="min-h-[91vh] bg-gray-50 dark:bg-gray-950 font-sans transition-colors duration-300">
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex flex-col items-center">
              <Loader2 className="w-8 h-8 animate-spin text-red-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Generating Your Study Notes
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                This may take a moment. Please don't close this page.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-800 transition-colors duration-300">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Create Study Notes
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Enter your topic and questions to generate comprehensive study notes
            </p>
          </div>

          <form onSubmit={handleSubmit(saveQuestions)} className="space-y-4">
            <div className="mb-4">
              <InputField
                label="topic"
                id="topic"
                register={register('topic', { required: true })}
                type="text"
                placeholder="Enter topic (e.g., Data Structure and Algorithms)"
                required
              />
            </div>

            <div className="space-y-3 mb-4">
              {questions.map((_, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 space-y-2">
                      <InputField
                        label={`question-${index}`}
                        id={`question-${index}`}
                        register={{
                          ...register(`questions.${index}.text` as const)
                        }}
                        type="text"
                        placeholder={`Question #${index + 1}`}
                      />
                      <div className="flex items-center gap-3">
                        <label className="text-sm text-gray-600 dark:text-gray-400">Difficulty:</label>
                        <div className="flex gap-2">
                          {['easy', 'medium', 'hard'].map((level) => (
                            <label key={level} className="flex items-center gap-1 text-sm">
                              <input
                                type="radio"
                                value={level}
                                {...register(`questions.${index}.level`)}
                                className="h-4 w-4 text-red-600 dark:text-red-500 focus:ring-red-500 dark:focus:ring-red-600 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                              />
                              <span className="capitalize">{level}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    {questions.length > 1 && !isProcessing && (
                      <button
                        type="button"
                        onClick={() => removeQuestionField(index)}
                        className="p-1.5 text-gray-500 hover:text-red-600 dark:hover:text-red-500 transition-colors duration-200 rounded-full"
                        aria-label="Remove question"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={addQuestionField}
                disabled={questions.length >= 15 || isProcessing}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700 dark:hover:text-green-500 transition-colors duration-200 rounded-lg bg-green-50 dark:bg-green-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
                Add Question
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                  ({questions.length}/15)
                </span>
              </button>

              {error && (
                <p className="text-sm text-red-600 dark:text-red-500">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isProcessing || allQuestionsEmpty}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm ${
                isProcessing || allQuestionsEmpty 
                  ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400' 
                  : 'bg-red-600 hover:bg-red-700 text-white dark:hover:bg-red-800'
              } transition-all duration-200 shadow hover:shadow-md`}
            >
              <NotebookText className="w-4 h-4" />
              Generate Study Notes
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default QuestionsPage