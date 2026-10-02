import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Robust, secure, and beautiful RichTextRenderer for Articles & Case Studies
 * Supports Markdown Headings, Lists, Code blocks with copy,
 * Blockquotes, Markdown Tables, HTML <table>, Images, Links, Text Alignment.
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

    // If text contains HTML tags (e.g., <strong>, <em>, <a href="...">)
    if (/<[a-z][\s\S]*>/i.test(text)) {
      return <span dangerouslySetInnerHTML={{ __html: text }} />;
    }

    const inlineRegex = /(\*\*.*?\*\*|\*.*?\*|`.*?`|~~.*?~~|\[.*?\]\(.*?\))/g;
    const splitParts = text.split(inlineRegex);

    return splitParts.map((chunk, index) => {
      if (!chunk) return null;

      // Bold **text**
      if (chunk.startsWith('**') && chunk.endsWith('**') && chunk.length >= 4) {
        return <strong key={index} className="font-bold text-white">{chunk.slice(2, -2)}</strong>;
      }

      // Italic *text*
      if (chunk.startsWith('*') && chunk.endsWith('*') && chunk.length >= 2) {
        return <em key={index} className="italic text-slate-300">{chunk.slice(1, -1)}</em>;
      }

      // Inline Code `code`
      if (chunk.startsWith('`') && chunk.endsWith('`') && chunk.length >= 2) {
        return (
          <code
            key={index}
            className="px-1.5 py-0.5 mx-0.5 rounded bg-[#070E1C] border border-slate-800 text-[#00F0FF] font-mono text-[12px] font-semibold"
          >
            {chunk.slice(1, -1)}
          </code>
        );
      }

      // Strikethrough ~~text~~
      if (chunk.startsWith('~~') && chunk.endsWith('~~') && chunk.length >= 4) {
        return <del key={index} className="line-through text-slate-500">{chunk.slice(2, -2)}</del>;
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
            className="text-[#00F0FF] font-semibold underline decoration-[#00F0FF]/40 hover:decoration-[#00F0FF] underline-offset-2 transition-colors inline-flex items-center gap-0.5"
          >
            <span>{linkText}</span>
            <ExternalLink className="w-3 h-3 inline ml-0.5 opacity-70" />
          </a>
        );
      }

      return chunk;
    });
  };

  // Helper to test if a line is a Markdown table row
  const isTableRow = (line) => {
    const t = line.trim();
    return t.startsWith('|') && t.endsWith('|') && t.split('|').length >= 3;
  };

  // Helper to test if a line is a Markdown table separator (| --- | :---: | ---: |)
  const isTableSeparator = (line) => {
    const t = line.trim();
    if (!isTableRow(t)) return false;
    const cells = t.split('|').slice(1, -1);
    return cells.every(c => /^[\s:-]+$/.test(c.trim()) && c.includes('-'));
  };

  // Helper to parse alignment from table separator
  const parseAlignments = (sepLine) => {
    const cells = sepLine.trim().split('|').slice(1, -1);
    return cells.map(c => {
      const s = c.trim();
      if (s.startsWith(':') && s.endsWith(':')) return 'center';
      if (s.endsWith(':')) return 'right';
      return 'left';
    });
  };

  // Split content into blocks
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const renderedElements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines
    if (!trimmed) {
      i++;
      continue;
    }

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

    // 2. HTML <table> Block Support (Multi-line or single-line <table>)
    if (/<table[\s>]/i.test(trimmed)) {
      const tableLines = [];
      while (i < lines.length) {
        tableLines.push(lines[i]);
        if (/<\/table>/i.test(lines[i])) {
          i++;
          break;
        }
        i++;
      }
      const tableHtml = tableLines.join('\n');
      renderedElements.push(
        <div key={`html-table-${i}`} className="overflow-x-auto my-6 rounded-xl border border-slate-800 bg-[#0B1528] shadow-xs">
          <div dangerouslySetInnerHTML={{ __html: tableHtml }} />
        </div>
      );
      continue;
    }

    // 3. Markdown Table Support (| col 1 | col 2 |)
    if (isTableRow(trimmed) && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      const headerLine = trimmed;
      const sepLine = lines[i + 1];
      const alignments = parseAlignments(sepLine);
      const headers = headerLine.split('|').slice(1, -1).map(h => h.trim());

      i += 2; // skip header and separator
      const dataRows = [];

      while (i < lines.length && isTableRow(lines[i])) {
        const rowCells = lines[i].split('|').slice(1, -1).map(c => c.trim());
        dataRows.push(rowCells);
        i++;
      }

      renderedElements.push(
        <div key={`md-table-${i}`} className="overflow-x-auto my-6 rounded-xl border border-slate-800 shadow-xs bg-[#0B1528]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#070E1C] border-b border-slate-800">
                {headers.map((h, hIdx) => {
                  const align = alignments[hIdx] || 'left';
                  return (
                    <th
                      key={hIdx}
                      className={`px-4 py-3 text-xs font-bold uppercase tracking-wider text-white font-display border-r last:border-r-0 border-slate-800 text-${align}`}
                    >
                      {formatInlineText(h)}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {dataRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-800/30 transition-colors">
                  {row.map((cell, cIdx) => {
                    const align = alignments[cIdx] || 'left';
                    return (
                      <td
                        key={cIdx}
                        className={`px-4 py-3 text-sm text-slate-300 border-r last:border-r-0 border-slate-800 text-${align}`}
                      >
                        {formatInlineText(cell)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // 4. Headings
    if (trimmed.startsWith('### ')) {
      renderedElements.push(
        <h3 key={`h3-${i}`} className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-white mt-8 mb-3">
          {formatInlineText(trimmed.slice(4))}
        </h3>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith('## ')) {
      renderedElements.push(
        <h2 key={`h2-${i}`} className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-white mt-10 mb-4 pb-2 border-b border-slate-800 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-[#00F0FF] rounded-full inline-block"></span>
          <span>{formatInlineText(trimmed.slice(3))}</span>
        </h2>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith('# ')) {
      renderedElements.push(
        <h1 key={`h1-${i}`} className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight text-white mt-12 mb-5">
          {formatInlineText(trimmed.slice(2))}
        </h1>
      );
      i++;
      continue;
    }

    // 5. Blockquote (> quote)
    if (trimmed.startsWith('> ')) {
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      renderedElements.push(
        <blockquote
          key={`quote-${i}`}
          className="my-6 p-4 sm:p-5 bg-[#0B1528] border-l-4 border-[#00F0FF] rounded-r-xl italic font-sans text-slate-200 text-sm sm:text-base leading-relaxed shadow-lg border-y border-r border-slate-800/60"
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

    // 6. Horizontal Divider (--- or ***)
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      renderedElements.push(
        <hr key={`hr-${i}`} className="my-8 border-t border-slate-800" />
      );
      i++;
      continue;
    }

    // 7. Image Embed ![Alt](url)
    const imageMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imageMatch) {
      const [, altText, imageUrl] = imageMatch;
      renderedElements.push(
        <figure key={`img-${i}`} className="my-8 rounded-2xl overflow-hidden border border-slate-800 bg-[#0B1528] shadow-sm">
          <div className="aspect-[16/9] w-full overflow-hidden bg-slate-950">
            <img
              src={imageUrl}
              alt={altText ? altText : 'Article visual graphic'}
              loading="lazy"
              decoding="async"
              width="1200"
              height="675"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';
              }}
            />
          </div>
          {altText && (
            <figcaption className="p-3 text-center font-mono text-xs text-slate-400 bg-[#070E1C] border-t border-slate-800">
              {altText}
            </figcaption>
          )}
        </figure>
      );
      i++;
      continue;
    }

    // 8. Bulleted Lists (- or * or •)
    if (/^[-*•]\s+/.test(trimmed)) {
      const listItems = [];
      while (i < lines.length && /^[-*•]\s+/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^[-*•]\s+/, ''));
        i++;
      }
      renderedElements.push(
        <ul key={`ul-${i}`} className="my-5 space-y-2.5 pl-2 font-sans text-slate-300">
          {listItems.map((item, lIdx) => (
            <li key={lIdx} className="flex items-start gap-3 text-sm sm:text-base leading-relaxed">
              <span className="w-2 h-2 mt-2 rounded-full bg-[#00F0FF] shrink-0"></span>
              <span className="flex-1">{formatInlineText(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // 9. Numbered Lists (1. 2. etc.)
    if (/^\d+\.\s+/.test(trimmed)) {
      const listItems = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      renderedElements.push(
        <ol key={`ol-${i}`} className="my-5 space-y-3 pl-2 font-sans text-slate-300">
          {listItems.map((item, lIdx) => (
            <li key={lIdx} className="flex items-start gap-3 text-sm sm:text-base leading-relaxed">
              <span className="w-6 h-6 rounded-full bg-[#0066FF]/20 text-[#00F0FF] font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-[#00F0FF]/30">
                {lIdx + 1}
              </span>
              <span className="flex-1 pt-0.5">{formatInlineText(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // 10. Text Alignment Blocks (e.g. :::center ... ::: or <center>)
    if (trimmed.startsWith(':::center') || trimmed.startsWith('<center>')) {
      const centerLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith(':::') && !lines[i].trim().startsWith('</center>')) {
        centerLines.push(lines[i]);
        i++;
      }
      renderedElements.push(
        <div key={`center-${i}`} className="my-6 text-center font-sans text-slate-300">
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
        <div key={`right-${i}`} className="my-6 text-right font-sans text-slate-300">
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

    // 11. Multi-line HTML Elements (e.g. <div>, <section>, <p>, etc.)
    if (/^<[a-z][\s\S]*>/i.test(trimmed) && !trimmed.startsWith('<span')) {
      renderedElements.push(
        <div key={`html-block-${i}`} className="my-4" dangerouslySetInnerHTML={{ __html: trimmed }} />
      );
      i++;
      continue;
    }

    // 12. Standard Paragraph
    if (trimmed.length > 0) {
      renderedElements.push(
        <p key={`p-${i}`} className="text-sm sm:text-base leading-relaxed text-slate-300 font-sans my-4">
          {formatInlineText(trimmed)}
        </p>
      );
    }

    i++;
  }

  return (
    <div className={`article-rich-content font-sans leading-relaxed text-slate-300 space-y-2 ${className}`}>
      {renderedElements}
    </div>
  );
};

export default RichTextRenderer;
