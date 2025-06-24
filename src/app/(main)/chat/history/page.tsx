'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeChat } from '@/app/store/chatSlice';
import { 
  MessageSquare, 
  Plus, 
  RefreshCw, 
  Search, 
  ChevronRight, 
  AlertCircle,
  Clock,
  Calendar,
  RotateCw,
  Home,
  Loader2
} from 'lucide-react';

interface Chat {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  header: string;
}

interface ApiResponse {
  chats: Chat[];
}

export default function ChatHistoryPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    const filtered = chats.filter(chat =>
      chat.header.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredChats(filtered);
  }, [chats, searchTerm]);

  const fetchChats = async () => {
    try {
      setLoading(true);
      setIsRefreshing(true);
      setError(null);
      
      const response = await axios.get<ApiResponse>('/api/chat', {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const sortedChats = response.data.chats.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      
      setChats(sortedChats);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch chat history');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleChatClick = (chatId: string) => {
    dispatch(removeChat())
    setSelectedChat(chatId);
    router.push(`/chat/c/${chatId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getRelativeTime = (dateString: string) => {
    const now = new Date();
    const chatDate = new Date(dateString);
    const diffInMs = now.getTime() - chatDate.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInMs < 60000) {
      return 'Just now';
    } else if (diffInHours < 1) {
      const minutes = Math.floor(diffInMs / (1000 * 60));
      return `${minutes}m ago`;
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours);
      return `${hours}h ago`;
    } else if (diffInDays < 7) {
      const days = Math.floor(diffInDays);
      return `${days}d ago`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks}w ago`;
    } else {
      return formatDate(dateString);
    }
  };

  const truncateText = (text: string, maxLength: number = 60) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md w-full px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div className="animate-spin mx-auto mb-6 text-green-600 dark:text-green-400">
              <Loader2 className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Loading Conversations
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Fetching your chat history...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md w-full px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Unable to load conversations
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {error}
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={fetchChats}
                  className="inline-flex items-center px-5 py-2.5 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <RotateCw className="w-4 h-4 mr-2" />
                  Try Again
                </button>
                <button
                  onClick={() => router.push('/')}
                  className="inline-flex items-center px-5 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg transition-all duration-200"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Conversation History
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Review and manage your previous conversations
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  dispatch(removeChat());
                  router.push('/chat')
                }}
                className="inline-flex items-center px-5 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Chat
              </button>
              <button
                onClick={fetchChats}
                disabled={isRefreshing}
                className={`inline-flex items-center px-5 py-2.5 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md ${isRefreshing ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isRefreshing ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Refresh
              </button>
            </div>
          </div>

          {/* Search and Stats Bar */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="relative w-full md:w-auto flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm"
                />
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {filteredChats.length}
                  </span>
                  <span className="ml-1 text-gray-600 dark:text-gray-400">
                    {filteredChats.length === 1 ? 'Conversation' : 'Conversations'}
                  </span>
                </div>
                <div className="hidden sm:flex items-center space-x-2">
                  <span className="text-gray-600 dark:text-gray-400">Sorted by:</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Newest first</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat List */}
        {filteredChats.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <MessageSquare className="w-12 h-12 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                {searchTerm ? 'No matching conversations' : 'No conversations yet'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                {searchTerm 
                  ? 'Try adjusting your search terms to find what you\'re looking for.'
                  : 'Start a new conversation to see your chat history here.'
                }
              </p>
              <div className="flex justify-center">
                {searchTerm ? (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="inline-flex items-center px-5 py-2.5 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Clear search
                  </button>
                ) : (
                  <button
                    onClick={() => router.push('/chat')}
                    className="inline-flex items-center px-5 py-2.5 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Start New Chat
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => handleChatClick(chat.id)}
                  onMouseEnter={() => setSelectedChat(chat.id)}
                  onMouseLeave={() => setSelectedChat(null)}
                  className={`group relative p-6 hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer transition-all duration-200 ${selectedChat === chat.id ? 'bg-gray-50 dark:bg-gray-700/30' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex items-start space-x-4">
                        <div className={`mt-1 flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg ${selectedChat === chat.id ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-700'} transition-colors duration-200`}>
                          <MessageSquare className={`h-5 w-5 ${selectedChat === chat.id ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'} transition-colors duration-200`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className={`text-lg font-semibold ${selectedChat === chat.id ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-gray-100'} transition-colors duration-200 truncate`}>
                              {truncateText(chat.header, 80)}
                            </h3>
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 whitespace-nowrap">
                              {getRelativeTime(chat.createdAt)}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center space-x-4">
                            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(chat.createdAt)}
                            </span>
                            {chat.updatedAt !== chat.createdAt && (
                              <>
                                <span className="text-gray-300 dark:text-gray-600">•</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  Updated: {formatDate(chat.updatedAt)}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <ChevronRight className={`h-5 w-5 ${selectedChat === chat.id ? 'text-green-600 dark:text-green-400' : 'text-gray-400'} transition-colors duration-200`} />
                    </div>
                  </div>
                  
                  {/* Animated hover indicator */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-green-500 ${selectedChat === chat.id ? 'opacity-100' : 'opacity-0'} transition-all duration-200`}></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Showing {filteredChats.length} of {chats.length} total conversations</p>
        </div>
      </div>
    </div>
  );
}