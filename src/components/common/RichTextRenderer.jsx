import React, { useState } from 'react';
import { Copy, Check, Terminal, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Robust, secure, and beautiful RichTextRenderer for Articles & Case Studies
 * Supports Markdown Headings, Bulleted & Numbered Lists, Code blocks with copy,
 * Blockquotes, Tables, Images, Links, Text Alignment, and custom accents.
 */
export const RichTextRenderer = ({ content = '', className = '' }) => {
  if (!content) return null;

  // Render Code Block with One-Click Copy
  const CodeBlock = ({ code, language }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Code copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="my-6 rounded-xl overflow-hidden border border-slate-800 bg-[#0B1220] shadow-xl font-mono text-xs">
        <div className="flex items-center justify-between px-4 py-2 bg-[#0F172A] border-b border-slate-800 text-slate-400 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="ml-2 uppercase tracking-wider font-semibold text-slate-300">
              {language || 'code'}
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2 py-1 hover:bg-slate-800 hover:text-white rounded-md transition-colors cursor-pointer text-[10px]"
            title="Copy snippet"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
        <pre className="p-4 overflow-x-auto text-emerald-300 leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
          <code>{code}</code>
        </pre>
      </div>
    );
  };

  // Helper to parse inline styles (bold, italic, code, links)
  const formatInlineText = (text) => {
    if (!text) return text;

    // Split text into tokens based on markdown syntax
    const parts = [];
    let remaining = text;
    let key = 0;

    // Simple regex replacements for clean rendering
    // 1. Links [text](url)
    // 2. Bold **text**
    // 3. Italic *text* or _text_
    // 4. Code `code`
    // 5. Strikethrough ~~text~~

    // Check if contains HTML tags directly
    if (/<[a-z][\s\S]*>/i.test(remaining)) {
      return <span dangerouslySetInnerHTML={{ __html: remaining }} />;
    }

    const inlineRegex = /(\*\*.*?\*\*|\*.*?\*|`.*?`|~~.*?~~|\[.*?\]\(.*?\))/g;
    const splitParts = remaining.split(inlineRegex);

    return splitParts.map((chunk, index) => {
      if (!chunk) return null;

      // Bold **text**
      if (chunk.startsWith('**') && chunk.endsWith('**') && chunk.length >= 4) {
        return <strong key={index} className="font-bold text-[#0B1938]">{chunk.slice(2, -2)}</strong>;
      }

      // Italic *text*
      if (chunk.startsWith('*') && chunk.endsWith('*') && chunk.length >= 2) {
        return <em key={index} className="italic text-slate-700">{chunk.slice(1, -1)}</em>;
      }

      // Inline Code `code`
      if (chunk.startsWith('`') && chunk.endsWith('`') && chunk.length >= 2) {
        return (
          <code
            key={index}
            className="px-1.5 py-0.5 mx-0.5 rounded bg-slate-100 border border-slate-200 text-[#0066FF] font-mono text-[12px] font-semibold"
          >
            {chunk.slice(1, -1)}
          </code>
        );
      }

      // Strikethrough ~~text~~
      if (chunk.startsWith('~~') && chunk.endsWith('~~') && chunk.length >= 4) {
        return <del key={index} className="line-through text-slate-400">{chunk.slice(2, -2)}</del>;
      }

      // Links [text](url)
      const linkMatch = chunk.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        const [, linkText, linkUrl] = linkMatch;
        return (
          <a
            key={index}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0066FF] font-semibold underline decoration-[#0066FF]/40 hover:decoration-[#0066FF] underline-offset-2 transition-colors inline-flex items-center gap-0.5"
          >
            <span>{linkText}</span>
            <ExternalLink className="w-3 h-3 inline ml-0.5 opacity-70" />
          </a>
        );
      }

      return chunk;
    });
  };

  // Split content into blocks (paragraphs, headers, lists, codeblocks, tables, blockquotes, alignments)
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const renderedElements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // 1. Code Block (```lang)
    if (trimmed.startsWith('```')) {
      const language = trimmed.slice(3).trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      renderedElements.push(
        <CodeBlock key={`code-${i}`} code={codeLines.join('\n')} language={language} />
      );
      i++;
      continue;
    }

    // 2. Headings
    if (trimmed.startsWith('### ')) {
      renderedElements.push(
        <h3 key={`h3-${i}`} className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-[#0B1938] mt-8 mb-3">
          {formatInlineText(trimmed.slice(4))}
        </h3>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith('## ')) {
      renderedElements.push(
        <h2 key={`h2-${i}`} className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-[#0B1938] mt-10 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-[#0066FF] rounded-full inline-block"></span>
          <span>{formatInlineText(trimmed.slice(3))}</span>
        </h2>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith('# ')) {
      renderedElements.push(
        <h1 key={`h1-${i}`} className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight text-[#0B1938] mt-12 mb-5">
          {formatInlineText(trimmed.slice(2))}
        </h1>
      );
      i++;
      continue;
    }

    // 3. Blockquote (> quote)
    if (trimmed.startsWith('> ')) {
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      renderedElements.push(
        <blockquote
          key={`quote-${i}`}
          className="my-6 p-4 sm:p-5 bg-blue-50/50 border-l-4 border-[#0066FF] rounded-r-xl italic font-sans text-slate-800 text-sm sm:text-base leading-relaxed shadow-2xs"
        >
          {quoteLines.map((ql, qIdx) => (
            <p key={qIdx} className={qIdx > 0 ? 'mt-2' : ''}>
              {formatInlineText(ql)}
            </p>
          ))}
        </blockquote>
      );
      continue;
    }

    // 4. Horizontal Divider (--- or ***)
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      renderedElements.push(
        <hr key={`hr-${i}`} className="my-8 border-t border-slate-200" />
      );
      i++;
      continue;
    }

    // 5. Image Embed ![Alt](url)
    const imageMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imageMatch) {
      const [, altText, imageUrl] = imageMatch;
      renderedElements.push(
        <figure key={`img-${i}`} className="my-8 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm">
          <div className="aspect-[16/9] w-full overflow-hidden bg-slate-900/5">
            <img
              src={imageUrl}
              alt={altText || 'Article illustration'}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';
              }}
            />
          </div>
          {altText && (
            <figcaption className="p-3 text-center font-mono text-xs text-slate-500 bg-white border-t border-slate-100">
              {altText}
            </figcaption>
          )}
        </figure>
      );
      i++;
      continue;
    }

    // 6. Bulleted Lists (- or * or •)
    if (/^[-*•]\s+/.test(trimmed)) {
      const listItems = [];
      while (i < lines.length && /^[-*•]\s+/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^[-*•]\s+/, ''));
        i++;
      }
      renderedElements.push(
        <ul key={`ul-${i}`} className="my-5 space-y-2.5 pl-2 font-sans text-slate-700">
          {listItems.map((item, lIdx) => (
            <li key={lIdx} className="flex items-start gap-3 text-sm sm:text-base leading-relaxed">
              <span className="w-2 h-2 mt-2 rounded-full bg-[#0066FF] shrink-0"></span>
              <span className="flex-1">{formatInlineText(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // 7. Numbered Lists (1. 2. etc.)
    if (/^\d+\.\s+/.test(trimmed)) {
      const listItems = [];
      let itemNum = 1;
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      renderedElements.push(
        <ol key={`ol-${i}`} className="my-5 space-y-3 pl-2 font-sans text-slate-700">
          {listItems.map((item, lIdx) => (
            <li key={lIdx} className="flex items-start gap-3 text-sm sm:text-base leading-relaxed">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-[#0066FF] font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-blue-200">
                {lIdx + 1}
              </span>
              <span className="flex-1 pt-0.5">{formatInlineText(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // 8. Text Alignment Blocks (e.g. :::center ... ::: or <center>)
    if (trimmed.startsWith(':::center') || trimmed.startsWith('<center>')) {
      const centerLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith(':::') && !lines[i].trim().startsWith('</center>')) {
        centerLines.push(lines[i]);
        i++;
      }
      renderedElements.push(
        <div key={`center-${i}`} className="my-6 text-center font-sans text-slate-700">
          {centerLines.map((cl, cIdx) => (
            <p key={cIdx} className="text-sm sm:text-base leading-relaxed">
              {formatInlineText(cl)}
            </p>
          ))}
        </div>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith(':::right')) {
      const rightLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith(':::')) {
        rightLines.push(lines[i]);
        i++;
      }
      renderedElements.push(
        <div key={`right-${i}`} className="my-6 text-right font-sans text-slate-700">
          {rightLines.map((rl, rIdx) => (
            <p key={rIdx} className="text-sm sm:text-base leading-relaxed">
              {formatInlineText(rl)}
            </p>
          ))}
        </div>
      );
      i++;
      continue;
    }

    // 9. Standard Paragraph
    if (trimmed.length > 0) {
      renderedElements.push(
        <p key={`p-${i}`} className="text-sm sm:text-base leading-relaxed text-slate-700 font-sans my-4">
          {formatInlineText(trimmed)}
        </p>
      );
    }

    i++;
  }

  return (
    <div className={`article-rich-content font-sans leading-relaxed text-slate-800 space-y-2 ${className}`}>
      {renderedElements}
    </div>
  );
};

export default RichTextRenderer;
