'use client';

import React from 'react';

type Difficulty = 'easy' | 'medium' | 'hard';

interface ChatEntry {
  question: string;
  answer: string;
  difficulty: Difficulty;
  id: number;
  timestamp: number;
}

export default function ChatHistoryPage() {
  // In a real app, this would come from your database or state management
  const chatHistory: ChatEntry[] = [
    {
      id: 1,
      question: 'What is React?',
      answer: 'React is a JavaScript library for building user interfaces. It lets you create reusable UI components and efficiently update the DOM when your data changes.',
      difficulty: 'easy',
      timestamp: Date.now() - 86400000 // 1 day ago
    },
    {
      id: 2,
      question: 'Explain the virtual DOM in React',
      answer: 'The virtual DOM is a lightweight copy of the actual DOM that React maintains. When state changes occur, React first updates the virtual DOM, then compares it with the previous version (diffing algorithm), and finally updates only the changed parts in the real DOM (reconciliation). This makes updates more efficient than directly manipulating the DOM.',
      difficulty: 'medium',
      timestamp: Date.now() - 43200000 // 12 hours ago
    },
    {
      id: 3,
      question: 'How does React Fiber improve rendering?',
      answer: 'React Fiber is a complete rewrite of React\'s core algorithm. It enables:\n\n1. Incremental rendering: splitting rendering work into chunks\n2. Better prioritization of updates\n3. Support for features like suspense and concurrent mode\n4. The ability to pause, abort, or reuse work as needed\n\nFiber makes React more flexible and capable of handling complex animations and gestures while keeping the app responsive.',
      difficulty: 'hard',
      timestamp: Date.now() - 3600000 // 1 hour ago
    }
  ];

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            Chat History
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Review all your previous questions and answers
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {chatHistory.length} Conversation{chatHistory.length !== 1 ? 's' : ''}
              </h2>
              <div className="flex space-x-2">
                <span className="px-2 py-1 text-xs rounded-md bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Easy: {chatHistory.filter(q => q.difficulty === 'easy').length}
                </span>
                <span className="px-2 py-1 text-xs rounded-md bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  Medium: {chatHistory.filter(q => q.difficulty === 'medium').length}
                </span>
                <span className="px-2 py-1 text-xs rounded-md bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                  Hard: {chatHistory.filter(q => q.difficulty === 'hard').length}
                </span>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {chatHistory.map((entry) => (
              <div key={entry.id} className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mr-3">
                      {entry.question}
                    </h3>
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(entry.difficulty)}`}>
                      {entry.difficulty}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(entry.timestamp)}
                  </span>
                </div>
                
                <div className="prose dark:prose-invert max-w-none mt-3">
                  {entry.answer.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-gray-700 dark:text-gray-300 mb-3">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}