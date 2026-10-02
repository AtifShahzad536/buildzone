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
  const baseStyles = "relative inline-flex items-center justify-center font-sans text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066FF]/40";

  const variants = {
    primary: "bg-[#0066FF] text-white hover:bg-blue-600 active:bg-[#0052CC] shadow-md shadow-blue-500/20 border border-blue-400/30 font-bold",
    secondary: "bg-[#0B1528] text-slate-100 border border-slate-700/80 hover:border-[#0066FF] hover:text-[#00F0FF] hover:bg-[#111E38] shadow-sm",
    outline: "bg-transparent text-slate-200 border border-slate-700 hover:border-[#0066FF] hover:text-[#00F0FF] hover:bg-slate-800/60",
    gradient: "bg-gradient-to-r from-[#0066FF] to-[#00F0FF] text-white font-bold border border-transparent hover:brightness-110 shadow-md shadow-blue-500/25",
    danger: "bg-rose-950/80 text-rose-300 border border-rose-800/80 hover:bg-rose-900/80",
    ghost: "bg-transparent text-slate-300 hover:text-[#00F0FF] hover:bg-slate-800/60 border border-transparent",
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
