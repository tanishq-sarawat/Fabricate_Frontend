import React from 'react';

export const Input = ({
  type = 'text',
  label,
  error,
  className = '',
  id,
  rightElement,
  required,
  ...props
}) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-medium text-[#222222]">
          {label}
          {required && <span className="text-rose-500 ml-0.5 font-semibold">*</span>}
        </label>
      )}
      <div className="relative w-full">
        <input
          type={type}
          id={id}
          required={required}
          className={`w-full bg-white border border-[#e5e5e2] rounded-lg px-3.5 py-2.5 text-sm text-[#111111] placeholder:text-[#999990] focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all ${
            rightElement ? 'pr-10' : ''
          } ${
            error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20' : ''
          } ${className}`}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <span className="text-xs text-rose-600 font-medium mt-0.5">{error}</span>
      )}
    </div>
  );
};

export default Input;
