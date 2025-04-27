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
    },
    {
      id: 4,
      question: 'What are hooks in React?',
      answer: 'Hooks are functions that let you use state and other React features without writing a class. They allow you to manage state, side effects, context, refs, and more in functional components. Common hooks include useState, useEffect, and useContext.',
      difficulty: 'easy',
      timestamp: Date.now() - 7200000 // 2 hours ago
    },
    {
      id: 5,
      question: 'What is the purpose of useEffect?',
      answer: 'useEffect is a hook that lets you perform side effects in function components. It runs after the render phase and can be used for data fetching, subscriptions, or manually changing the DOM. You can control when it runs by passing a dependency array as the second argument.',
      difficulty: 'medium',
      timestamp: Date.now() - 1800000 // 30 minutes ago
    },
    {
      id: 6,
      question: 'Explain the concept of lifting state up in React',
      answer: 'Lifting state up is a pattern in React where you move the state from a child component to a common ancestor component. This allows multiple components to share the same state and communicate with each other. It helps to keep your components in sync and manage shared data more effectively.',
      difficulty: 'medium',
      timestamp: Date.now() - 600000 // 10 minutes ago
    },
    {
      id: 7,
      question: 'What is the purpose of keys in React lists?',
      answer: 'Keys are unique identifiers for elements in a list. They help React identify which items have changed, been added, or removed. Using keys improves performance by allowing React to optimize re-renders and minimize DOM manipulations. Keys should be stable, predictable, and unique among siblings.',
      difficulty: 'easy',
      timestamp: Date.now() - 300000 // 5 minutes ago
    },
    {
      id: 8,
      question: 'What is the difference between controlled and uncontrolled components?',
      answer: 'Controlled components are React components that derive their value from state and notify changes via callbacks. Uncontrolled components manage their own state internally, and you can access their values using refs. Controlled components provide better control and validation, while uncontrolled components are simpler to implement.',
      difficulty: 'medium',
      timestamp: Date.now() - 120000 // 2 minutes ago
    },
    {
      id: 9,
      question: 'How do you handle forms in React?',
      answer: 'You can handle forms in React using controlled or uncontrolled components. For controlled components, you manage the form state using useState and handle changes with event handlers. For uncontrolled components, you can use refs to access form values directly. You can also use libraries like Formik or React Hook Form for more complex form handling.',
      difficulty: 'easy',
      timestamp: Date.now() - 60000 // 1 minute ago
    },
    {
      id: 10,
      question: 'What is the purpose of the useMemo hook?',
      answer: 'The useMemo hook is used to memoize expensive calculations in React components. It returns a memoized value that only updates when its dependencies change. This helps to optimize performance by preventing unnecessary recalculations on every render.',
      difficulty: 'medium',
      timestamp: Date.now() - 30000 // 30 seconds ago
    },
    {
      id: 11,
      question: 'What is the purpose of the useCallback hook?',
      answer: 'The useCallback hook is used to memoize callback functions in React components. It returns a memoized version of the callback that only changes if its dependencies change. This helps to optimize performance by preventing unnecessary re-creations of functions on every render.',
      difficulty: 'medium',
      timestamp: Date.now() - 15000 // 15 seconds ago
    },
    {
      id: 12,
      question: 'What is context API in React?',
      answer: 'The Context API is a way to manage global state in React applications. It allows you to create a context object that can be shared across components without passing props down manually at every level. This makes it easier to manage and consume global data, such as themes or user authentication status.',
      difficulty: 'medium',
      timestamp: Date.now() - 5000 // 5 seconds ago
    },
    {
      id: 13,
      question: 'What is the purpose of the useRef hook?',
      answer: 'The useRef hook is used to create a mutable ref object that persists for the full lifetime of the component. It can be used to access DOM elements, store mutable values, or keep track of previous state without causing re-renders.',
      difficulty: 'medium',
      timestamp: Date.now() - 2000 // 2 seconds ago
    },
    {
      id: 14,
      question: 'What are higher-order components (HOCs) in React?',
      answer: 'Higher-order components (HOCs) are functions that take a component and return a new component with additional props or functionality. They are used for code reuse and can help with cross-cutting concerns like logging, authentication, or data fetching.',
      difficulty: 'hard',
      timestamp: Date.now() - 1000 // 1 second ago
    },
    {
      id: 15,
      question: 'What is the purpose of the useLayoutEffect hook?',
      answer: 'The useLayoutEffect hook is similar to useEffect but runs synchronously after all DOM mutations. It is used for reading layout from the DOM and synchronously re-rendering. It can be useful for measuring DOM elements or applying styles before the browser paints.',
      difficulty: 'hard',
      timestamp: Date.now() - 500 // 0.5 seconds ago
    },
     
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