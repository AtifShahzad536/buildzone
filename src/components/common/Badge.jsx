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
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    cyan: 'bg-blue-50 text-[#0066FF] border-blue-200',
    violet: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-800 border-amber-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px] rounded-md',
    md: 'px-2.5 py-1 text-xs rounded-md',
    lg: 'px-3 py-1.5 text-sm rounded-md',
  };

  return (
    <span
      className={twMerge(
        clsx(
          "inline-flex items-center gap-1.5 font-mono uppercase tracking-wider border font-semibold",
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
