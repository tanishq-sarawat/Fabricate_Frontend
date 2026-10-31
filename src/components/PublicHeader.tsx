import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight,
  Globe2, 
  Layers, 
  Cpu, 
  Building2, 
  Sparkles, 
  FileText,
  Boxes,
  ArrowUpRight
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';

interface PublicHeaderProps {
  transparentAtTop?: boolean;
}

export const PublicHeader: React.FC<PublicHeaderProps> = ({ transparentAtTop = true }) => {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'manufacturers' | 'brands' | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (menu: 'manufacturers' | 'brands') => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const headerBgClass = !transparentAtTop || isScrolled || mobileMenuOpen
    ? 'border-b border-[#e8e8e5] bg-[#fbfbfa]/95 backdrop-blur-md shadow-2xs'
    : 'border-b border-[#e8e8e5]/40 bg-[#fbfbfa]/80 backdrop-blur-sm';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-200 font-sans ${headerBgClass}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
        
        {/* Brand Logo (Matching Keychain exact style) */}
        <Link 
          to="/" 
          className="flex items-baseline text-2xl font-bold lowercase text-[#111111] tracking-tight select-none group"
        >
          <span>fabricate<span className="text-[#f5cb39]">.</span></span>
        </Link>

        {/* Center: Dropdown Navigation */}
        <nav className="hidden lg:flex items-center gap-2 text-sm font-medium text-[#111111]">
          
          {/* 1. AI for Manufacturers Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('manufacturers')}
            onMouseLeave={handleMouseLeave}
          >
            <button 
              type="button"
              onClick={() => setActiveDropdown(activeDropdown === 'manufacturers' ? null : 'manufacturers')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-[#111111] hover:text-[#555555] hover:bg-[#f4f4f2]/70 transition-colors cursor-pointer select-none"
            >
              <span>AI for Manufacturers</span>
              <ChevronDown 
                size={14} 
                className={`text-[#888880] transition-transform duration-200 ${activeDropdown === 'manufacturers' ? 'rotate-180' : ''}`} 
              />
            </button>

            {/* Dropdown Panel */}
            {activeDropdown === 'manufacturers' && (
              <div className="absolute left-0 top-full pt-2 w-[340px] z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="bg-white rounded-2xl border border-[#e8e8e5] shadow-[0_12px_36px_rgba(0,0,0,0.08)] p-2 space-y-1">
                  
                  <Link
                    to="/connect"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#f8f8f7] transition-colors group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#f4f4f2] group-hover:bg-[#f5cb39] text-[#111111] flex items-center justify-center shrink-0 transition-colors">
                      <Globe2 size={17} strokeWidth={2} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#111111] flex items-center gap-1">
                        <span>Fabricate Connect</span>
                        <ArrowRight size={12} className="text-[#888880] group-hover:translate-x-0.5 transition-transform" />
                      </div>
                      <p className="text-[11px] text-[#666660] leading-snug mt-0.5">
                        The largest global CPG network. Connect with qualified buyers.
                      </p>
                    </div>
                  </Link>

                  <Link
                    to="/edge"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#f8f8f7] transition-colors group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#f4f4f2] group-hover:bg-[#f5cb39] text-[#111111] flex items-center justify-center shrink-0 transition-colors">
                      <Layers size={17} strokeWidth={2} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#111111] flex items-center gap-1">
                        <span>Fabricate Edge</span>
                        <ArrowRight size={12} className="text-[#888880] group-hover:translate-x-0.5 transition-transform" />
                      </div>
                      <p className="text-[11px] text-[#666660] leading-snug mt-0.5">
                        The CRM Revenue Platform built specifically for CPG manufacturers.
                      </p>
                    </div>
                  </Link>

                  <Link
                    to="/os"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#f8f8f7] transition-colors group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#f4f4f2] group-hover:bg-[#f5cb39] text-[#111111] flex items-center justify-center shrink-0 transition-colors">
                      <Cpu size={17} strokeWidth={2} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#111111] flex items-center gap-1">
                        <span>Fabricate OS</span>
                        <ArrowRight size={12} className="text-[#888880] group-hover:translate-x-0.5 transition-transform" />
                      </div>
                      <p className="text-[11px] text-[#666660] leading-snug mt-0.5">
                        The AI-Powered ERP and operating system for modern food & beverage plants.
                      </p>
                    </div>
                  </Link>

                </div>
              </div>
            )}
          </div>

          {/* 2. AI for Brands & Retailers Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('brands')}
            onMouseLeave={handleMouseLeave}
          >
            <button 
              type="button"
              onClick={() => setActiveDropdown(activeDropdown === 'brands' ? null : 'brands')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-[#111111] hover:text-[#555555] hover:bg-[#f4f4f2]/70 transition-colors cursor-pointer select-none"
            >
              <span>AI for Brands & Retailers</span>
              <ChevronDown 
                size={14} 
                className={`text-[#888880] transition-transform duration-200 ${activeDropdown === 'brands' ? 'rotate-180' : ''}`} 
              />
            </button>

            {/* Dropdown Panel */}
            {activeDropdown === 'brands' && (
              <div className="absolute left-0 top-full pt-2 w-[340px] z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="bg-white rounded-2xl border border-[#e8e8e5] shadow-[0_12px_36px_rgba(0,0,0,0.08)] p-2 space-y-1">
                  
                  <Link
                    to="/app/marketplace"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#f8f8f7] transition-colors group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#f4f4f2] group-hover:bg-[#f5cb39] text-[#111111] flex items-center justify-center shrink-0 transition-colors">
                      <Building2 size={17} strokeWidth={2} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#111111] flex items-center gap-1">
                        <span>Search Manufacturers</span>
                        <ArrowRight size={12} className="text-[#888880] group-hover:translate-x-0.5 transition-transform" />
                      </div>
                      <p className="text-[11px] text-[#666660] leading-snug mt-0.5">
                        Browse verified supplier profiles and audited manufacturing capabilities.
                      </p>
                    </div>
                  </Link>

                  <Link
                    to="/app/sourcing"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#f8f8f7] transition-colors group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#f4f4f2] group-hover:bg-[#f5cb39] text-[#111111] flex items-center justify-center shrink-0 transition-colors">
                      <Sparkles size={17} strokeWidth={2} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#111111] flex items-center gap-1">
                        <span>Generate Products</span>
                        <ArrowRight size={12} className="text-[#888880] group-hover:translate-x-0.5 transition-transform" />
                      </div>
                      <p className="text-[11px] text-[#666660] leading-snug mt-0.5">
                        Describe your product to create detailed specs with photos and estimates.
                      </p>
                    </div>
                  </Link>

                  <Link
                    to="/app/sourcing"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#f8f8f7] transition-colors group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#f4f4f2] group-hover:bg-[#f5cb39] text-[#111111] flex items-center justify-center shrink-0 transition-colors">
                      <FileText size={17} strokeWidth={2} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#111111] flex items-center gap-1">
                        <span>Post a Project</span>
                        <ArrowRight size={12} className="text-[#888880] group-hover:translate-x-0.5 transition-transform" />
                      </div>
                      <p className="text-[11px] text-[#666660] leading-snug mt-0.5">
                        Describe what you need and get matched with qualified co-mans and co-packers.
                      </p>
                    </div>
                  </Link>

                </div>
              </div>
            )}
          </div>

        </nav>

        {/* Right: CTA Actions (Matching Keychain exact buttons) */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <Link 
              to="/app" 
              className="inline-flex items-center gap-2 bg-[#f5cb39] hover:bg-[#ebd034] text-[#111111] font-semibold text-sm px-4 py-2 rounded-lg transition-all shadow-xs cursor-pointer active:scale-95 select-none"
            >
              <span>Open Console</span>
              <ArrowRight size={14} />
            </Link>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-sm font-medium text-[#111111] hover:text-[#555555] transition-colors px-3 py-1.5"
              >
                Sign in
              </Link>
              <Link 
                to="/register" 
                className="inline-flex items-center justify-center bg-[#f5cb39] hover:bg-[#ebd034] text-[#111111] font-semibold text-sm px-4 py-2 rounded-lg transition-all shadow-xs cursor-pointer active:scale-95 select-none whitespace-nowrap"
              >
                Request access
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="p-2 rounded-lg text-[#111111] hover:bg-[#f4f4f2] transition-colors cursor-pointer"
            title="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Matching Keychain layout) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fbfbfa] border-b border-[#e8e8e5] px-6 py-5 space-y-6 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Manufacturers Category */}
          <div>
            <span className="block text-[11px] font-semibold text-[#888880] tracking-wider uppercase mb-2">
              AI for Manufacturers
            </span>
            <div className="space-y-1">
              <Link 
                to="/connect"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2 rounded-lg text-sm font-medium text-[#111111] hover:bg-[#f4f4f2]"
              >
                <Globe2 size={16} className="text-[#888880]" />
                <span>Fabricate Connect</span>
              </Link>
              <Link 
                to="/edge"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2 rounded-lg text-sm font-medium text-[#111111] hover:bg-[#f4f4f2]"
              >
                <Layers size={16} className="text-[#888880]" />
                <span>Fabricate Edge</span>
              </Link>
              <Link 
                to="/os"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2 rounded-lg text-sm font-medium text-[#111111] hover:bg-[#f4f4f2]"
              >
                <Cpu size={16} className="text-[#888880]" />
                <span>Fabricate OS</span>
              </Link>
            </div>
          </div>

          {/* Brands Category */}
          <div>
            <span className="block text-[11px] font-semibold text-[#888880] tracking-wider uppercase mb-2">
              AI for Brands & Retailers
            </span>
            <div className="space-y-1">
              <Link 
                to="/app/marketplace"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2 rounded-lg text-sm font-medium text-[#111111] hover:bg-[#f4f4f2]"
              >
                <Building2 size={16} className="text-[#888880]" />
                <span>Search Manufacturers</span>
              </Link>
              <Link 
                to="/app/sourcing"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2 rounded-lg text-sm font-medium text-[#111111] hover:bg-[#f4f4f2]"
              >
                <Sparkles size={16} className="text-[#888880]" />
                <span>Generate Products</span>
              </Link>
              <Link 
                to="/app/sourcing"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2 rounded-lg text-sm font-medium text-[#111111] hover:bg-[#f4f4f2]"
              >
                <FileText size={16} className="text-[#888880]" />
                <span>Post a Project</span>
              </Link>
            </div>
          </div>

          {/* Mobile CTAs */}
          <div className="pt-4 border-t border-[#e8e8e5] flex flex-col gap-2.5">
            {user ? (
              <Link 
                to="/app"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-lg bg-[#f5cb39] text-sm font-semibold text-[#111111] hover:bg-[#ebd034] shadow-xs"
              >
                Open Console
              </Link>
            ) : (
              <>
                <Link 
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg border border-[#e8e8e5] bg-white text-sm font-medium text-[#111111] hover:bg-[#f4f4f2]"
                >
                  Sign in
                </Link>
                <Link 
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg bg-[#f5cb39] text-sm font-semibold text-[#111111] hover:bg-[#ebd034] shadow-xs"
                >
                  Request access
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      </header>
      {/* Spacer to prevent content from jumping under fixed header */}
      <div className="h-16 shrink-0 w-full" />
    </>
  );
};

export default PublicHeader;
