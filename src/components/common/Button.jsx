import React from 'react';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = '',
  type = 'button',
  ...props
}, ref) => {
  const baseStyles = "relative inline-flex items-center justify-center font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066FF]/40";

  const variants = {
    primary: "bg-[#0066FF] text-white hover:bg-[#0052CC] active:bg-[#0040A8] shadow-sm hover:shadow-md border border-transparent font-bold",
    secondary: "bg-white text-[#0B1938] border border-slate-300 hover:border-[#0066FF] hover:text-[#0066FF] hover:bg-blue-50/40 shadow-sm",
    outline: "bg-transparent text-[#0B1938] border border-slate-300 hover:border-[#0066FF] hover:text-[#0066FF] hover:bg-blue-50/40",
    gradient: "bg-gradient-to-r from-[#0066FF] to-[#0284C7] text-white font-bold border border-transparent hover:brightness-105 shadow-sm",
    danger: "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100",
    ghost: "bg-transparent text-slate-600 hover:text-[#0066FF] hover:bg-blue-50/60 border border-transparent",
  };

  const sizes = {
    xs: "px-3 py-1.5 text-[11px] rounded-md",
    sm: "px-3.5 py-2 text-xs rounded-md",
    md: "px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-md",
    lg: "px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-bold rounded-md",
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin text-current" />}
      {!isLoading && leftIcon && <span className="mr-1.5 sm:mr-2 inline-flex items-center">{leftIcon}</span>}
      <span className="truncate">{children}</span>
      {!isLoading && rightIcon && <span className="ml-1.5 sm:ml-2 inline-flex items-center">{rightIcon}</span>}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
