import Image from 'next/image';

const suggestedQuestions = [
  "Ask me anything",
  "How to save as PDF",
  "Explain quantum computing in simple terms",
  "What is the best way to learn React?",
  "Summarize this article for me",
  "Generate a study plan for web development",
];

export default function ChatWelcome() {
  return (
    <div className="text-center py-12">
      <div className="h-16 w-16 mx-auto mb-6 relative">
        <Image
          src="https://res.cloudinary.com/dqznmhhtv/image/upload/v1745812881/image__1_-removebg-preview_cq7xid.png"
          alt="QGenius Logo"
          fill
          className="object-contain"
        />
      </div>
      <h1 className="text-2xl font-bold mb-3">Welcome to QGenius</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">
        I'm an AI assistant that provides intelligent, well-structured answers and allows you to download responses as PDFs. How can I assist you today?
      </p>
      <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto mb-6">
        {suggestedQuestions.map((question, index) => (
          <button
            key={index}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}
