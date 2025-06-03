"use client";

import { addChat, setSelctedChat } from '@/app/store/chatSlice';
import axios from 'axios';
import { Send, Loader2, Info } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ChatInput = ({isOpening}:{isOpening:boolean}) => {
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const router = useRouter();
  const {chatId}=useParams();

  const {selectedChat}=useSelector((state:RootState)=>state.chat)

  useEffect(()=>{
    if(selectedChat && chatId!==selectedChat ){
      router.push(`/chat/c/${selectedChat}`);
    }
  },[selectedChat])

  const dispatch=useDispatch();

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
  };

  const handleSubmit = async () => {
    if (inputMessage.trim() === '' || isLoading) return;
    const userMessage = inputMessage;
    dispatch(addChat({role:'user',content:userMessage}));
    setInputMessage('');
    setIsLoading(true);

    if(isOpening){
      try {
        const {data}=await axios.post('api/chat',{question:userMessage});
        dispatch(setSelctedChat(data.id))
        router.push(`chat/c/${data.id}`)
      } catch (error) {
        console.error('Streaming error:', error);
        dispatch(addChat({role:'assistant',Content:'Sorry, something went wrong.'}));
      } finally {
        setIsLoading(false);
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
      return;
    }
    
    try {
      const res = await fetch(`/api/chat/${selectedChat}`, {
        method: 'PUT',
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

        dispatch(addChat({role:'assistant',Content:assistantText}));
      }
    } catch (error) {
      console.error('Streaming error:', error);
      dispatch(addChat({role:'assistant',Content:'Sorry, something went wrong.'}));
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
    <div className="bg-white/95 backdrop-blur-sm fixed bottom-0 left-0 md:ml-60 right-0 dark:bg-gray-900/95 border-t border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="max-w-4xl mx-auto">
        {/* AI Disclaimer */}
        <div className={`mb-3 flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg ${isOpening?'':'hidden'}`}>
          <Info className="text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" size={16} />
          <div className="text-sm text-amber-800 dark:text-amber-200">
            <p className="font-medium mb-1">Important Notice</p>
            <p className="text-xs leading-relaxed">
              QGenius AI provides individual responses to each query and does not maintain conversation context between messages. 
              Each question is treated as a standalone inquiry. For better results, include relevant context in your current message.
            </p>
          </div>
        </div>

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

        {/* Additional Context Tip */}
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
          💡 Tip: Include relevant background information in your message for more accurate responses
        </div>
      </div>
    </div>
  );
};

export default ChatInput;