'use client';

import React, { useState } from 'react';
import { Heart, Trash2, Clock, User, Tag, SortDesc, Filter, ArrowLeft } from 'lucide-react';

type Difficulty = 'easy' | 'medium' | 'hard';

interface ChatEntry {
  question: string;
  answer: string;
  difficulty: Difficulty;
  id: number;
  timestamp: number;
  username: string;        // Added username field
  favoritedAt: number;     // Added when it was favorited
}

export default function FavoritesPage() {
  // In a real app, this would come from your database or state management
  const [favorites, setFavorites] = useState<ChatEntry[]>([
    {
      id: 1,
      question: 'What is React?',
      answer: 'React is a JavaScript library for building user interfaces. It lets you create reusable UI components and efficiently update the DOM when your data changes.',
      difficulty: 'easy',
      timestamp: Date.now() - 86400000, // 1 day ago
      username: 'sarah_dev',
      favoritedAt: Date.now() - 43200000 // 12 hours ago
    },
    {
      id: 7,
      question: 'What is the purpose of keys in React lists?',
      answer: 'Keys are unique identifiers for elements in a list. They help React identify which items have changed, been added, or removed. Using keys improves performance by allowing React to optimize re-renders and minimize DOM manipulations. Keys should be stable, predictable, and unique among siblings.',
      difficulty: 'easy',
      timestamp: Date.now() - 300000, // 5 minutes ago
      username: 'john_coder',
      favoritedAt: Date.now() - 120000 // 2 minutes ago
    },
    {
      id: 3,
      question: 'How does React Fiber improve rendering?',
      answer: 'React Fiber is a complete rewrite of React\'s core algorithm. It enables:\n\n1. Incremental rendering: splitting rendering work into chunks\n2. Better prioritization of updates\n3. Support for features like suspense and concurrent mode\n4. The ability to pause, abort, or reuse work as needed\n\nFiber makes React more flexible and capable of handling complex animations and gestures while keeping the app responsive.',
      difficulty: 'hard',
      timestamp: Date.now() - 3600000, // 1 hour ago
      username: 'alex_frontend',
      favoritedAt: Date.now() - 1800000 // 30 minutes ago
    },
    {
      id: 14,
      question: 'What are higher-order components (HOCs) in React?',
      answer: 'Higher-order components (HOCs) are functions that take a component and return a new component with additional props or functionality. They are used for code reuse and can help with cross-cutting concerns like logging, authentication, or data fetching.',
      difficulty: 'hard',
      timestamp: Date.now() - 1000, // 1 second ago
      username: 'maria_react',
      favoritedAt: Date.now() - 500 // 0.5 seconds ago
    },
    {
      id: 5,
      question: 'What is the purpose of useEffect?',
      answer: 'useEffect is a hook that lets you perform side effects in function components. It runs after the render phase and can be used for data fetching, subscriptions, or manually changing the DOM. You can control when it runs by passing a dependency array as the second argument.',
      difficulty: 'medium',
      timestamp: Date.now() - 1800000, // 30 minutes ago
      username: 'dev_master',
      favoritedAt: Date.now() - 900000 // 15 minutes ago
    },
  ]);

  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | 'all'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
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

  const handleRemoveFavorite = (id: number) => {
    setFavorites(favorites.filter(favorite => favorite.id !== id));
  };

  const filteredFavorites = favorites
    .filter(favorite => filterDifficulty === 'all' || favorite.difficulty === filterDifficulty)
    .sort((a, b) => sortOrder === 'newest'
      ? b.favoritedAt - a.favoritedAt
      : a.favoritedAt - b.favoritedAt
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <button 
              className="flex items-center text-green-600 dark:text-green-400 hover:underline"
              onClick={() => console.log('Go back to chat history')}
            >
              <ArrowLeft size={16} className="mr-1" />
              <span>Back to Chat History</span>
            </button>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2 flex justify-center items-center">
              <Heart size={24} className="text-red-500 mr-2 fill-red-500" />
              Favorite Conversations
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Your collection of most valuable questions and answers
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center">
                <Filter size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mr-4">
                  Filters
                </h2>
                <div className="flex space-x-2">
                  <button
                    className={`px-3 py-1 rounded-md text-sm transition ${filterDifficulty === 'all' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    onClick={() => setFilterDifficulty('all')}
                  >
                    All
                  </button>
                  <button
                    className={`px-3 py-1 rounded-md text-sm transition ${filterDifficulty === 'easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    onClick={() => setFilterDifficulty('easy')}
                  >
                    Easy
                  </button>
                  <button
                    className={`px-3 py-1 rounded-md text-sm transition ${filterDifficulty === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    onClick={() => setFilterDifficulty('medium')}
                  >
                    Medium
                  </button>
                  <button
                    className={`px-3 py-1 rounded-md text-sm transition ${filterDifficulty === 'hard' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    onClick={() => setFilterDifficulty('hard')}
                  >
                    Hard
                  </button>
                </div>
              </div>
              
              <div className="flex items-center">
                <SortDesc size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
                <span className="text-gray-600 dark:text-gray-400 mr-2">Sort:</span>
                <select
                  className="px-3 py-1 rounded-md text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {filteredFavorites.length} Favorite{filteredFavorites.length !== 1 ? 's' : ''}
              </h2>
              <div className="flex space-x-2">
                <span className="px-2 py-1 text-xs rounded-md bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Easy: {favorites.filter(q => q.difficulty === 'easy').length}
                </span>
                <span className="px-2 py-1 text-xs rounded-md bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  Medium: {favorites.filter(q => q.difficulty === 'medium').length}
                </span>
                <span className="px-2 py-1 text-xs rounded-md bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                  Hard: {favorites.filter(q => q.difficulty === 'hard').length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Favorite Items */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          {filteredFavorites.length === 0 ? (
            <div className="p-12 text-center">
              <Heart size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                No favorites found
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                {filterDifficulty !== 'all' 
                  ? `You don't have any ${filterDifficulty} difficulty favorites.` 
                  : "You haven't added any favorites yet."}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredFavorites.map((entry) => (
                <div key={entry.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center mb-1">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium mr-2 ${getDifficultyColor(entry.difficulty)}`}>
                          {entry.difficulty}
                        </span>
                        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                          {entry.question}
                        </h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <User size={14} className="mr-1" />
                          <span>{entry.username}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          <span>Asked: {formatDate(entry.timestamp)}</span>
                        </div>
                        <div className="flex items-center">
                          <Heart size={14} className="mr-1 text-red-500" />
                          <span>Favorited: {formatDate(entry.favoritedAt)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleRemoveFavorite(entry.id)}
                      className="p-2 rounded-full text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                      title="Remove from favorites"
                    >
                      <Trash2 size={18} />
                    </button>
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
          )}
        </div>
      </div>
    </div>
  );
}