import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button';

export const ErrorState = ({
  title = "Something Went Wrong",
  message = "Failed to load requested data. Please try again.",
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 border border-rose-200 bg-rose-50/60 rounded-2xl text-center max-w-lg mx-auto shadow-2xs">
      <div className="p-3 bg-rose-100 text-rose-600 rounded-full mb-4">
        <AlertTriangle className="w-7 h-7" />
      </div>
      <h3 className="text-base font-bold text-rose-900 uppercase tracking-wider mb-2">{title}</h3>
      <p className="text-xs text-rose-700/80 mb-6">{message}</p>
      {onRetry && (
        <Button variant="danger" size="sm" leftIcon={<RefreshCw className="w-4 h-4" />} onClick={onRetry}>
          Retry Request
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
