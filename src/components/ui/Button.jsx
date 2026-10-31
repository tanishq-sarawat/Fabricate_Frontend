import React from 'react';

export const Button = ({
  children,
  type = 'button',
  variant = 'primary', // 'primary' | 'secondary' | 'amber' | 'keychain' | 'danger' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  disabled = false,
  onClick,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none cursor-pointer';
  
  const variants = {
    primary: 'bg-[#111111] hover:bg-[#262626] text-white focus:ring-[#111111] shadow-xs border border-[#111111]',
    keychain: 'bg-[#f5cb39] hover:bg-[#ebd034] text-[#111111] focus:ring-[#f5cb39] shadow-xs border border-[#ebd034]',
    amber: 'bg-[#f5cb39] hover:bg-[#ebd034] text-[#111111] focus:ring-[#f5cb39] shadow-xs border border-[#ebd034]',
    secondary: 'bg-white hover:bg-[#f6f6f3] text-[#111111] border border-[#e5e5e2] focus:ring-[#e5e5e2] shadow-xs',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500 shadow-xs',
    ghost: 'hover:bg-[#f4f4f2] text-[#444444] hover:text-[#111111] focus:ring-slate-300',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-sm sm:text-base px-5 py-2.5 gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
