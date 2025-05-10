"use client";

import { FC, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaRegClipboard, FaClipboardCheck } from "react-icons/fa";

interface MarkdownPreviewProps {
  markdown: string;
  question?: string;
  isWhite?: boolean;
}

const MarkdownPreview: FC<MarkdownPreviewProps> = ({ markdown }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <div className="text-base leading-relaxed max-w-full overflow-hidden">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl font-semibold mt-4 mb-2 text-gray-900 dark:text-gray-100 break-words">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-semibold mt-3 mb-2 text-gray-900 dark:text-gray-100 break-words">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-medium mt-3 mb-1 text-gray-900 dark:text-gray-100 break-words">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-base font-medium mt-2 mb-1 text-gray-900 dark:text-gray-200 break-words">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="mb-3 text-gray-800 dark:text-gray-200 break-words whitespace-pre-wrap">
              {children}
            </p>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-700 dark:text-gray-300 my-2 break-words">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline break-all"
            >
              {children}
            </a>
          ),
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const codeString = String(children).replace(/\n$/, "");
            const key = `${match ? match[1] : "text"}-${codeString.substring(0, 20)}`;

            return match ? (
              <div className="relative my-3 rounded-md overflow-hidden max-w-full">
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                  className="rounded-md text-sm leading-relaxed overflow-x-auto"
                  wrapLines={true}
                  wrapLongLines={true}
                >
                  {codeString}
                </SyntaxHighlighter>
                <button
                  onClick={() => handleCopy(codeString, key)}
                  className="absolute top-2 right-2 p-1.5 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-200 transition-colors"
                  aria-label="Copy code"
                >
                  {copied === key ? (
                    <FaClipboardCheck className="text-green-400 w-4 h-4" />
                  ) : (
                    <FaRegClipboard className="w-4 h-4" />
                  )}
                </button>
              </div>
            ) : (
              <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-gray-800 dark:text-gray-200 text-sm break-words whitespace-pre-wrap">
                {children}
              </code>
            );
          },
          table: ({ children }) => (
            <div className="overflow-x-auto my-3 max-w-full">
              <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left font-medium text-gray-700 dark:text-gray-300 break-words">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-gray-200 break-words">
              {children}
            </td>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-1 my-3 text-gray-800 dark:text-gray-200 break-words">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-1 my-3 text-gray-800 dark:text-gray-200 break-words">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="ml-1 break-words whitespace-normal">
              {children}
            </li>
          ),
          hr: () => (
            <hr className="my-4 border-t border-gray-300 dark:border-gray-700" />
          ),
          img: ({ src, alt }) => (
            <div className="my-3 max-w-full overflow-hidden">
              <img
                src={src}
                alt={alt}
                className="max-w-full h-auto rounded-md"
              />
            </div>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownPreview;