import React from 'react';

export const Loader = ({ text = "Loading data...", fullScreen = false, size = "md" }) => {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-14 h-14 border-4",
  };

  const content = (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-3.5">
      <div className="relative flex items-center justify-center">
        <div
          className={`${sizeClasses[size] || sizeClasses.md} border-blue-100 border-t-[#0066FF] rounded-full animate-spin`}
        />
        <div className="absolute w-2 h-2 bg-[#0066FF] rounded-full" />
      </div>
      {text && (
        <p className="font-mono text-xs text-slate-500 font-bold uppercase tracking-widest">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/85 backdrop-blur-sm">
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xl p-4">
          {content}
        </div>
      </div>
    );
  }

  return content;
};

export default Loader;
