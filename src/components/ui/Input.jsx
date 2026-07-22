import React from 'react';

export const Input = ({
  type = 'text',
  label,
  error,
  className = '',
  id,
  ...props
}) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-bold text-slate-600 tracking-wide uppercase">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        className={`glass-input px-3.5 py-2.5 text-sm ${
          error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/10' : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <span className="text-xs text-rose-600 font-medium mt-0.5">{error}</span>
      )}
    </div>
  );
};

export default Input;
