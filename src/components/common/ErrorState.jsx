import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button';

export const ErrorState = ({
  title = "Something Went Wrong",
  message = "Failed to load requested data. Please try again.",
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 border border-rose-900/60 bg-[#0B1528] rounded-2xl text-center max-w-lg mx-auto shadow-xl">
      <div className="p-3 bg-rose-950/80 border border-rose-800 text-rose-400 rounded-full mb-4">
        <AlertTriangle className="w-7 h-7" />
      </div>
      <h3 className="text-base font-bold text-rose-300 uppercase tracking-wider mb-2">{title}</h3>
      <p className="text-xs text-rose-200/70 mb-6">{message}</p>
      {onRetry && (
        <Button variant="danger" size="sm" leftIcon={<RefreshCw className="w-4 h-4" />} onClick={onRetry}>
          Retry Request
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
