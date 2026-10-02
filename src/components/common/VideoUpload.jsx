import React, { useState, useRef, useEffect } from 'react';
import {
  UploadCloud,
  Film,
  Link as LinkIcon,
  X,
  Loader2,
  RefreshCw,
  Sparkles,
  Sliders,
} from 'lucide-react';
import { toast } from 'sonner';
import { useUploadMediaMutation } from '../../services/api';

// Live Chroma Key Real-Time Preview Box
const ChromaLivePreview = ({ src, sensitivity }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !src) return;

    let animId;
    let isMounted = true;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const renderPreview = () => {
      if (!isMounted) return;
      if (video.readyState >= 2 && !video.paused && !video.ended) {
        if (video.videoWidth > 0 && video.videoHeight > 0) {
          const w = 540;
          const h = Math.round((video.videoHeight * 540) / video.videoWidth);
          if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
          }

          ctx.clearRect(0, 0, w, h);
          ctx.drawImage(video, 0, 0, w, h);

          try {
            const frame = ctx.getImageData(0, 0, w, h);
            const buf32 = new Uint32Array(frame.data.buffer);
            const len = buf32.length;

            for (let i = 0; i < len; i++) {
              const pixel = buf32[i];
              const r = pixel & 0xFF;
              const g = (pixel >> 8) & 0xFF;
              const b = (pixel >> 16) & 0xFF;

              if (r > 120 && b > 120) continue;
              if (b > 115) continue;
              if (r > 160) continue;

              const maxRB = r > b ? r : b;
              const greenDiff = g - maxRB;

              if (greenDiff > sensitivity && g > 75) {
                if (greenDiff > sensitivity + 30) {
                  buf32[i] = 0;
                } else {
                  const factor = 1 - (greenDiff - sensitivity) / 30;
                  const alpha = Math.round(255 * factor);
                  buf32[i] = (alpha << 24) | (b << 16) | (g << 8) | r;
                }
              }
            }

            ctx.putImageData(frame, 0, 0);
          } catch {
            // Ignore preview canvas errors
          }
        }
      }
      animId = requestAnimationFrame(renderPreview);
    };

    video.play().catch(() => {});
    animId = requestAnimationFrame(renderPreview);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animId);
    };
  }, [src, sensitivity]);

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-800 bg-[#060B18] flex items-center justify-center shadow-inner">
      {/* Cyber Checkerboard Transparency Grid */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(45deg, #1E293B 25%, transparent 25%), linear-gradient(-45deg, #1E293B 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1E293B 75%), linear-gradient(-45deg, transparent 75%, #1E293B 75%)`,
          backgroundSize: '16px 16px',
          backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
        }}
      />

      {/* Cyber Radial Glow */}
      <div className="absolute w-44 h-44 bg-[#00F0FF]/20 rounded-full blur-2xl pointer-events-none animate-pulse" />

      {/* Hidden Video Source */}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="hidden"
      />

      {/* Output Canvas */}
      <canvas
        ref={canvasRef}
        className="relative z-10 max-w-full max-h-full object-contain"
      />

      <div className="absolute top-2.5 right-2.5 z-20 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-[#00F0FF]/30 text-[#00F0FF] text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-md">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-ping" />
        Live Background Removal Preview
      </div>
    </div>
  );
};

