import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Menu, 
  ChevronDown, 
  Check, 
  Building2, 
  MapPin, 
  LogOut, 
  User, 
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Globe2,
  Box
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onToggleMobileSidebar?: () => void;
  onToggleAiPanel?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileSidebar }) => {
  const navigate = useNavigate();
  const { user, isManufacturer, role, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFacilityMenu, setShowFacilityMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState('Main Facility');

  const profileRef = useRef<HTMLDivElement>(null);
  const facilityRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const facilities = [
    'Main Facility',
    'Midwest Packaging Plant',
    'Austin R&D Co-pack Hub',
    'West Coast Cold Storage'
  ];

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
      if (facilityRef.current && !facilityRef.current.contains(e.target as Node)) {
        setShowFacilityMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      if (isManufacturer) {
        navigate('/app/sourcing');
      } else {
        navigate('/app/marketplace');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Helper to format proper capitalized name from email or stored name
  const displayName = user?.name || (user?.email 
    ? user.email.split('@')[0].split(/[._-]/).filter(Boolean).map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : 'User');

  // Compute initials (e.g. "Alexa Chen" -> "AC", or "ops@..." -> "OP")
  const userInitial = (() => {
    if (user?.name) {
      const parts = user.name.trim().split(/\s+/);
      if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
      return parts[0].slice(0, 2).toUpperCase();
    }
    if (user?.email) {
      const prefix = user.email.split('@')[0];
      const parts = prefix.split(/[._-]/).filter(Boolean);
      if (parts.length >= 2 && parts[0] && parts[1]) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return prefix.slice(0, 2).toUpperCase();
    }
    return 'CP';
  })();

  const workspaceName = user?.company || (user?.email 
    ? user.email.split('@')[1]?.split('.')[0]?.toUpperCase() + (isManufacturer ? ' Facility' : ' Brand HQ')
    : selectedFacility);

  return (
    <header className="h-14 w-full border-b border-[#e8e8e5] bg-white transition-all font-sans select-none z-30 shrink-0">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        
        {/* Left Side: Search Bar (Exact Screenshot Layout) */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          {onToggleMobileSidebar && (
            <button
              onClick={onToggleMobileSidebar}
              className="md:hidden p-1.5 rounded-lg text-[#111111] hover:bg-[#f4f4f2] border border-[#e8e8e5] cursor-pointer"
              title="Open Navigation"
            >
              <Menu size={16} />
            </button>
          )}

          <div className="relative w-full max-w-sm">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999990]">
              <Search size={14} />
            </span>
            <input
              type="text"
              placeholder="Search by product, category, or manufacturer"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="w-full bg-white border border-[#e8e8e5] rounded-full pl-9 pr-4 py-1.5 text-xs text-[#111111] placeholder:text-[#999990] focus:outline-none focus:border-[#f5cb39] transition-all font-normal shadow-2xs"
            />
          </div>
        </div>

        {/* Right Side: Facility Selector + Notification Bell + User Profile Badge */}
        <div className="flex items-center gap-3">
          
          {/* 1. Facility Selector Pill (Matches "Main Facility ⌄") */}
          <div className="relative hidden sm:block" ref={facilityRef}>
            <button
              onClick={() => {
                setShowFacilityMenu(!showFacilityMenu);
                setShowNotifications(false);
                setShowProfileMenu(false);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#e8e8e5] bg-white hover:bg-[#f8f8f7] text-xs font-normal text-[#111111] shadow-2xs transition-colors cursor-pointer"
            >
              <span>{selectedFacility}</span>
              <ChevronDown size={12} className="text-[#888880]" />
            </button>

            {showFacilityMenu && (
              <div className="absolute right-0 mt-1.5 w-60 bg-white border border-[#e8e8e5] rounded-xl shadow-lg p-1.5 z-50 text-xs animate-in fade-in slide-in-from-top-1 duration-150">
                <span className="block px-2.5 py-1 text-[10px] font-semibold text-[#888880] uppercase tracking-wider">
                  Active Facility Location
                </span>
                {facilities.map((fac) => (
                  <button
                    key={fac}
                    onClick={() => {
                      setSelectedFacility(fac);
                      setShowFacilityMenu(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between text-[#111111] hover:bg-[#f4f4f2] transition-colors cursor-pointer"
                  >
                    <span className="truncate">{fac}</span>
                    {selectedFacility === fac && <Check size={13} className="text-[#f5cb39] shrink-0" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. Notification Bell (Matches Screenshot) */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowFacilityMenu(false);
                setShowProfileMenu(false);
              }}
              className="p-2 rounded-lg text-[#666660] hover:text-[#111111] hover:bg-[#f4f4f2] transition-colors cursor-pointer relative"
              title="Notifications"
            >
              <Bell size={16} />
              <span className="w-1.5 h-1.5 rounded-full bg-[#f5cb39] absolute top-2 right-2 ring-1 ring-white" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-[#e8e8e5] rounded-2xl shadow-xl p-4 z-50 space-y-3 font-sans text-xs animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="flex items-center justify-between border-b border-[#e8e8e5] pb-2">
                  <span className="font-semibold text-[#111111]">Notifications</span>
                  <span className="text-[10px] text-[#111111] bg-[#fef9c3] border border-[#fef08a] px-2 py-0.5 rounded-full">
                    1 New
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#f8f8f7] border border-[#e8e8e5] text-xs">
                  <p className="font-medium text-[#111111]">Facility Telemetry Active</p>
                  <p className="text-[11px] text-[#888880] mt-0.5">
                    Live batch telemetry and RFQ bids synced across {selectedFacility}.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 3. User Profile Widget + Interactive Dropdown (Matches "BR Ben Ratner Keychain ⌄") */}
          <div className="relative" ref={profileRef}>
            <button
              id="profile-dropdown-button"
              type="button"
              onClick={() => {
                setShowProfileMenu(prev => !prev);
                setShowNotifications(false);
                setShowFacilityMenu(false);
              }}
              className="flex items-center gap-2.5 pl-1 cursor-pointer group rounded-lg hover:bg-[#f8f8f7] p-1 transition-colors select-none"
              title="Account Menu"
            >
              <div className="w-8 h-8 rounded-full bg-[#f4f4f2] border border-[#e8e8e5] text-[#111111] font-semibold text-xs flex items-center justify-center shrink-0">
                {userInitial}
              </div>
              <div className="hidden md:flex flex-col text-left leading-tight">
                <span className="text-xs font-semibold text-[#111111] capitalize">
                  {displayName}
                </span>
                <span className="text-[11px] text-[#888880]">
                  {user?.company || (isManufacturer ? 'Manufacturer' : 'Brand')}
                </span>
              </div>
              <ChevronDown 
                size={13} 
                className={`text-[#888880] group-hover:text-[#111111] transition-transform duration-150 ${showProfileMenu ? 'rotate-180' : ''}`} 
              />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div 
                id="profile-dropdown-menu"
                className="absolute right-0 mt-2 w-72 bg-white border border-[#e8e8e5] rounded-2xl shadow-xl p-3.5 z-50 font-sans space-y-3 animate-in fade-in slide-in-from-top-1 duration-150"
              >
                {/* Profile Header */}
                <div className="flex items-center gap-3 pb-3 border-b border-[#e8e8e5]">
                  <div className="w-10 h-10 rounded-full bg-[#111111] text-white flex items-center justify-center font-semibold text-xs shrink-0">
                    {userInitial}
                  </div>
                  <div className="overflow-hidden flex-1">
                    <p className="text-xs font-semibold text-[#111111] truncate capitalize">{displayName}</p>
                    <p className="text-[11px] text-[#888880] truncate">{user?.email || ''}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#666660] bg-[#f4f4f2] px-1.5 py-0.5 rounded border border-[#e8e8e5]">
                        {role || 'BRAND'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Facility & Organization Context */}
                <div className="p-2.5 rounded-xl bg-[#f8f8f7] border border-[#e8e8e5] space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#888880]">Workspace:</span>
                    <span className="font-medium text-[#111111] truncate max-w-[140px]">{workspaceName}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#888880]">Organization:</span>
                    <span className="font-medium text-[#111111]">Fabricate Network</span>
                  </div>
                </div>

                {/* Sign Out Button */}
                <div className="pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer bg-white"
                  >
                    <LogOut size={13} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};

export default Navbar;
