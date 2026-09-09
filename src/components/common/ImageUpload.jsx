import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Link as LinkIcon, X, Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useUploadMediaMutation } from '../../services/api';
import Button from './Button';

export const ImageUpload = ({
  value,
  onChange,
  label = "Image",
  helperText = "Upload high-resolution PNG, JPG, WebP, or SVG (Max 10MB)",
  aspectRatio = "video", // "video" (16:9), "square" (1:1), "avatar" (circle/square)
  className = ""
}) => {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'url'
  const [urlInput, setUrlInput] = useState(value || '');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const [uploadMedia, { isLoading: isUploading }] = useUploadMediaMutation();

  const handleFileChange = async (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("Invalid file format. Please upload an image file (PNG, JPG, WebP, SVG).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size exceeds 10MB limit.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await uploadMedia(formData).unwrap();
      const uploadedUrl = response?.url || response?.data?.url || response?.secure_url;

      if (uploadedUrl) {
        onChange(uploadedUrl);
        setUrlInput(uploadedUrl);
        toast.success("Image uploaded successfully!");
      } else {
        // Local preview fallback if backend didn't return url
        const reader = new FileReader();
        reader.onload = (e) => {
          onChange(e.target.result);
          setUrlInput(e.target.result);
        };
        reader.readAsDataURL(file);
        toast.success("Image attached successfully!");
      }
    } catch (err) {
      // Graceful local preview fallback
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange(e.target.result);
        setUrlInput(e.target.result);
      };
      reader.readAsDataURL(file);
      toast.info("Image loaded (Preview mode)");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleUrlApply = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      toast.success("Image URL applied!");
    }
  };

  const handleRemove = () => {
    onChange('');
    setUrlInput('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-700 font-bold">
          {label}
        </label>
        
        {/* Toggle Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[10px] font-mono font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
              activeTab === 'upload'
                ? 'bg-white text-[#0066FF] shadow-2xs font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
              activeTab === 'url'
                ? 'bg-white text-[#0066FF] shadow-2xs font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Paste URL
          </button>
        </div>
      </div>

      {/* Preview Section If Image Exists */}
      {value ? (
        <div className="relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50 p-2 group shadow-2xs">
          <div className={`w-full overflow-hidden rounded-lg bg-slate-900/5 flex items-center justify-center ${
            aspectRatio === 'square' ? 'aspect-square max-h-48' : aspectRatio === 'avatar' ? 'w-24 h-24 mx-auto rounded-full' : 'aspect-video max-h-52'
          }`}>
            <img
              src={value}
              alt="Uploaded Preview"
              className={`w-full h-full object-cover transition-transform group-hover:scale-105 ${aspectRatio === 'avatar' ? 'rounded-full' : 'rounded-lg'}`}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80';
              }}
            />
          </div>

          <div className="flex items-center justify-between pt-2 px-1">
            <span className="font-mono text-[10px] text-slate-500 truncate max-w-[260px]">
              {value.startsWith('data:') ? 'Local file attached' : value}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-md font-mono text-[10px] font-bold transition-all cursor-pointer shadow-2xs"
              >
                Change
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="p-1 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-md transition-colors cursor-pointer"
                title="Remove image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Upload Area */
        <div>
          {activeTab === 'upload' ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                isDragging
                  ? 'border-[#0066FF] bg-blue-50/50 scale-[1.01]'
                  : 'border-slate-300 hover:border-[#0066FF] bg-[#F8FAFC] hover:bg-blue-50/20'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/webp, image/svg+xml"
                onChange={(e) => handleFileChange(e.target.files?.[0])}
                className="hidden"
              />

              {isUploading ? (
                <div className="py-3 flex flex-col items-center gap-2">
                  <Loader2 className="w-6 h-6 text-[#0066FF] animate-spin" />
                  <span className="font-mono text-xs text-slate-600 font-bold">Uploading to Cloudinary...</span>
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0066FF]">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-sans text-xs font-bold text-[#0B1938] block">
                      Click to upload <span className="font-normal text-slate-500">or drag and drop</span>
                    </span>
                    <span className="font-mono text-[10px] text-slate-400 block mt-0.5">
                      {helperText}
                    </span>
                  </div>
                </>
              )}
            </div>
          ) : (
            /* URL Input Tab */
            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/... or Cloudinary URL"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="w-full bg-white border border-slate-300 pl-8 pr-3 py-2 text-xs text-[#0B1938] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-mono font-medium"
                  />
                  <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={handleUrlApply}
                  rightIcon={<Check className="w-3.5 h-3.5" />}
                >
                  Set
                </Button>
              </div>
              <p className="font-mono text-[10px] text-slate-400">
                Paste any publicly accessible image URL from Unsplash, Cloudinary, or AWS S3.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
