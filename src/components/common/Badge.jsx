import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  icon,
}) => {
  const variants = {
    default: 'bg-slate-800/80 text-slate-200 border-slate-700/80',
    cyan: 'bg-[#0066FF]/15 text-[#00F0FF] border-[#0066FF]/40 shadow-xs shadow-blue-500/10',
    violet: 'bg-indigo-950/60 text-indigo-300 border-indigo-700/60',
    emerald: 'bg-emerald-950/60 text-emerald-400 border-emerald-700/60',
    amber: 'bg-amber-950/60 text-amber-400 border-amber-700/60',
    rose: 'bg-rose-950/60 text-rose-400 border-rose-700/60',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10.5px] rounded-md',
    md: 'px-2.5 py-1 text-xs rounded-md',
    lg: 'px-3 py-1.5 text-sm rounded-md',
  };

  return (
    <span
      className={twMerge(
        clsx(
          "inline-flex items-center gap-1.5 font-sans uppercase tracking-wide border font-bold text-xs",
          variants[variant],
          sizes[size],
          className
        )
      )}
    >
      {icon && <span className="inline-flex items-center">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
