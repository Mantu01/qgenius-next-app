import MarkdownPreview from "../others/MarkdonwPreview";

type Props = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatMessage({ role, content }: Props) {
  return (
    <div className="w-full">
      <div className={`flex items-start ${role === 'user' ? 'justify-end' : 'justify-center'}`}>
        <div
          className={`${role==='user'?'w-[85%] bg-slate-100 dark:bg-slate-950':'w-full'} rounded-2xl px-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-md`}
        >
          <MarkdownPreview
            markdown={content}
          />
        </div>
      </div>
    </div>
  );
}