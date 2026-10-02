import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X, AlertCircle } from 'lucide-react';

export const ConfirmModal = ({
  isOpen,
  title = 'Delete Confirmation',
  message = 'Are you sure you want to delete this record? This action cannot be undone.',
  itemTitle = '',
  confirmText = 'Yes, Delete',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading = false,
  onConfirm,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isLoading) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  const isDanger = variant === 'danger';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dimmed Backdrop */}
      <div
        className="fixed inset-0 bg-[#060B18]/80 backdrop-blur-sm transition-opacity animate-fadeIn cursor-pointer"
        onClick={!isLoading ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modern Card Dialog */}
      <div 
        className="relative bg-[#0B1528] border border-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-7 overflow-hidden z-10 animate-scaleUp"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content Body */}
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-2xl shrink-0 ${
            isDanger 
              ? 'bg-rose-950/80 border border-rose-800 text-rose-400' 
              : 'bg-amber-950/80 border border-amber-800 text-amber-400'
          }`}>
            {isDanger ? <Trash2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          </div>

          <div className="flex-1 min-w-0 pt-0.5">
            <h3 className="font-display font-bold text-lg text-white leading-snug">
              {title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 font-sans mt-2 leading-relaxed">
              {message}
            </p>

            {itemTitle && (
              <div className="mt-3 px-3 py-2 bg-[#070E1C] border border-slate-800 rounded-xl font-mono text-xs font-semibold text-slate-200 break-all flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
                <span>{itemTitle}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 sm:mt-7 pt-4 border-t border-slate-800/80 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2.5 rounded-xl border border-slate-700 bg-[#070E1C] hover:bg-slate-800 text-slate-300 hover:text-white font-sans text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-5 py-2.5 rounded-xl font-sans text-xs sm:text-sm font-bold text-white transition-all cursor-pointer shadow-md flex items-center gap-2 disabled:opacity-50 ${
              isDanger
                ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/25'
                : 'bg-gradient-to-r from-[#0066FF] to-[#00D4FF] hover:opacity-90 shadow-blue-500/25'
            }`}
          >
            {isLoading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                <span>Deleting...</span>
              </>
            ) : (
              <span>{confirmText}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
