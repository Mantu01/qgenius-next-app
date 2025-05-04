import MarkdownPreview from "../others/MarkdonwPreview";

type Props = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatMessage({ role, content }: Props) {
  return (
    <div className="w-full py-2">
      <div className={`flex items-start gap-3 ${role === 'user' ? 'justify-end' : 'justify-center'}`}>
        <div
          className={`${role==='user'?'max-w-[85%]':'w-full'} rounded-2xl px-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-md`}
        >
          <MarkdownPreview
            markdown={content}
          />
        </div>
      </div>
    </div>
  );
}