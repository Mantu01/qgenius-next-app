"use client";

import { FC, useState, useCallback, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaRegClipboard, FaClipboardCheck, FaExpand, FaCompress } from "react-icons/fa";
import "katex/dist/katex.min.css";

interface MarkdownPreviewProps {
  markdown: string;
  theme?: "dark" | "light" | "auto";
  className?: string;
  enableMath?: boolean;
  enableRawHtml?: boolean;
  maxWidth?: string;
}

const MarkdownPreview: FC<MarkdownPreviewProps> = ({ 
  markdown, 
  theme = "auto",
  className = "",
  enableMath = true,
  enableRawHtml = true,
  maxWidth = "full"
}) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedBlocks, setExpandedBlocks] = useState<Set<string>>(new Set());

  const handleCopy = useCallback((text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  }, []);

  const toggleExpand = useCallback((key: string) => {
    setExpandedBlocks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  }, []);

  const isDarkMode = useMemo(() => {
    if (theme === "auto") {
      return typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    }
    return theme === "dark";
  }, [theme]);

  const syntaxTheme = isDarkMode ? oneDark : oneLight;

  const remarkPlugins = useMemo(() => {
    const plugins = [remarkGfm];
    //@ts-expect-error: unknown
    if (enableMath) plugins.push(remarkMath);
    return plugins;
  }, [enableMath]);

  const rehypePlugins = useMemo(() => {
    const plugins = [];
    if (enableMath) plugins.push(rehypeKatex);
    if (enableRawHtml) plugins.push(rehypeRaw);
    return plugins;
  }, [enableMath, enableRawHtml]);

  return (
    <div className={`text-base leading-relaxed overflow-hidden ${maxWidth === 'full' ? 'w-full' : `max-w-${maxWidth}`} ${className}`}>
      <ReactMarkdown
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mt-6 mb-4 text-gray-900 dark:text-gray-100 break-words border-b-2 border-gray-200 dark:border-gray-700 pb-2">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold mt-5 mb-3 text-gray-900 dark:text-gray-100 break-words border-b border-gray-200 dark:border-gray-700 pb-1">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-gray-100 break-words">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-medium mt-3 mb-2 text-gray-900 dark:text-gray-200 break-words">
              {children}
            </h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-base font-medium mt-2 mb-1 text-gray-900 dark:text-gray-200 break-words">
              {children}
            </h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-sm font-medium mt-2 mb-1 text-gray-800 dark:text-gray-300 break-words">
              {children}
            </h6>
          ),
          p: ({ children }) => (
            <p className="mb-4 text-gray-800 dark:text-gray-200 break-words whitespace-pre-wrap leading-7">
              {children}
            </p>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 dark:border-blue-400 pl-6 pr-4 py-2 italic text-gray-700 dark:text-gray-300 my-4 bg-gray-50 dark:bg-gray-800/50 rounded-r-md break-words">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline break-all transition-colors duration-200 font-medium"
            >
              {children}
            </a>
          ),
          code: ({  className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const codeString = String(children).replace(/\n$/, "");
            const key = `${match ? match[1] : "text"}-${codeString.substring(0, 20).replace(/\s/g, '')}`;
            const isExpanded = expandedBlocks.has(key);
            const isLongCode = codeString.split('\n').length > 10 || codeString.length > 300;

            return match ? (
              <div className="relative my-4 rounded-lg overflow-hidden w-full shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                    {match[1]}
                  </span>
                  <div className="flex items-center space-x-2">
                    {isLongCode && (
                      <button
                        onClick={() => toggleExpand(key)}
                        className="p-1.5 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors"
                        aria-label={isExpanded ? "Collapse code" : "Expand code"}
                        title={isExpanded ? "Collapse" : "Expand"}
                      >
                        {isExpanded ? (
                          <FaCompress className="w-3 h-3" />
                        ) : (
                          <FaExpand className="w-3 h-3" />
                        )}
                      </button>
                    )}
                    <button
                      onClick={() => handleCopy(codeString, key)}
                      className="p-1.5 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors"
                      aria-label="Copy code"
                      title="Copy to clipboard"
                    >
                      {copied === key ? (
                        <FaClipboardCheck className="text-green-500 w-3 h-3" />
                      ) : (
                        <FaRegClipboard className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>
                <div className={`${isLongCode && !isExpanded ? 'max-h-96 overflow-y-auto' : ''}`}>
                  <SyntaxHighlighter
                    //@ts-expect-error: unknown
                    style={syntaxTheme || undefined}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                    className={`text-sm leading-relaxed ${!isExpanded ? 'overflow-x-auto' : ''}`}
                    wrapLines={true}
                    wrapLongLines={true}
                    showLineNumbers={codeString.split('\n').length > 3}
                    showInlineLineNumbers={false}
                    lineNumberStyle={{ minWidth: '2.5em' }}
                  >
                    {codeString}
                  </SyntaxHighlighter>
                </div>
                {isLongCode && !isExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-100 to-transparent dark:from-gray-800 flex items-end justify-center pb-2">
                    <button
                      onClick={() => toggleExpand(key)}
                      className="text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-2 py-1 rounded-md text-gray-600 dark:text-gray-300 transition-colors flex items-center gap-1"
                    >
                      <FaExpand className="w-2.5 h-2.5" />
                      Show more
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md text-gray-800 dark:text-gray-200 text-sm break-words whitespace-pre-wrap font-mono border border-gray-200 dark:border-gray-600">
                {children}
              </code>
            );
          },
          table: ({ children }) => (
            <div className="overflow-x-auto my-4 w-full rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <table className="min-w-full border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-50 dark:bg-gray-800">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="border-b border-gray-200 dark:border-gray-700 px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 break-words uppercase text-xs tracking-wider">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 text-gray-800 dark:text-gray-200 break-words">
              {children}
            </td>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside space-y-2 my-4 text-gray-800 dark:text-gray-200 break-words pl-6">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside space-y-2 my-4 text-gray-800 dark:text-gray-200 break-words pl-6">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="break-words whitespace-normal leading-7">
              {children}
            </li>
          ),
          hr: () => (
            <hr className="my-8 border-t-2 border-gray-300 dark:border-gray-700" />
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-gray-900 dark:text-gray-100">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-gray-800 dark:text-gray-200">
              {children}
            </em>
          ),
          del: ({ children }) => (
            <del className="line-through text-gray-500 dark:text-gray-400">
              {children}
            </del>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownPreview;