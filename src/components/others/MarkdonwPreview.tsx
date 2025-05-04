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

const MarkdownPreview: FC<MarkdownPreviewProps> = ({ markdown, question, isWhite }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  };
   const md: string = `
👋 Hi there! I am **Mantu Kumar**, a passionate **Frontend Developer** from **India**.  

### 🚀 About Me:  
- 💻 I specialize in **React.js**, **Next.js**, and the **MERN Stack**.  
- 🎨 I create **beautiful, interactive, and user-friendly** web applications.  
- 📚 I am continuously **learning and improving** my skills in **web development**.  
- 🌍 I love building projects that solve **real-world problems**.  

### 🔥 My Key Skills:  
- **Frontend:** React.js, Next.js, TypeScript, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Other Technologies:** Git, npm, js-cookie, Markdown preview  

### 🛠️ Projects:  
- **[Yatra](https://yatra-eight.vercel.app/):** A **travel website** to explore destinations.  
- **Portfolio:** Showcasing my work, integrating **AI-powered Q&A**.  

### 💻 Code Snippets:

#### C++
\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, Mantu!" << endl;
    return 0;
}
\`\`\`

#### JavaScript
\`\`\`js
const greet = (name) => {
  console.log(\`Hello, \${name}!\`);
};

greet("Mantu");
\`\`\`

#### Java
\`\`\`java
public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello, Mantu!");
  }
}
\`\`\`

### 📌 Goals:  
- Mastering **React animations** ✨  
- Improving my **Data Structures & Algorithms (DSA)** knowledge 📊  
- Building **AI-powered applications** 🤖

🔗 **GitHub:** [Mantu01](https://github.com/Mantu01)  

💡 *Always learning, always building!* 🚀  
`;


  return (
    <div className="text-base leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl font-semibold mt-4 mb-2 text-gray-900 dark:text-gray-100">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-semibold mt-3 mb-2 text-gray-900 dark:text-gray-100">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-medium mt-3 mb-1 text-gray-900 dark:text-gray-100">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-base font-medium mt-2 mb-1 text-gray-900 dark:text-gray-200">{children}</h4>
          ),
          p: ({ children }) => (
            <p className="mb-3 text-gray-800 dark:text-gray-200">{children}</p>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-700 dark:text-gray-300 my-2">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {children}
            </a>
          ),
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const codeString = String(children).replace(/\n$/, "");
            const key = `${match ? match[1] : "text"}-${codeString.substring(0, 20)}`;

            return match ? (
              <div className="relative my-3 rounded-md overflow-hidden">
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                  className="rounded-md text-sm leading-relaxed"
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
              <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-gray-800 dark:text-gray-200 text-sm">
                {children}
              </code>
            );
          },
          table: ({ children }) => (
            <div className="overflow-x-auto my-3">
              <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left font-medium text-gray-700 dark:text-gray-300">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-gray-200">
              {children}
            </td>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-1 my-3 text-gray-800 dark:text-gray-200">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-1 my-3 text-gray-800 dark:text-gray-200">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="ml-1">{children}</li>,
          hr: () => <hr className="my-4 border-t border-gray-300 dark:border-gray-700" />,
          img: ({ src, alt }) => (
            <img src={src} alt={alt} className="max-w-full h-auto my-3 rounded-md" />
          ),
        }}
      >
        {md}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownPreview;