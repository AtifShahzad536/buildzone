import React, { useState, useRef } from 'react';
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Eye,
  Columns2,
  Edit3,
  Terminal,
  Minus,
  Table,
  UploadCloud,
  Check,
  X,
  HelpCircle
} from 'lucide-react';
import { toast } from 'sonner';
import RichTextRenderer from './RichTextRenderer';
import { useUploadMediaMutation } from '../../services/api';

export const RichTextEditor = ({
  value = '',
  onChange,
  label = "Article Content (Rich Editor)",
  placeholder = "Write your comprehensive engineering article, architecture deep dive, or case breakdown...",
  minHeight = "420px",
  className = ""
}) => {
  const [viewMode, setViewMode] = useState('split'); // 'edit' | 'split' | 'preview'
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  // Link & Image Dialog states
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [imageCaption, setImageCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [uploadMedia, { isLoading: isUploadingMedia }] = useUploadMediaMutation();

  // Helper to insert markdown tags at current selection
  const insertFormatting = (before, after = '', defaultText = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || defaultText;

    const replacement = `${before}${selectedText}${after}`;
    const newContent = value.substring(0, start) + replacement + value.substring(end);

    onChange(newContent);

    // Reposition cursor
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 10);
  };

  // Keyboard Shortcuts Handler
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      insertFormatting('**', '**', 'bold text');
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
      e.preventDefault();
      insertFormatting('*', '*', 'italic text');
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      setIsLinkDialogOpen(true);
    }
  };

  // Link Insertion
  const handleApplyLink = () => {
    if (!linkUrl) {
      toast.error("Please enter a destination URL");
      return;
    }
    const text = linkText.trim() || linkUrl;
    insertFormatting(`[${text}](${linkUrl})`);
    setIsLinkDialogOpen(false);
    setLinkText('');
    setLinkUrl('');
    toast.success("Link inserted!");
  };

  // Image Insertion
  const handleApplyImage = () => {
    if (!imageUrl) {
      toast.error("Please provide an image URL or upload a file");
      return;
    }
    const caption = imageCaption.trim() || 'Article Illustration';
    insertFormatting(`\n![${caption}](${imageUrl})\n`);
    setIsImageDialogOpen(false);
    setImageCaption('');
    setImageUrl('');
    toast.success("Image embedded!");
  };

  // Image File Direct Upload to Cloudinary
  const handleDirectImageUpload = async (file) => {
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await uploadMedia(formData).unwrap();
      const uploadedUrl = res?.url || res?.data?.url || res?.secure_url;

      if (uploadedUrl) {
        setImageUrl(uploadedUrl);
        toast.success("Image uploaded to Cloudinary!");
      } else {
        const reader = new FileReader();
        reader.onload = (e) => setImageUrl(e.target.result);
        reader.readAsDataURL(file);
      }
    } catch (e) {
      const reader = new FileReader();
      reader.onload = (e) => setImageUrl(e.target.result);
      reader.readAsDataURL(file);
      toast.info("Image preview ready");
    }
  };

  // Insert Table Template
  const handleInsertTable = () => {
    const tableTemplate = `\n| Architecture Layer | Technology | SLA Target |\n|---|---|---|\n| Edge Gateway | Cloudflare CDN | 99.99% |\n| API Services | Go / Node.js | < 45ms |\n| Storage Layer | PostgreSQL & Redis | Multi-AZ |\n\n`;
    insertFormatting(tableTemplate);
  };

  // Word count & reading time
  const words = value ? value.trim().split(/\s+/).filter(Boolean).length : 0;
  const readingTime = Math.ceil(words / 200) || 1;

  return (
    <div className={`space-y-2 font-sans ${className}`}>
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 font-bold">
          {label}
        </label>

        {/* View Mode Buttons */}
        <div className="flex items-center gap-1 bg-[#070E1C] p-1 rounded-lg border border-slate-800 font-mono text-[11px] font-bold">
          <button
            type="button"
            onClick={() => setViewMode('edit')}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'edit'
                ? 'bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-white shadow-sm font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Full Editor View"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editor</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('split')}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'split'
                ? 'bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-white shadow-sm font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Side-by-Side Editor & Live Preview"
          >
            <Columns2 className="w-3.5 h-3.5" />
            <span>Split View</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('preview')}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'preview'
                ? 'bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-white shadow-sm font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Accurate Public View"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Public Preview</span>
          </button>
        </div>
      </div>

      {/* Editor Box */}
      <div className="border border-slate-800 rounded-2xl overflow-hidden bg-[#0B1528] shadow-xl focus-within:border-[#00F0FF] transition-all">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-2 bg-[#070E1C] border-b border-slate-800 text-slate-300 select-none">
          {/* Headings */}
          <div className="flex items-center gap-0.5 border-r border-slate-700/80 pr-1.5 mr-1">
            <button
              type="button"
              onClick={() => insertFormatting('## ', '\n', 'Main Section Heading')}
              className="p-1.5 hover:bg-[#0B1528] hover:text-[#00F0FF] rounded-lg transition-colors cursor-pointer text-xs font-bold font-mono"
              title="Heading 2 (##)"
            >
              H2
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('### ', '\n', 'Sub-Section Heading')}
              className="p-1.5 hover:bg-[#0B1528] hover:text-[#00F0FF] rounded-lg transition-colors cursor-pointer text-xs font-bold font-mono"
              title="Heading 3 (###)"
            >
              H3
            </button>
          </div>

          {/* Text Styles */}
          <div className="flex items-center gap-0.5 border-r border-slate-700/80 pr-1.5 mr-1">
            <button
              type="button"
              onClick={() => insertFormatting('**', '**', 'bold text')}
              className="p-1.5 hover:bg-[#0B1528] hover:text-[#00F0FF] rounded-lg transition-colors cursor-pointer"
              title="Bold (Ctrl+B)"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('*', '*', 'italic text')}
              className="p-1.5 hover:bg-[#0B1528] hover:text-[#00F0FF] rounded-lg transition-colors cursor-pointer"
              title="Italic (Ctrl+I)"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('~~', '~~', 'strikethrough')}
              className="p-1.5 hover:bg-[#0B1528] hover:text-[#00F0FF] rounded-lg transition-colors cursor-pointer"
              title="Strikethrough"
            >
              <Strikethrough className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('`', '`', 'const variable = true;')}
              className="p-1.5 hover:bg-[#0B1528] hover:text-[#00F0FF] rounded-lg transition-colors cursor-pointer"
              title="Inline Code"
            >
              <Code className="w-4 h-4" />
            </button>
          </div>

          {/* Alignment */}
          <div className="flex items-center gap-0.5 border-r border-slate-700/80 pr-1.5 mr-1">
            <button
              type="button"
              onClick={() => insertFormatting('', '', '')}
              className="p-1.5 hover:bg-[#0B1528] hover:text-[#00F0FF] rounded-lg transition-colors cursor-pointer"
              title="Align Left (Default)"
            >
              <AlignLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('\n:::center\n', '\n:::\n', 'Centered paragraph or statement')}
              className="p-1.5 hover:bg-[#0B1528] hover:text-[#00F0FF] rounded-lg transition-colors cursor-pointer"
              title="Align Center (:::center)"
            >
              <AlignCenter className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('\n:::right\n', '\n:::\n', 'Right-aligned text or signature')}
              className="p-1.5 hover:bg-[#0B1528] hover:text-[#00F0FF] rounded-lg transition-colors cursor-pointer"
              title="Align Right (:::right)"
            >
              <AlignRight className="w-4 h-4" />
            </button>
          </div>

          {/* Lists & Quotes */}
          <div className="flex items-center gap-0.5 border-r border-slate-700/80 pr-1.5 mr-1">
            <button
              type="button"
              onClick={() => insertFormatting('- ', '\n- Next point\n- Key advantage', 'Feature item')}
              className="p-1.5 hover:bg-[#0B1528] hover:text-[#00F0FF] rounded-lg transition-colors cursor-pointer"
              title="Bulleted List"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('1. ', '\n2. Next step\n3. Final result', 'First step')}
              className="p-1.5 hover:bg-[#0B1528] hover:text-[#00F0FF] rounded-lg transition-colors cursor-pointer"
              title="Numbered List"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('> ', '\n', 'Engineering quote or critical executive highlight')}
              className="p-1.5 hover:bg-[#0B1528] hover:text-[#00F0FF] rounded-lg transition-colors cursor-pointer"
              title="Blockquote"
            >
              <Quote className="w-4 h-4" />
            </button>
          </div>

          {/* Code Block & Table & Divider */}
          <div className="flex items-center gap-0.5 border-r border-slate-700/80 pr-1.5 mr-1">
            <button
              type="button"
              onClick={() => insertFormatting('\n```javascript\n// Production implementation\nfunction scaleSystem() {\n  return "Optimized";\n}\n', '\n```\n', '')}
              className="p-1.5 hover:bg-[#0B1528] hover:text-[#00F0FF] rounded-lg transition-colors cursor-pointer"
              title="Code Block with Syntax Highlighting"
            >
              <Terminal className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleInsertTable}
              className="p-1.5 hover:bg-[#0B1528] hover:text-[#00F0FF] rounded-lg transition-colors cursor-pointer"
              title="Insert Markdown Table"
            >
              <Table className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('\n---\n\n', '', '')}
              className="p-1.5 hover:bg-[#0B1528] hover:text-[#00F0FF] rounded-lg transition-colors cursor-pointer"
              title="Horizontal Divider"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>

          {/* Links & Images */}
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={() => setIsLinkDialogOpen(true)}
              className="p-1.5 hover:bg-[#0B1528] hover:text-[#00F0FF] rounded-lg transition-colors cursor-pointer"
              title="Insert Link (Ctrl+K)"
            >
              <LinkIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsImageDialogOpen(true)}
              className="p-1.5 hover:bg-[#0B1528] hover:text-[#00F0FF] rounded-lg transition-colors cursor-pointer flex items-center gap-1 font-mono text-xs font-bold text-[#00F0FF]"
              title="Embed Illustration / Screenshot"
            >
              <ImageIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Add Image</span>
            </button>
          </div>
        </div>

        {/* Editor Body */}
        <div className="relative">
          {viewMode === 'edit' && (
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              style={{ minHeight }}
              className="w-full p-4 text-sm text-slate-100 placeholder-slate-500 bg-[#0B1528] font-sans leading-relaxed focus:outline-none resize-y"
            />
          )}

          {viewMode === 'split' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800" style={{ minHeight }}>
              <div className="p-0">
                <textarea
                  ref={textareaRef}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholder}
                  style={{ minHeight }}
                  className="w-full h-full p-4 text-sm text-slate-100 placeholder-slate-500 bg-[#0B1528] font-sans leading-relaxed focus:outline-none resize-none"
                />
              </div>

              <div className="p-6 bg-[#060B18] overflow-y-auto max-h-[600px] scrollbar-thin">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                  <span className="font-mono text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Live Public Rendering (Exact Output)
                  </span>
                  <span className="px-2 py-0.5 bg-[#0066FF]/20 text-[#00F0FF] border border-[#00F0FF]/30 text-[10px] font-mono font-bold rounded-md">
                    WYSIWYG Synchronized
                  </span>
                </div>
                {value ? (
                  <RichTextRenderer content={value} />
                ) : (
                  <div className="py-12 text-center text-slate-500 italic text-xs font-mono">
                    Type in the editor on the left to see live formatted typography, bullet points, headers, and code blocks here.
                  </div>
                )}
              </div>
            </div>
          )}

          {viewMode === 'preview' && (
            <div className="p-8 sm:p-12 bg-[#060B18] overflow-y-auto" style={{ minHeight }}>
              <div className="max-w-3xl mx-auto">
                <div className="p-4 mb-8 bg-[#0B1528] border border-slate-800 rounded-xl flex items-center justify-between">
                  <span className="font-mono text-xs text-[#00F0FF] font-bold">
                    PREVIEW MODE: This matches exactly how website visitors will view your article.
                  </span>
                  <button
                    type="button"
                    onClick={() => setViewMode('edit')}
                    className="px-3 py-1 bg-[#070E1C] border border-slate-700 text-[#00F0FF] rounded-lg font-mono text-xs font-bold hover:bg-[#0B1528] transition-colors cursor-pointer"
                  >
                    Back to Edit
                  </button>
                </div>
                {value ? (
                  <RichTextRenderer content={value} />
                ) : (
                  <p className="text-slate-500 italic text-center py-8">Article is currently empty.</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Status Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#070E1C] border-t border-slate-800 font-mono text-[10px] text-slate-400">
          <div className="flex items-center gap-4">
            <span><strong className="text-white">{words}</strong> words</span>
            <span>~<strong className="text-white">{readingTime}</strong> min read</span>
            <span className="hidden sm:inline text-slate-500">Ctrl+B = Bold • Ctrl+I = Italic • Ctrl+K = Link</span>
          </div>
          <span className="text-[#00F0FF] font-semibold">
            Markdown & HTML Supported
          </span>
        </div>
      </div>

      {/* Insert Link Dialog Modal */}
      {isLinkDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0B1528] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h4 className="font-display text-base font-bold uppercase text-white">Insert Hyperlink</h4>
              <button
                type="button"
                onClick={() => setIsLinkDialogOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 font-sans text-xs">
              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-300 font-bold mb-1">
                  Anchor Text (Label)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Read Architecture Whitepaper"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  className="w-full bg-[#070E1C] border border-slate-800 text-white placeholder-slate-500 px-3 py-2 text-xs rounded-lg focus:outline-none focus:border-[#00F0FF]"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-300 font-bold mb-1">
                  Destination URL *
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/docs"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full bg-[#070E1C] border border-slate-800 text-white placeholder-slate-500 px-3 py-2 text-xs rounded-lg focus:outline-none focus:border-[#00F0FF] font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsLinkDialogOpen(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg cursor-pointer font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyLink}
                className="px-4 py-1.5 text-xs bg-gradient-to-r from-[#0066FF] to-[#00D4FF] hover:opacity-90 text-white rounded-lg cursor-pointer font-bold shadow-md shadow-blue-500/20"
              >
                Insert Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Insert Image Dialog Modal */}
      {isImageDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#0B1528] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h4 className="font-display text-base font-bold uppercase text-white">Embed Article Image</h4>
              <button
                type="button"
                onClick={() => setIsImageDialogOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 font-sans text-xs">
              {/* Direct File Upload Option */}
              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-300 font-bold mb-1">
                  Upload Image File (Cloudinary CDN)
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-700 hover:border-[#00F0FF] bg-[#070E1C] rounded-xl p-4 text-center cursor-pointer transition-all flex flex-col items-center gap-1.5"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleDirectImageUpload(e.target.files?.[0])}
                    className="hidden"
                  />
                  <UploadCloud className="w-6 h-6 text-[#00F0FF]" />
                  <span className="font-sans text-xs font-bold text-white">
                    Click to browse or drop file
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">
                    PNG, JPG, WebP, SVG (Max 10MB)
                  </span>
                </div>
              </div>

              {/* Or Direct URL */}
              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-300 font-bold mb-1">
                  Or Direct Image URL *
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or Cloudinary URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-[#070E1C] border border-slate-800 text-white placeholder-slate-500 px-3 py-2 text-xs rounded-lg focus:outline-none focus:border-[#00F0FF] font-mono"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-300 font-bold mb-1">
                  Image Caption / Alt Text
                </label>
                <input
                  type="text"
                  placeholder="e.g. Distributed Cluster Architecture Diagram"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  className="w-full bg-[#070E1C] border border-slate-800 text-white placeholder-slate-500 px-3 py-2 text-xs rounded-lg focus:outline-none focus:border-[#00F0FF]"
                />
              </div>

              {imageUrl && (
                <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-800 bg-[#070E1C]">
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsImageDialogOpen(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg cursor-pointer font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyImage}
                className="px-4 py-1.5 text-xs bg-gradient-to-r from-[#0066FF] to-[#00D4FF] hover:opacity-90 text-white rounded-lg cursor-pointer font-bold shadow-md shadow-blue-500/20"
              >
                Embed Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
