import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface NoteContent {
  id: string;
  question: string;
  answer: string;
  level: string;
  noteId: string;
}

interface Note {
  id: string;
  topic: string;
  userId: string;
  contenets: NoteContent[];
}

interface PDFGeneratorProps {
  note: Note;
  className?: string;
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ note, className = '' }) => {
  const [generatingPdf, setGeneratingPdf] = useState(false);

  const processMarkdownForPDF = async (markdown: string): Promise<string> => {
    let html = markdown;
    
    // Handle code blocks first (to avoid other replacements interfering)
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/gim, (match, lang, code) => {
      const languageLabel = lang ? lang.toUpperCase() : 'CODE';
      return `
        <div style="margin: 20px 0; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <div style="background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 10px 15px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px;">
            <span style="opacity: 0.9;">💻</span> ${languageLabel}
          </div>
          <pre style="background-color: #f8fafc; padding: 20px; margin: 0; font-family: 'Consolas', 'Monaco', 'Courier New', monospace; font-size: 11px; line-height: 1.6; white-space: pre-wrap; word-break: break-word; overflow-wrap: break-word; color: #334155;"><code>${code.trim()}</code></pre>
        </div>
      `;
    });
    
    // Headers with enhanced styling
    html = html.replace(/^### (.*$)/gim, '<h3 style="font-size: 18px; font-weight: 700; margin: 25px 0 15px 0; color: #1e293b; border-left: 4px solid #22c55e; padding-left: 15px; background: linear-gradient(90deg, rgba(34, 197, 94, 0.1), transparent); padding: 10px 0 10px 15px; border-radius: 0 8px 8px 0;">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 style="font-size: 20px; font-weight: 700; margin: 30px 0 20px 0; color: #1e293b; border-left: 4px solid #dc2626; padding-left: 15px; background: linear-gradient(90deg, rgba(220, 38, 38, 0.1), transparent); padding: 12px 0 12px 15px; border-radius: 0 8px 8px 0;">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 style="font-size: 24px; font-weight: 800; margin: 35px 0 25px 0; color: #0f172a; text-align: center; padding: 20px; background: linear-gradient(135deg, rgba(220, 38, 38, 0.1), rgba(34, 197, 94, 0.1)); border-radius: 12px; border: 2px solid #e5e7eb;">$1</h1>');
    
    // Text formatting
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong style="font-weight: 700; color: #dc2626;">$1</strong>');
    html = html.replace(/\*(.*?)\*/gim, '<em style="font-style: italic; color: #059669;">$1</em>');
    html = html.replace(/__(.*?)__/gim, '<strong style="font-weight: 700; color: #dc2626; text-decoration: underline;">$1</strong>');
    html = html.replace(/_(.*?)_/gim, '<em style="font-style: italic; color: #059669;">$1</em>');
    
    // Inline code
    html = html.replace(/`([^`]+)`/gim, '<code style="background: linear-gradient(135deg, #f1f5f9, #e2e8f0); color: #dc2626; padding: 3px 8px; border-radius: 6px; font-family: \'Consolas\', \'Monaco\', \'Courier New\', monospace; font-size: 11px; font-weight: 600; border: 1px solid #cbd5e1;">$1</code>');
    
    // Enhanced lists
    html = html.replace(/^\* (.*$)/gim, '<li style="margin: 8px 0; padding-left: 10px; position: relative;"><span style="color: #22c55e; font-weight: bold; margin-right: 8px;">•</span>$1</li>');
    html = html.replace(/^\+ (.*$)/gim, '<li style="margin: 8px 0; padding-left: 10px; position: relative;"><span style="color: #dc2626; font-weight: bold; margin-right: 8px;">+</span>$1</li>');
    html = html.replace(/^- (.*$)/gim, '<li style="margin: 8px 0; padding-left: 10px; position: relative;"><span style="color: #6b7280; font-weight: bold; margin-right: 8px;">-</span>$1</li>');
    html = html.replace(/^\d+\. (.*$)/gim, '<li style="margin: 8px 0; padding-left: 10px; list-style: decimal; list-style-position: outside; margin-left: 20px;">$1</li>');
    
    // Wrap consecutive list items
    html = html.replace(/((?:<li[^>]*>.*?<\/li>\s*)+)/gims, '<ul style="padding: 15px 25px; margin: 15px 0; background: linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(220, 38, 38, 0.05)); border-radius: 10px; border-left: 4px solid #22c55e; list-style: none;">$1</ul>');
    
    // Tables
    html = html.replace(/\|(.+)\|/gim, (match, content) => {
      const cells = content.split('|').map(cell => cell.trim()).filter(cell => cell);
      const isHeader = content.includes('---');
      
      if (isHeader) return ''; // Skip separator rows
      
      return `<tr>${cells.map(cell => 
        `<td style="padding: 12px 15px; border: 1px solid #e5e7eb; background: ${cells.indexOf(cell) % 2 === 0 ? '#f8fafc' : 'white'};">${cell}</td>`
      ).join('')}</tr>`;
    });
    
    html = html.replace(/((?:<tr>.*?<\/tr>\s*)+)/gims, '<table style="width: 100%; border-collapse: collapse; margin: 20px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;">$1</table>');
    
    // Blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote style="border-left: 5px solid #22c55e; background: linear-gradient(90deg, rgba(34, 197, 94, 0.1), transparent); padding: 20px 25px; margin: 20px 0; color: #374151; font-style: italic; border-radius: 0 10px 10px 0; position: relative;"><span style="color: #22c55e; font-size: 24px; position: absolute; top: 10px; left: 15px; opacity: 0.3;">"</span><div style="margin-left: 20px;">$1</div></blockquote>');
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/gim, '<a href="$2" style="color: #dc2626; text-decoration: none; font-weight: 600; border-bottom: 2px solid rgba(220, 38, 38, 0.3); padding-bottom: 1px; transition: all 0.2s;">$1</a>');
    
    // Horizontal rules
    html = html.replace(/^---$/gim, '<hr style="border: none; height: 3px; background: linear-gradient(90deg, #dc2626, #22c55e); margin: 30px 0; border-radius: 2px;" />');
    
    // Strikethrough
    html = html.replace(/~~(.*?)~~/gim, '<del style="color: #6b7280; text-decoration: line-through;">$1</del>');
    
    // Highlight
    html = html.replace(/==(.*?)==/gim, '<mark style="background: linear-gradient(135deg, #fef3c7, #fde68a); padding: 2px 6px; border-radius: 4px; color: #92400e; font-weight: 600;">$1</mark>');
    
    // Paragraphs with improved spacing
    html = html.split('\n\n').map(paragraph => {
      if (paragraph.trim() && 
          !paragraph.includes('<h1') && 
          !paragraph.includes('<h2') && 
          !paragraph.includes('<h3') && 
          !paragraph.includes('<ul') && 
          !paragraph.includes('<blockquote') && 
          !paragraph.includes('<pre') && 
          !paragraph.includes('<table') &&
          !paragraph.includes('<hr')) {
        return `<p style="margin: 15px 0; line-height: 1.8; color: #374151; text-align: justify; text-justify: inter-word;">${paragraph.trim()}</p>`;
      }
      return paragraph;
    }).join('\n\n');
    
    return html;
  };

  const createPDFContainer = () => {
    const pdfContainer = document.createElement('div');
    pdfContainer.style.position = 'absolute';
    pdfContainer.style.left = '-9999px';
    pdfContainer.style.top = '0';
    pdfContainer.style.width = '210mm'; // A4 width
    pdfContainer.style.minHeight = '297mm'; // A4 height
    pdfContainer.style.padding = '25mm 20mm 25mm 20mm';
    pdfContainer.style.backgroundColor = 'white';
    pdfContainer.style.color = '#1f2937';
    pdfContainer.style.fontFamily = '"Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", Arial, sans-serif';
    pdfContainer.style.fontSize = '12px';
    pdfContainer.style.lineHeight = '1.7';
    pdfContainer.style.boxSizing = 'border-box';

    return pdfContainer;
  };

  const generatePDFContent = (container: HTMLElement) => {
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    container.innerHTML = `
      <!-- Header Section -->
      <div style="margin-bottom: 40px; text-align: center; border-bottom: 3px solid; border-image: linear-gradient(90deg, #dc2626, #22c55e) 1; padding-bottom: 30px; position: relative;">
        <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
          <img src="https://res.cloudinary.com/dqznmhhtv/image/upload/v1745812881/image__1_-removebg-preview_cq7xid.png" 
               alt="QGenius Logo" 
               style="height: 60px; width: auto; margin-right: 15px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));" />
          <div>
            <h1 style="font-size: 36px; margin: 0; background: linear-gradient(135deg, #dc2626, #22c55e); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 800; letter-spacing: -0.5px;">
              ${note.topic}
            </h1>
            <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px; font-weight: 500;">
              Professional Study Notes • Generated by QGenius
            </p>
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 25px; padding: 15px 25px; background: linear-gradient(135deg, rgba(220, 38, 38, 0.05), rgba(34, 197, 94, 0.05)); border-radius: 12px; border: 1px solid #e5e7eb;">
          <div style="text-align: left;">
            <span style="display: inline-block; padding: 8px 16px; background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; border-radius: 20px; font-size: 12px; font-weight: 600; letter-spacing: 0.5px;">
              📚 ${note.contenets.length} Questions
            </span>
          </div>
          <div style="text-align: right; color: #6b7280; font-size: 12px;">
            <div style="font-weight: 600;">Generated on</div>
            <div style="color: #22c55e; font-weight: 700;">${currentDate}</div>
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <div style="padding-bottom: 50px;">
        ${note.contenets.map((content, index) => {
          const levelColors = {
            easy: { bg: '#dcfce7', border: '#22c55e', text: '#15803d', icon: '🟢' },
            medium: { bg: '#fef3c7', border: '#f59e0b', text: '#d97706', icon: '🟡' },
            hard: { bg: '#fee2e2', border: '#dc2626', text: '#dc2626', icon: '🔴' }
          };
          
          const levelStyle = levelColors[content.level as keyof typeof levelColors] || levelColors.medium;
          
          return `
            <div style="margin-bottom: 50px; page-break-inside: avoid; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.1); background: white;">
              <!-- Question Header -->
              <div style="background: linear-gradient(135deg, ${levelStyle.border}, ${levelStyle.border}dd); color: white; padding: 25px 30px;">
                <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 15px;">
                  <h2 style="font-size: 20px; margin: 0; font-weight: 700; line-height: 1.4; flex: 1; margin-right: 20px;">
                    Question ${index + 1}
                  </h2>
                  <span style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: rgba(255,255,255,0.2); border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; backdrop-filter: blur(10px);">
                    ${levelStyle.icon} ${content.level}
                  </span>
                </div>
                <div style="font-size: 16px; line-height: 1.6; opacity: 0.95; font-weight: 500;">
                  ${content.question}
                </div>
              </div>
              
              <!-- Answer Section -->
              <div style="padding: 35px 30px; background: linear-gradient(135deg, #fafbfc, #f8fafc);">
                <div style="position: relative;">
                  <div style="position: absolute; top: -10px; left: -15px; width: 4px; height: calc(100% + 20px); background: linear-gradient(180deg, ${levelStyle.border}, ${levelStyle.border}66); border-radius: 2px;"></div>
                  <div id="content-${content.id}" style="margin-left: 20px; color: #1f2937;"></div>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Footer -->
      <div style="margin-top: 60px; padding-top: 30px; border-top: 2px solid; border-image: linear-gradient(90deg, #dc2626, #22c55e) 1; text-align: center;">
        <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 15px;">
          <img src="https://res.cloudinary.com/dqznmhhtv/image/upload/v1745812881/image__1_-removebg-preview_cq7xid.png" 
               alt="QGenius Logo" 
               style="height: 24px; width: auto;" />
          <span style="font-size: 14px; font-weight: 700; background: linear-gradient(135deg, #dc2626, #22c55e); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
            QGenius
          </span>
        </div>
        <p style="margin: 0; color: #6b7280; font-size: 11px; font-weight: 500;">
          Empowering Learning Through Technology • www.qgenius.com
        </p>
      </div>
    `;
  };

  const generatePDF = async () => {
    if (!note) return;

    try {
      setGeneratingPdf(true);
      toast.info('🎨 Creating professional PDF...');

      // Create PDF container with professional styling
      const pdfContainer = createPDFContainer();
      generatePDFContent(pdfContainer);
      document.body.appendChild(pdfContainer);

      // Process each content's markdown with enhanced formatting
      for (const content of note.contenets) {
        const contentDiv = pdfContainer.querySelector(`#content-${content.id}`);
        if (contentDiv) {
          const processedMarkdown = await processMarkdownForPDF(content.answer);
          contentDiv.innerHTML = processedMarkdown;
        }
      }

      // Wait for images to load
      const images = pdfContainer.querySelectorAll('img');
      await Promise.all(Array.from(images).map(img => {
        return new Promise((resolve) => {
          if (img.complete) {
            resolve(null);
          } else {
            img.onload = () => resolve(null);
            img.onerror = () => resolve(null);
          }
        });
      }));

      toast.info('📄 Rendering PDF pages...');

      // Generate PDF with high quality settings
      const canvas = await html2canvas(pdfContainer, {
        scale: 2.5, // Higher quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: pdfContainer.scrollWidth,
        height: pdfContainer.scrollHeight,
        imageTimeout: 30000,
        onclone: (clonedDoc) => {
          // Enhance cloned document for better PDF rendering
          const allElements = clonedDoc.querySelectorAll('*');
          allElements.forEach(el => {
            const element = el as HTMLElement;
            element.style.webkitFontSmoothing = 'antialiased';
            element.style.textRendering = 'optimizeLegibility';
          });

          // Improve code blocks
          const codeBlocks = clonedDoc.querySelectorAll('pre, code');
          codeBlocks.forEach(block => {
            const element = block as HTMLElement;
            element.style.whiteSpace = 'pre-wrap';
            element.style.wordBreak = 'break-word';
            element.style.maxHeight = 'none';
            element.style.overflow = 'visible';
          });

          // Ensure tables are properly formatted
          const tables = clonedDoc.querySelectorAll('table');
          tables.forEach(table => {
            const element = table as HTMLElement;
            element.style.width = '100%';
            element.style.borderCollapse = 'collapse';
            element.style.pageBreakInside = 'avoid';
          });
        }
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;
      let pageNumber = 1;

      // Add pages with proper positioning
      while (heightLeft > 0) {
        if (pageNumber > 1) {
          pdf.addPage();
        }
        
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
        position -= pdfHeight;
        pageNumber++;
      }

      // Clean up
      document.body.removeChild(pdfContainer);

      // Generate professional filename
      const safeTopicName = note.topic
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '_')
        .toLowerCase()
        .substring(0, 50);
      
      const timestamp = new Date().toISOString().split('T')[0];
      const fileName = `QGenius_${safeTopicName}_${timestamp}.pdf`;
      
      pdf.save(fileName);
      
      toast.success('✅ Professional PDF generated successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('❌ Failed to generate PDF. Please try again.');
    } finally {
      setGeneratingPdf(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={generatingPdf}
      className={`group relative flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 ${className}`}
    >
      <div className="flex items-center gap-2">
        {generatingPdf ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Download className="w-5 h-5 group-hover:animate-bounce" />
        )}
        <span className="relative">
          {generatingPdf ? 'Creating PDF...' : 'Download PDF'}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/50 group-hover:w-full transition-all duration-300"></span>
        </span>
      </div>
      
      {/* Loading indicator */}
      {generatingPdf && (
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 rounded-xl opacity-0 animate-pulse"></div>
      )}
    </button>
  );
};

export default PDFGenerator;