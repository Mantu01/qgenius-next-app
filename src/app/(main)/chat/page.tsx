'use client';
import { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import ChatWelcome from '@/components/chat/Welcom';
import ChatMessage from '@/components/chat/ChatMessage';
import ChatInput from '@/components/chat/Input';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<any>(null);
  const inputRef = useRef<any>(null);

  const simulateResponse = (userMessage: string) => {
    setIsLoading(true);
    let responseText = '';

    if (/hello|hi/i.test(userMessage)) {
      responseText = "Hello! I'm QGenius, an AI assistant that provides intelligent, well-structured answers. How can I help you today?";
    } else if (/help/i.test(userMessage)) {
      responseText = "I'd be happy to help! I can answer questions, assist with writing tasks, explain complex topics, generate creative content, and provide downloadable responses. What would you like assistance with?";
    } else if (userMessage.includes('?')) {
      responseText = "That's an interesting question. I can provide a structured answer based on scientific or philosophical perspectives. Want me to explore one?";
    } else {
      responseText = "Thanks for your message. I offer intelligent responses and productivity tips. Want to learn how to save answers as PDFs?";
    }

    const delay = Math.floor(Math.random() * 2000) + 1500;


    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
      setIsLoading(false);
    }, delay);
  };

  const handleSubmit = () => {
    if (inputMessage.trim() === '') return;

    setMessages(prev => [...prev, { role: 'user', content: inputMessage }]);
    simulateResponse(inputMessage);
    setInputMessage('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-16">
      <main className="flex-1 p-4">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 && <ChatWelcome />}
          <div className="space-y-6">
            {messages.map((message, index) => (
              <ChatMessage key={index} role={message.role} content={message.content} />
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-bl-none px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <Loader2 size={16} className="animate-spin text-gray-400 dark:text-gray-500" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">QGenius is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>
      <ChatInput
        inputRef={inputRef}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
