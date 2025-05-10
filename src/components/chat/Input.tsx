"use client";

import { Send, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect, KeyboardEvent } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatInput = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
  };

  const handleSubmit = async () => {
    if (inputMessage.trim() === '' || isLoading) return;

    const userMessage = inputMessage;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputMessage('');
    setIsLoading(true);

    const newAssistantMessage: Message = { role: 'assistant', content: '' };
    setMessages(prev => [...prev, newAssistantMessage]);
    const messageIndex = messages.length + 1;
    
    try {
      const res = await fetch('/api/qna', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMessage }),
      });

      if (!res.body) throw new Error('No response body from stream');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantText += chunk;

        setMessages(prev => {
          const updated = [...prev];
          updated[messageIndex] = {
            role: 'assistant',
            content: assistantText,
          };
          return updated;
        });
      }
    } catch (error) {
      console.error('Streaming error:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong.' },
      ]);
    } finally {
      setIsLoading(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [inputMessage]);

  return (
    <div className="bg-white/95 backdrop-blur-sm fixed bottom-0 left-0 right-0 dark:bg-gray-900/95 border-t border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition-all focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-500/20">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={handleTextareaChange}
              placeholder="Ask QGenius..."
              className="w-full px-4 py-2.5 bg-transparent dark:bg-gray-800 outline-none resize-none min-h-[44px] max-h-[120px] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 leading-snug"
              rows={1}
              onKeyDown={handleKeyDown}
              aria-label="Chat input"
              disabled={isLoading}
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={inputMessage.trim() === '' || isLoading}
            className={`p-3 rounded-lg text-white transition-colors duration-200 flex items-center justify-center ${
              inputMessage.trim() === '' || isLoading
                ? 'bg-red-300 dark:bg-red-800 cursor-not-allowed'
                : 'bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-600'
            }`}
            aria-label={isLoading ? "Sending message" : "Send message"}
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Send size={20} className="shrink-0" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;