export const VideoUpload = ({
  value,
  onChange,
  label = "Hero Intro Video",
  helperText = "Upload a transparent WebM/MOV video, standard MP4, or paste a YouTube / Vimeo URL.",
  className = ""
}) => {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'url' | 'chroma'
  const [urlInput, setUrlInput] = useState(value || '');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [optimizingStatus, setOptimizingStatus] = useState('');
  const fileInputRef = useRef(null);
  const chromaFileInputRef = useRef(null);

  // Chroma-Key Converter State
  const [chromaFile, setChromaFile] = useState(null);
  const [chromaVideoSrc, setChromaVideoSrc] = useState('');
  const [greenSensitivity, setGreenSensitivity] = useState(35); // threshold
  const [isConvertingChroma, setIsConvertingChroma] = useState(false);
  const [chromaProgress, setChromaProgress] = useState(0);

  const [uploadMedia, { isLoading: isUploading }] = useUploadMediaMutation();

  // Format YouTube/Vimeo links
  const formatVideoUrl = (rawUrl) => {
    if (!rawUrl) return '';
    const trimmed = rawUrl.trim();

    const ytMatch = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=)|youtube-nocookie\.com\/embed\/)([\w-]{11})/);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&mute=1&loop=1&playlist=${ytMatch[1]}&controls=0&showinfo=0`;
    }

    const vimeoMatch = trimmed.match(/(?:vimeo\.com\/)(\d+)/);
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&loop=1&muted=1&background=1`;
    }

    return trimmed;
  };

  const isEmbedVideo = (url) => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtube-nocookie.com') || url.includes('youtu.be') || url.includes('player.vimeo.com') || url.includes('vimeo.com');
  };

  // Convert Green Screen Video into Transparent WebM (VP9 with Alpha)
  const convertGreenScreenToTransparentWebM = async (file, sensitivity = 35) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      video.muted = true;
      video.playsInline = true;
      video.crossOrigin = 'anonymous';

      video.onloadedmetadata = async () => {
        try {
          const duration = video.duration || 5;
          let width = video.videoWidth || 1280;
          let height = video.videoHeight || 720;

          // Limit max dimension for fast processing & small file size
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
          const ctx = canvas.getContext('2d', { willReadFrequently: true, alpha: true });

          const stream = canvas.captureStream ? canvas.captureStream(30) : null;
          if (!stream || typeof MediaRecorder === 'undefined') {
            URL.revokeObjectURL(video.src);
            return reject(new Error("MediaRecorder transparent stream not supported in this browser."));
          }

          let mimeType = 'video/webm;codecs=vp9';
          if (!MediaRecorder.isTypeSupported(mimeType)) mimeType = 'video/webm;codecs=vp8';
          if (!MediaRecorder.isTypeSupported(mimeType)) mimeType = 'video/webm';

          const recorder = new MediaRecorder(stream, {
            mimeType: MediaRecorder.isTypeSupported(mimeType) ? mimeType : undefined,
            videoBitsPerSecond: 2500000 // 2.5 Mbps crisp transparent quality
          });

          const chunks = [];
          recorder.ondataavailable = (e) => {
            if (e.data && e.data.size > 0) chunks.push(e.data);
          };

          recorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            const transparentFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + "-transparent.webm", {
              type: 'video/webm'
            });
            URL.revokeObjectURL(video.src);
            resolve(transparentFile);
          };

          recorder.start(100);

          let isRecording = true;
          const processFrame = () => {
            if (!isRecording) return;
            if (video.paused || video.ended) {
              if (video.ended) {
                isRecording = false;
                recorder.stop();
                return;
              }
            }

            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(video, 0, 0, width, height);

            try {
              const frame = ctx.getImageData(0, 0, width, height);
              const buf32 = new Uint32Array(frame.data.buffer);
              const len = buf32.length;

              for (let i = 0; i < len; i++) {
                const pixel = buf32[i];
                const r = pixel & 0xFF;
                const g = (pixel >> 8) & 0xFF;
                const b = (pixel >> 16) & 0xFF;

                // Protect bright whites/greys
                if (r > 120 && b > 120) continue;
                // Protect blues & cyans
                if (b > 115) continue;
                // Protect reds
                if (r > 160) continue;

                const maxRB = r > b ? r : b;
                const greenDiff = g - maxRB;

                if (greenDiff > sensitivity && g > 75) {
                  if (greenDiff > sensitivity + 30) {
                    buf32[i] = 0; // 100% transparent
                  } else {
                    const factor = 1 - (greenDiff - sensitivity) / 30;
                    const alpha = Math.round(255 * factor);
                    buf32[i] = (alpha << 24) | (b << 16) | (g << 8) | r;
                  }
                }
              }

              ctx.putImageData(frame, 0, 0);
            } catch (err) {
              console.warn("Chroma frame error:", err);
            }

            if (duration > 0) {
              const pct = Math.min(98, Math.round((video.currentTime / duration) * 100));
              setChromaProgress(pct);
            }

            requestAnimationFrame(processFrame);
          };

          video.onended = () => {
            if (isRecording) {
              isRecording = false;
              recorder.stop();
            }
          };

          video.playbackRate = 1.5; // Fast processing
          await video.play();
          processFrame();
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

  // Upload handler
  const handleUploadFile = async (file) => {
    if (!file) return;

    try {
      setOptimizingStatus('Uploading video to server...');
      setUploadProgress(40);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', 'HeroVideo');

      setUploadProgress(75);
      const response = await uploadMedia(formData).unwrap();
      const uploadedUrl = response?.url || response?.data?.url || response?.secure_url;
      setUploadProgress(100);

      if (uploadedUrl && !uploadedUrl.startsWith('blob:')) {
        onChange(uploadedUrl);
        setUrlInput(uploadedUrl);
        toast.success("Transparent Video uploaded and saved successfully!");
      } else {
        toast.error("Failed to get permanent video URL from server.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload failed: " + (err?.data?.message || err?.message || "Please try again"));
    } finally {
      setOptimizingStatus('');
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  // Start Chroma-Key Conversion
  const handleConvertAndUpload = async () => {
    if (!chromaFile) {
      toast.error("Please select a video file first.");
      return;
    }

    try {
      setIsConvertingChroma(true);
      setChromaProgress(5);
      toast.info("Removing green screen & generating transparent WebM... Please wait.");

      const transparentFile = await convertGreenScreenToTransparentWebM(chromaFile, greenSensitivity);
      toast.success("Background removed! Now uploading transparent WebM...");

      await handleUploadFile(transparentFile);
      setChromaFile(null);
      setChromaVideoSrc('');
    } catch (err) {
      console.error("Chroma conversion error:", err);
      toast.error("Conversion failed: " + (err.message || "Please try standard upload"));
    } finally {
      setIsConvertingChroma(false);
      setChromaProgress(0);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUploadFile(e.dataTransfer.files[0]);
    }
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
    setChromaFile(null);
    setChromaVideoSrc('');
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 font-bold">
          {label}
        </label>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-[#070E1C] p-1 rounded-lg border border-slate-800 text-[10px] font-mono font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === 'upload'
                ? 'bg-gradient-to-r from-[#0066FF] to-[#00F0FF] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UploadCloud className="w-3 h-3" />
            Upload Video
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('chroma')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === 'chroma'
                ? 'bg-gradient-to-r from-[#A855F7] to-[#00F0FF] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#00F0FF]" />
            Chroma to Transparent WebM
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === 'url'
                ? 'bg-gradient-to-r from-[#0066FF] to-[#00F0FF] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            Paste URL
          </button>
        </div>
      </div>

      {/* Live Video Preview If Value Exists */}
      {value ? (
        <div className="relative border border-slate-800 rounded-2xl overflow-hidden bg-[#070E1C] p-2 group shadow-lg">
          <div className="w-full aspect-video rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center relative">
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
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-contain"
              >
                Your browser does not support the video tag.
              </video>
            )}

            {/* Badge Indicator */}
            <div className="absolute top-3 left-3 pointer-events-none">
              <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md text-[#00F0FF] border border-[#00F0FF]/30 text-[10px] font-mono font-bold rounded-md uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                <Film className="w-3 h-3 text-[#00F0FF]" />
                {value.includes('.webm') ? 'Transparent WebM' : value.includes('youtube') ? 'YouTube' : 'Active Video'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2.5 px-1.5 bg-[#070E1C] text-white rounded-b-xl">
            <div className="flex items-center gap-2 overflow-hidden mr-2">
              <Film className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
              <span className="font-mono text-[10px] text-slate-400 truncate max-w-[280px]">
                {value}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => {
                  if (fileInputRef.current) fileInputRef.current.click();
                }}
                className="px-2.5 py-1 text-[11px] font-mono font-medium text-slate-200 hover:text-white bg-[#0B1528] hover:bg-slate-800 border border-slate-700 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
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

      {/* Tab 1: Standard / Transparent Direct Upload */}
      {activeTab === 'upload' && !value && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-[#00F0FF] bg-[#0066FF]/10 scale-[0.99]'
              : 'border-slate-800 hover:border-[#00F0FF] bg-[#070E1C] hover:bg-[#0B1528]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/webm,video/quicktime,video/mp4,.webm,.mov,.mp4"
            onChange={(e) => handleUploadFile(e.target.files?.[0])}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center space-y-2.5">
            <div className="w-12 h-12 rounded-xl bg-[#0066FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center shadow-xs">
              {isUploading || optimizingStatus ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <UploadCloud className="w-6 h-6" />
              )}
            </div>

            <div className="space-y-1">
              <p className="font-display text-xs font-bold text-white">
                {optimizingStatus ? optimizingStatus : isUploading ? "Uploading video..." : "Click or drag & drop transparent .webm / .mov / .mp4 video"}
              </p>
              <p className="font-mono text-[10px] text-slate-400">
                Supports Native Transparent WebM (Alpha) & MP4
              </p>
            </div>

            {uploadProgress > 0 && (
              <div className="w-full max-w-xs bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#0066FF] to-[#00F0FF] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Green Screen to Transparent WebM Converter */}
      {activeTab === 'chroma' && !value && (
        <div className="border border-purple-500/30 rounded-2xl p-5 bg-[#0B1224] space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-white">
              <Sparkles className="w-4 h-4 text-[#00F0FF]" />
              <span className="font-display text-xs font-bold uppercase tracking-wider">
                1-Click Green Screen to Transparent WebM Converter
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono font-semibold">
              Alpha Channel VP9
            </span>
          </div>

          {!chromaFile ? (
            <div
              onClick={() => chromaFileInputRef.current?.click()}
              className="border-2 border-dashed border-purple-500/40 hover:border-purple-400 rounded-xl p-6 text-center cursor-pointer bg-[#070E1C]/60 hover:bg-[#070E1C] transition-all"
            >
              <input
                ref={chromaFileInputRef}
                type="file"
                accept="video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setChromaFile(file);
                    setChromaVideoSrc(URL.createObjectURL(file));
                  }
                }}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-2">
                <Film className="w-8 h-8 text-purple-400" />
                <p className="font-sans text-xs font-bold text-white">
                  Select Raw Green-Screen MP4 / WebM File
                </p>
                <p className="font-mono text-[10px] text-slate-400">
                  The tool will remove the green screen and create a transparent WebM for zero-lag playback.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-[#070E1C] p-3 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 truncate mr-2">
                  <Film className="w-4 h-4 text-[#00F0FF] shrink-0" />
                  <span className="font-mono text-xs text-white truncate">{chromaFile.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setChromaFile(null);
                    setChromaVideoSrc('');
                  }}
                  className="text-slate-400 hover:text-rose-400 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Live Real-Time Chroma Key Preview Canvas */}
              {chromaVideoSrc && (
                <ChromaLivePreview
                  src={chromaVideoSrc}
                  sensitivity={greenSensitivity}
                />
              )}

              {/* Sensitivity Slider */}
              <div className="space-y-1.5 bg-[#070E1C] p-3 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-[#00F0FF]" />
                    Live Green Sensitivity Threshold:
                  </span>
                  <span className="text-[#00F0FF] font-bold">{greenSensitivity}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="60"
                  value={greenSensitivity}
                  onChange={(e) => setGreenSensitivity(Number(e.target.value))}
                  className="w-full accent-[#00F0FF] cursor-pointer"
                />
                <p className="font-mono text-[10px] text-slate-500">
                  Slide left/right to see the live cutout adjust in real-time above.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={isConvertingChroma}
                  onClick={handleConvertAndUpload}
                  className="flex-1 py-2.5 px-4 bg-gradient-to-r from-purple-600 via-[#0066FF] to-[#00F0FF] hover:opacity-95 text-white font-mono text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 disabled:opacity-50 cursor-pointer"
                >
                  {isConvertingChroma ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Converting & Uploading ({chromaProgress}%)...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Convert & Upload as Transparent WebM</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Paste Direct URL Tab */}
      {activeTab === 'url' && !value && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <LinkIcon className="w-3.5 h-3.5" />
              </div>
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Paste YouTube, Vimeo, or direct .webm / .mp4 link..."
                className="w-full bg-[#070E1C] border border-slate-800 pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] rounded-lg shadow-sm font-mono font-medium"
              />
            </div>
            <button
              type="button"
              onClick={handleUrlApply}
              className="px-4 py-2 bg-gradient-to-r from-[#0066FF] to-[#00D4FF] hover:opacity-90 text-white font-mono text-xs font-bold rounded-lg transition-all cursor-pointer shadow-md shadow-blue-500/20 shrink-0"
            >
              Apply Link
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[10px] font-mono text-slate-500">Supported:</span>
            <span className="px-1.5 py-0.5 bg-[#070E1C] border border-slate-800 text-slate-400 rounded text-[10px] font-mono">Transparent .webm</span>
            <span className="px-1.5 py-0.5 bg-[#070E1C] border border-slate-800 text-slate-400 rounded text-[10px] font-mono">YouTube</span>
            <span className="px-1.5 py-0.5 bg-[#070E1C] border border-slate-800 text-slate-400 rounded text-[10px] font-mono">Vimeo</span>
            <span className="px-1.5 py-0.5 bg-[#070E1C] border border-slate-800 text-slate-400 rounded text-[10px] font-mono">Cloudinary</span>
          </div>
        </div>
      )}

      <p className="font-mono text-[10px] text-slate-500">
        {helperText}
      </p>
    </div>
  );
};

export default VideoUpload;
