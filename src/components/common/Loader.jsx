import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loader = ({ text = "Loading data...", fullScreen = false }) => {
  const content = (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
      <div className="relative">
        <div className="w-12 h-12 border-2 border-cyan-500/20 border-t-cyan-400 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-cyan-400"></div>
        </div>
      </div>
      <p className="font-mono text-xs text-cyan-400 tracking-widest uppercase">{text}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#06080F]/90 backdrop-blur-md">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;
