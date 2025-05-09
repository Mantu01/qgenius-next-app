"use client"

import React, { useState } from 'react'
import { NotebookText, Send, Plus, Trash2, Loader2 } from 'lucide-react';

const Note = () => {
  const [questions, setQuestions] = useState([''])
  const [answers, setAnswers] = useState<(string | null)[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentProcessingIndex, setCurrentProcessingIndex] = useState(0)

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions]
    newQuestions[index] = value
    setQuestions(newQuestions)
  }

  const addQuestionField = () => {
    if (questions.length < 10) {
      setQuestions([...questions, ''])
    }
  }

  const removeQuestionField = (index: number) => {
    if (questions.length > 1) {
      const newQuestions = [...questions]
      newQuestions.splice(index, 1)
      setQuestions(newQuestions)
      
      const newAnswers = [...answers]
      newAnswers.splice(index, 1)
      setAnswers(newAnswers)
    }
  }

  const processQuestions = () => {
    setIsProcessing(true)
    setCurrentProcessingIndex(0)
    setAnswers(questions.map(() => null))
    
    const mockProcessing = () => {
      if (currentProcessingIndex < questions.length) {
        setTimeout(() => {
          const newAnswers = [...answers]
          newAnswers[currentProcessingIndex] = 
            `This is a mock answer for question ${currentProcessingIndex + 1}. In a real application, this would be generated by your AI system based on the content: "${questions[currentProcessingIndex]}".`
          setAnswers(newAnswers)
          setCurrentProcessingIndex(currentProcessingIndex + 1)
          mockProcessing()
        }, 1000)
      } else {
        setIsProcessing(false)
      }
    }
    
    mockProcessing()
  }

  const allQuestionsEmpty = questions.every(q => q.trim() === '')
  const anyQuestionsFilled = questions.some(q => q.trim() !== '')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <div className="flex items-center mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2 text-green-600 dark:text-green-400">
            <NotebookText className="w-6 h-6" />
            Smart Notes AI
          </h1>
        </div>

        <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Ask your questions
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {questions.length}/10 questions
            </span>
          </div>

          <div className="space-y-4 mb-4">
            {questions.map((question, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => handleQuestionChange(index, e.target.value)}
                    placeholder={`Question ${index + 1}`}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  />
                  {questions.length > 1 && (
                    <button
                      onClick={() => removeQuestionField(index)}
                      className="absolute right-2 top-2 p-1 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={addQuestionField}
              disabled={questions.length >= 10}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg ${questions.length >= 10 ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30'} transition-colors`}
            >
              <Plus className="w-4 h-4" />
              Add Question
            </button>

            <button
              onClick={processQuestions}
              disabled={isProcessing || allQuestionsEmpty}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium ${isProcessing || allQuestionsEmpty ? 'bg-red-300 dark:bg-red-900/50 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'} text-white transition-colors shadow-md hover:shadow-lg`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Get Answers
                </>
              )}
            </button>
          </div>
        </div>

        {anyQuestionsFilled && (
          <div className="space-y-6">
            {questions.map((question, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">
                    Q{index + 1}: {question || <span className="text-gray-400">Empty question</span>}
                  </h3>
                </div>
                <div className="p-6">
                  {answers[index] ? (
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {answers[index]}
                    </p>
                  ) : (
                    <div className="flex items-center justify-center min-h-20">
                      {isProcessing && currentProcessingIndex === index ? (
                        <div className="flex items-center gap-2 text-gray-500">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Generating answer...</span>
                        </div>
                      ) : (
                        <p className="text-gray-400 italic">Answer will appear here</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Note