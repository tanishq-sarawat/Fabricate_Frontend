import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={`relative w-full ${sizes[size]} bg-white border border-slate-200 rounded-2xl shadow-2xl transform scale-100 transition-all duration-300 z-10 flex flex-col max-h-[90vh]`}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">{title}</h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-1 rounded-full text-slate-500 hover:text-slate-900">
            <X size={18} />
          </Button>
        </div>
        
        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 text-sm text-slate-700 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
