"use client";

import { FC, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkBreaks from "remark-breaks";
import remarkEmoji from "remark-emoji";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaRegClipboard, FaClipboardCheck } from "react-icons/fa";
import "katex/dist/katex.min.css"; // Import KaTeX CSS

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

  // Enhanced text preprocessing for better symbol support
  const preprocessMarkdown = (text: string) => {
    return text
      // Fix common Unicode issues
      .replace(/[\u2018\u2019]/g, "'") // Smart quotes to regular quotes
      .replace(/[\u201C\u201D]/g, '"') // Smart double quotes
      .replace(/\u2013/g, '-') // En dash
      .replace(/\u2014/g, '--') // Em dash
      .replace(/\u2026/g, '...') // Ellipsis
      // Support for common mathematical symbols
      .replace(/±/g, '±')
      .replace(/×/g, '×')
      .replace(/÷/g, '÷')
      .replace(/∞/g, '∞')
      .replace(/∑/g, '∑')
      .replace(/∏/g, '∏')
      .replace(/∫/g, '∫')
      .replace(/√/g, '√')
      .replace(/∆/g, '∆')
      .replace(/π/g, 'π')
      .replace(/α/g, 'α')
      .replace(/β/g, 'β')
      .replace(/γ/g, 'γ')
      .replace(/δ/g, 'δ')
      .replace(/ε/g, 'ε')
      .replace(/θ/g, 'θ')
      .replace(/λ/g, 'λ')
      .replace(/μ/g, 'μ')
      .replace(/σ/g, 'σ')
      .replace(/φ/g, 'φ')
      .replace(/ω/g, 'ω')
      // Support for arrows
      .replace(/→/g, '→')
      .replace(/←/g, '←')
      .replace(/↑/g, '↑')
      .replace(/↓/g, '↓')
      .replace(/↔/g, '↔')
      .replace(/⇒/g, '⇒')
      .replace(/⇐/g, '⇐')
      .replace(/⇔/g, '⇔')
      // Support for logical symbols
      .replace(/∧/g, '∧')
      .replace(/∨/g, '∨')
      .replace(/¬/g, '¬')
      .replace(/∀/g, '∀')
      .replace(/∃/g, '∃')
      .replace(/∈/g, '∈')
      .replace(/∉/g, '∉')
      .replace(/⊂/g, '⊂')
      .replace(/⊃/g, '⊃')
      .replace(/∪/g, '∪')
      .replace(/∩/g, '∩')
      // Support for comparison symbols
      .replace(/≤/g, '≤')
      .replace(/≥/g, '≥')
      .replace(/≠/g, '≠')
      .replace(/≈/g, '≈')
      .replace(/≡/g, '≡');
  };

  return (
    <div className="text-base leading-relaxed max-w-full overflow-hidden markdown-content">
      <style jsx global>{`
        .markdown-content {
          font-feature-settings: "liga" 1, "calt" 1;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .katex {
          font-size: 1.1em;
        }
        
        .katex-display {
          margin: 1em 0;
          text-align: center;
        }
        
        .katex-display > .katex {
          display: inline-block;
          white-space: nowrap;
        }
        
        /* Custom checkbox styling */
        .task-list-item {
          list-style: none;
          margin-left: -1.5em;
        }
        
        .task-list-item input[type="checkbox"] {
          margin-right: 0.5em;
        }
        
        /* Enhanced table styling */
        .table-container {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        /* Mermaid diagram support */
        .mermaid {
          text-align: center;
          margin: 1em 0;
        }
        
        /* Better handling of long URLs */
        .url-break {
          word-break: break-all;
          overflow-wrap: break-word;
        }
        
        /* Enhanced code block styling */
        .code-container {
          position: relative;
          margin: 1em 0;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .code-header {
          background: #2d3748;
          color: #e2e8f0;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          border-bottom: 1px solid #4a5568;
        }
      `}</style>

      <ReactMarkdown
        remarkPlugins={[
          remarkGfm,
          remarkMath,
          remarkBreaks,
          remarkEmoji,
        ]}
        rehypePlugins={[
          rehypeKatex,
          rehypeRaw,
          rehypeHighlight,
        ]}
        components={{
          // Enhanced heading components with anchor support
          h1: ({ children, id }) => (
            <h1 
              id={id}
              className="text-3xl font-bold mt-6 mb-4 text-gray-900 dark:text-gray-100 break-words border-b border-gray-200 dark:border-gray-700 pb-2"
            >
              {children}
            </h1>
          ),
          h2: ({ children, id }) => (
            <h2 
              id={id}
              className="text-2xl font-semibold mt-5 mb-3 text-gray-900 dark:text-gray-100 break-words border-b border-gray-200 dark:border-gray-700 pb-1"
            >
              {children}
            </h2>
          ),
          h3: ({ children, id }) => (
            <h3 
              id={id}
              className="text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-gray-100 break-words"
            >
              {children}
            </h3>
          ),
          h4: ({ children, id }) => (
            <h4 
              id={id}
              className="text-lg font-medium mt-3 mb-2 text-gray-900 dark:text-gray-200 break-words"
            >
              {children}
            </h4>
          ),
          h5: ({ children, id }) => (
            <h5 
              id={id}
              className="text-base font-medium mt-2 mb-1 text-gray-900 dark:text-gray-200 break-words"
            >
              {children}
            </h5>
          ),
          h6: ({ children, id }) => (
            <h6 
              id={id}
              className="text-sm font-medium mt-2 mb-1 text-gray-700 dark:text-gray-300 break-words"
            >
              {children}
            </h6>
          ),
          
          // Enhanced paragraph with better line height
          p: ({ children }) => (
            <p className="mb-4 text-gray-800 dark:text-gray-200 break-words whitespace-pre-wrap leading-7">
              {children}
            </p>
          ),
          
          // Enhanced blockquote with better styling
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 py-2 italic text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 my-4 break-words rounded-r-md">
              {children}
            </blockquote>
          ),
          
          // Enhanced link with better security and styling
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline break-all transition-colors duration-200 url-break"
            >
              {children}
            </a>
          ),
          
          // Enhanced code component with language detection and better styling
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const codeString = String(children).replace(/\n$/, "");
            const language = match ? match[1] : "text";
            const key = `${language}-${codeString.substring(0, 20)}`;

            return match ? (
              <div className="code-container">
                {language !== "text" && (
                  <div className="code-header">
                    {language.toUpperCase()}
                  </div>
                )}
                <SyntaxHighlighter
                  style={oneDark}
                  language={language}
                  PreTag="div"
                  {...props}
                  className="!m-0 text-sm leading-relaxed"
                  wrapLines={true}
                  wrapLongLines={true}
                  showLineNumbers={codeString.split('\n').length > 10}
                >
                  {codeString}
                </SyntaxHighlighter>
                <button
                  onClick={() => handleCopy(codeString, key)}
                  className="absolute top-2 right-2 p-2 rounded-md bg-gray-700/80 hover:bg-gray-600 text-gray-200 transition-all duration-200 backdrop-blur-sm"
                  aria-label="Copy code"
                  style={{ zIndex: 10 }}
                >
                  {copied === key ? (
                    <FaClipboardCheck className="text-green-400 w-4 h-4" />
                  ) : (
                    <FaRegClipboard className="w-4 h-4" />
                  )}
                </button>
              </div>
            ) : (
              <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-800 dark:text-gray-200 text-sm break-words whitespace-pre-wrap font-mono">
                {children}
              </code>
            );
          },
          
          // Enhanced table with better responsive design
          table: ({ children }) => (
            <div className="overflow-x-auto my-4 max-w-full">
              <div className="table-container">
                <table className="min-w-full border-collapse">
                  {children}
                </table>
              </div>
            </div>
          ),
          
          // Enhanced table headers
          th: ({ children }) => (
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 bg-gray-100 dark:bg-gray-800 text-left font-semibold text-gray-800 dark:text-gray-200 break-words">
              {children}
            </th>
          ),
          
          // Enhanced table cells
          td: ({ children }) => (
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-800 dark:text-gray-200 break-words">
              {children}
            </td>
          ),
          
          // Enhanced lists with better spacing
          ul: ({ children }) => (
            <ul className="list-disc ml-6 space-y-2 my-4 text-gray-800 dark:text-gray-200">
              {children}
            </ul>
          ),
          
          ol: ({ children }) => (
            <ol className="list-decimal ml-6 space-y-2 my-4 text-gray-800 dark:text-gray-200">
              {children}
            </ol>
          ),
          
          // Enhanced list items with task list support
          li: ({ children, className }) => {
            const isTaskItem = className?.includes('task-list-item');
            return (
              <li className={`${isTaskItem ? 'task-list-item' : 'ml-1'} break-words whitespace-normal leading-6`}>
                {children}
              </li>
            );
          },
          
          // Enhanced horizontal rule
          hr: () => (
            <hr className="my-6 border-t-2 border-gray-300 dark:border-gray-700" />
          ),
          
          // Enhanced image with better responsive handling
          img: ({ src, alt }) => (
            <div className="my-4 max-w-full overflow-hidden">
              <img
                src={src}
                alt={alt}
                className="max-w-full h-auto rounded-lg shadow-md"
                loading="lazy"
              />
              {alt && (
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2 italic">
                  {alt}
                </p>
              )}
            </div>
          ),
          
          // Support for definition lists
          dl: ({ children }) => (
            <dl className="my-4 space-y-2">
              {children}
            </dl>
          ),
          
          dt: ({ children }) => (
            <dt className="font-semibold text-gray-900 dark:text-gray-100">
              {children}
            </dt>
          ),
          
          dd: ({ children }) => (
            <dd className="ml-4 text-gray-700 dark:text-gray-300">
              {children}
            </dd>
          ),
          
          // Support for keyboard keys
          kbd: ({ children }) => (
            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm font-mono">
              {children}
            </kbd>
          ),
          
          // Support for mark (highlight)
          mark: ({ children }) => (
            <mark className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
              {children}
            </mark>
          ),
          
          // Support for subscript and superscript
          sub: ({ children }) => (
            <sub className="text-xs align-sub">
              {children}
            </sub>
          ),
          
          sup: ({ children }) => (
            <sup className="text-xs align-super">
              {children}
            </sup>
          ),
          
          // Support for deleted and inserted text
          del: ({ children }) => (
            <del className="line-through text-gray-500 dark:text-gray-400">
              {children}
            </del>
          ),
          
          ins: ({ children }) => (
            <ins className="underline text-green-700 dark:text-green-400 no-underline bg-green-100 dark:bg-green-900/30 px-1 rounded">
              {children}
            </ins>
          ),
          
          // Support for abbreviations
          abbr: ({ children, title }) => (
            <abbr 
              title={title}
              className="border-b border-dotted border-gray-400 cursor-help"
            >
              {children}
            </abbr>
          ),
        }}
      >
        {preprocessMarkdown(markdown)}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownPreview;