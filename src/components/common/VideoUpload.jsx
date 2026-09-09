import React, { useState, useRef } from 'react';
import { UploadCloud, Film, Link as LinkIcon, X, Check, Loader2, Play, ExternalLink, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { useUploadMediaMutation } from '../../services/api';
import Button from './Button';

export const VideoUpload = ({
  value,
  onChange,
  label = "Hero Intro Video",
  helperText = "Paste a direct MP4/WebM video URL, YouTube link, or Vimeo URL for global instant streaming across all browsers.",
  className = ""
}) => {
  const [activeTab, setActiveTab] = useState('url'); // 'url' | 'upload'
  const [urlInput, setUrlInput] = useState(value || '');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const [uploadMedia, { isLoading: isUploading }] = useUploadMediaMutation();

  // Helper to format YouTube or Vimeo URLs into clean embed URLs
  const formatVideoUrl = (rawUrl) => {
    if (!rawUrl) return '';
    const trimmed = rawUrl.trim();

    // YouTube watch or short links
    const ytMatch = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=1&loop=1&playlist=${ytMatch[1]}&controls=0&showinfo=0`;
    }

    // Vimeo links
    const vimeoMatch = trimmed.match(/(?:vimeo\.com\/)(\d+)/);
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&loop=1&muted=1&background=1`;
    }

    return trimmed;
  };

  const isEmbedVideo = (url) => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('player.vimeo.com') || url.includes('vimeo.com');
  };

  const [optimizingStatus, setOptimizingStatus] = useState('');

  // Helper to optimize and compress video client-side to WebM < 4MB for instant Vercel upload
  const compressVideoInBrowser = async (file, onProgress) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      video.muted = true;
      video.playsInline = true;
      video.crossOrigin = 'anonymous';

      video.onloadedmetadata = async () => {
        try {
          const duration = video.duration || 5;
          // Target max file size = 3.2MB to safely stay under Vercel 4.5MB limit
          const targetBps = Math.min(2200000, Math.max(400000, Math.floor((3.2 * 8 * 1024 * 1024) / duration)));

          let width = video.videoWidth || 1280;
          let height = video.videoHeight || 720;
          const maxDim = 1280;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          width = width - (width % 2);
          height = height - (height % 2);

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');

          const stream = canvas.captureStream ? canvas.captureStream(30) : (video.captureStream ? video.captureStream(30) : null);
          
          if (!stream || typeof MediaRecorder === 'undefined') {
            URL.revokeObjectURL(video.src);
            return resolve(file);
          }

          let mimeType = 'video/webm;codecs=vp9';
          if (!MediaRecorder.isTypeSupported(mimeType)) mimeType = 'video/webm;codecs=vp8';
          if (!MediaRecorder.isTypeSupported(mimeType)) mimeType = 'video/webm';
          if (!MediaRecorder.isTypeSupported(mimeType)) mimeType = 'video/mp4';

          const recorder = new MediaRecorder(stream, {
            mimeType: MediaRecorder.isTypeSupported(mimeType) ? mimeType : undefined,
            videoBitsPerSecond: targetBps
          });

          const chunks = [];
          recorder.ondataavailable = (e) => {
            if (e.data && e.data.size > 0) chunks.push(e.data);
          };

          recorder.onstop = () => {
            const blob = new Blob(chunks, { type: mimeType.split(';')[0] || 'video/webm' });
            const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".webm", {
              type: blob.type
            });
            URL.revokeObjectURL(video.src);
            resolve(compressedFile);
          };

          recorder.start(100);

          let isRecording = true;
          const drawFrame = () => {
            if (!isRecording) return;
            if (video.paused || video.ended) {
              if (video.ended) {
                isRecording = false;
                recorder.stop();
                return;
              }
            }
            ctx.drawImage(video, 0, 0, width, height);
            if (duration > 0 && onProgress) {
              const pct = Math.min(95, Math.round((video.currentTime / duration) * 100));
              onProgress(pct);
            }
            requestAnimationFrame(drawFrame);
          };

          video.onended = () => {
            if (isRecording) {
              isRecording = false;
              recorder.stop();
            }
          };

          // 2x speed for ultra-fast browser compression
          video.playbackRate = 2.0;
          await video.play();
          drawFrame();
        } catch (err) {
          URL.revokeObjectURL(video.src);
          reject(err);
        }
      };

      video.onerror = (e) => {
        URL.revokeObjectURL(video.src);
        reject(e);
      };
    });
  };

  const handleFileChange = async (file) => {
    if (!file) return;

    const validVideoTypes = [
      'video/mp4',
      'video/webm',
      'video/ogg',
      'video/quicktime',
      'video/x-matroska',
      'video/x-msvideo',
      'image/webp',
      'image/gif'
    ];

    if (!validVideoTypes.includes(file.type) && !file.name.match(/\.(mp4|webm|mov|mkv|avi|ogg|m4v|webp|gif)$/i)) {
      toast.error("Invalid format. Please upload an MP4, WebM, WebP, MOV, or OGG file.");
      return;
    }

    let fileToUpload = file;
    const MAX_DIRECT_UPLOAD_BYTES = 4.2 * 1024 * 1024; // 4.2 MB

    // If file is larger than 4.2MB, optimize/compress in browser
    if (file.size > MAX_DIRECT_UPLOAD_BYTES) {
      const origSizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setOptimizingStatus(`Optimizing & compressing video from ${origSizeMB}MB...`);
      toast.info(`Optimizing & compressing video (${origSizeMB}MB)... Please wait a few seconds.`);

      try {
        fileToUpload = await compressVideoInBrowser(file, (pct) => {
          setUploadProgress(Math.round(pct * 0.6));
        });
        const newSizeMB = (fileToUpload.size / (1024 * 1024)).toFixed(1);
        console.log(`Video optimized: ${origSizeMB}MB -> ${newSizeMB}MB`);
        setOptimizingStatus(`Optimized to ${newSizeMB}MB! Uploading...`);
      } catch (compErr) {
        console.warn("Browser compression skipped or failed:", compErr);
      }
    }

    // Check if still above 4.5MB
    if (fileToUpload.size > 4.5 * 1024 * 1024) {
      setOptimizingStatus('');
      const finalMB = (fileToUpload.size / (1024 * 1024)).toFixed(1);
      toast.error(
        `Video size (${finalMB}MB) is too large for serverless. Please paste your video link in the 'Paste Video URL' tab.`,
        { duration: 7000 }
      );
      setActiveTab('url');
      return;
    }

    setUploadProgress(65);

    try {
      const formData = new FormData();
      formData.append('file', fileToUpload);
      formData.append('category', 'HeroVideo');

      setUploadProgress(85);
      const response = await uploadMedia(formData).unwrap();
      const uploadedUrl = response?.url || response?.data?.url || response?.secure_url;
      setUploadProgress(100);

      if (uploadedUrl && !uploadedUrl.startsWith('blob:')) {
        onChange(uploadedUrl);
        setUrlInput(uploadedUrl);
        toast.success("Video compressed & saved to server permanently!");
      } else {
        toast.error("Failed to get permanent video URL from server. Please try pasting a video link.");
      }
    } catch (err) {
      console.error("Video upload error:", err);
      if (err?.status === 413 || err?.data === 'Server Error') {
        toast.error("Video file is too large for Vercel serverless (4.5MB limit). Please use 'Paste Video URL' tab with a direct link or YouTube/Vimeo URL.", { duration: 7000 });
        setActiveTab('url');
      } else {
        toast.error("Server video upload failed: " + (err?.data?.message || err?.message || "Please paste a direct video URL or YouTube/Vimeo link"));
      }
    } finally {
      setOptimizingStatus('');
      setTimeout(() => setUploadProgress(0), 1000);
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
      const formatted = formatVideoUrl(urlInput);
      onChange(formatted);
      setUrlInput(formatted);
      toast.success("Video URL applied successfully!");
    }
  };

  const handleRemove = () => {
    onChange('');
    setUrlInput('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={`space-y-2.5 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-700 font-bold">
          {label}
        </label>
        
        {/* Toggle Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[10px] font-mono font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === 'upload'
                ? 'bg-white text-[#0066FF] shadow-2xs font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <UploadCloud className="w-3 h-3" />
            Upload Video File
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === 'url'
                ? 'bg-white text-[#0066FF] shadow-2xs font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            Paste Video URL
          </button>
        </div>
      </div>

      {/* Live Video Preview Section If Value Exists */}
      {value ? (
        <div className="relative border border-slate-200 rounded-2xl overflow-hidden bg-slate-900 p-2 group shadow-sm">
          <div className="w-full aspect-video rounded-xl overflow-hidden bg-black flex items-center justify-center relative">
            {isEmbedVideo(value) ? (
              <iframe
                src={value}
                title="Video Preview"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={value}
                controls
                preload="metadata"
                className="w-full h-full object-contain"
              >
                Your browser does not support the video tag.
              </video>
            )}

            {/* Source Badge */}
            <div className="absolute top-3 left-3 pointer-events-none">
              <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md text-white border border-white/20 text-[10px] font-mono font-bold rounded-md uppercase tracking-wider flex items-center gap-1.5">
                <Film className="w-3 h-3 text-[#0066FF]" />
                {value.includes('youtube') ? 'YouTube' : value.includes('vimeo') ? 'Vimeo' : value.includes('cloudinary') ? 'Cloudinary Video' : 'Active Video'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2.5 px-1.5 bg-slate-900 text-white rounded-b-xl">
            <div className="flex items-center gap-2 overflow-hidden mr-2">
              <Film className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
              <span className="font-mono text-[10px] text-slate-300 truncate max-w-[280px]">
                {value}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => {
                  if (fileInputRef.current) fileInputRef.current.click();
                }}
                className="px-2.5 py-1 text-[11px] font-mono font-medium text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                title="Replace Video"
              >
                <RefreshCw className="w-3 h-3" />
                Replace
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="p-1 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                title="Remove Video"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Upload Dropzone Tab */}
      {activeTab === 'upload' && !value && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-[#0066FF] bg-blue-50/60 scale-[0.99]'
              : 'border-slate-300 hover:border-[#0066FF] bg-slate-50/70 hover:bg-blue-50/20'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/webm,video/ogg,video/quicktime,video/x-matroska,image/webp,image/gif,.mp4,.webm,.mov,.mkv,.webp,.gif"
            onChange={(e) => handleFileChange(e.target.files?.[0])}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center space-y-2.5">
            <div className="w-12 h-12 rounded-xl bg-blue-100/80 text-[#0066FF] flex items-center justify-center shadow-xs">
              {isUploading || optimizingStatus ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <UploadCloud className="w-6 h-6" />
              )}
            </div>

            <div className="space-y-1">
              <p className="font-display text-xs font-bold text-[#0B1938]">
                {optimizingStatus ? optimizingStatus : isUploading ? "Uploading video..." : "Click or drag & drop to upload video"}
              </p>
              <p className="font-mono text-[10px] text-slate-500">
                Auto-Optimizes MP4 / WebM / WebP (Files over 4.5MB will be compressed automatically)
              </p>
            </div>

            {uploadProgress > 0 && (
              <div className="w-full max-w-xs bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-[#0066FF] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* URL Input Tab */}
      {activeTab === 'url' && !value && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <LinkIcon className="w-3.5 h-3.5" />
              </div>
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Paste YouTube, Vimeo, or direct .mp4 link..."
                className="w-full bg-white border border-slate-300 pl-9 pr-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-mono font-medium"
              />
            </div>
            <button
              type="button"
              onClick={handleUrlApply}
              className="px-4 py-2 bg-[#0066FF] hover:bg-blue-600 text-white font-mono text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs shrink-0"
            >
              Apply Link
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[10px] font-mono text-slate-400">Supported:</span>
            <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-mono">YouTube (Unlisted/Public)</span>
            <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-mono">Vimeo</span>
            <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-mono">Cloudinary</span>
            <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-mono">Direct .mp4 / .webm Link</span>
          </div>
        </div>
      )}

      {/* Hidden File Input for Replace Trigger */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/webm,video/ogg,video/quicktime,video/x-matroska,.mp4,.webm,.mov,.mkv"
        onChange={(e) => handleFileChange(e.target.files?.[0])}
        className="hidden"
      />

      <p className="font-mono text-[10px] text-slate-500">
        {helperText}
      </p>
    </div>
  );
};

export default VideoUpload;
