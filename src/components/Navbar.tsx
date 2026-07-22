import React from 'react';
import { Search, Bell, ShieldCheck } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { role, isManufacturer } = useAuth();

  const getPageInfo = () => {
    if (location.pathname.includes('/marketplace')) {
      return { title: 'Supplier Marketplace', subtitle: 'Audit verified factory capabilities' };
    }
    if (location.pathname.includes('/sourcing')) {
      return {
        title: isManufacturer ? 'Manufacturer Workspace' : 'Sourcing Console',
        subtitle: isManufacturer ? 'Submit bids on open RFQ requests' : 'Manage RFQs and manufacturer bids',
      };
    }
    return {
      title: isManufacturer ? 'Manufacturer Workspace' : 'Console Dashboard',
      subtitle: isManufacturer ? 'Overview of open RFQs and submitted quotes' : 'Overview of supply chain operations',
    };
  };

  const { title, subtitle } = getPageInfo();

  return (
    <header className="sticky top-0 z-20 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all duration-300 font-sans">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
        
        {/* Left Side: Page Title & Subtitle */}
        <div className="flex flex-col justify-center">
          <h2 className="text-sm font-extrabold text-slate-900 tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
            {subtitle}
          </p>
        </div>

        {/* Center/Right Side: Global Search & Status Utilities */}
        <div className="flex items-center gap-4">
          {/* Quick Search */}
          <div className="relative hidden md:block w-64 lg:w-80">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Search size={14} />
            </span>
            <input
              type="text"
              placeholder={isManufacturer ? "Search open RFQs..." : "Search RFQs, suppliers..."}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/10 transition-all"
            />
          </div>

          {/* Role Status Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-extrabold text-amber-800 uppercase tracking-wider">
            <ShieldCheck size={13} className="text-amber-600" />
            <span>{role || 'BRAND'}</span>
          </div>

          {/* Notifications Button */}
          <button
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors border border-slate-200/80 cursor-pointer bg-white shadow-xs"
            title="System Notifications"
          >
            <Bell size={16} />
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
