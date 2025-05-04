import { Send, Loader2 } from 'lucide-react';

type Props = {
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  inputMessage: string;
  setInputMessage: (val: string) => void;
  handleSubmit: () => void;
  isLoading: boolean;
};

export default function ChatInput({ inputRef, inputMessage, setInputMessage, handleSubmit, isLoading }: Props) {
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
    e.target.style.height = 'auto';
    const newHeight = Math.min(e.target.scrollHeight, 120);
    e.target.style.height = `${newHeight}px`;
  };

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
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
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
}