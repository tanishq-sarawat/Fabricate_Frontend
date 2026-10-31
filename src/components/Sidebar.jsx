import { NavLink, Link } from 'react-router-dom';
import { 
  Home,
  Building2,
  Folder,
  Bot,
  Layers,
  Box,
  ArrowUpRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar = ({ 
  mobileOpen = false, 
  setMobileOpen,
  aiPanelOpen = true,
  setAiPanelOpen
}) => {
  const { isBrand, isManufacturer } = useAuth();

  const handleNavClick = () => {
    if (setMobileOpen) setMobileOpen(false);
  };

  // Only the active, used routes in Fabricate:
  const railItems = [
    { 
      name: 'Console Dashboard', 
      icon: Home, 
      path: '/app', 
      exact: true 
    },
    { 
      name: 'Supplier Marketplace', 
      icon: Building2, 
      path: '/app/marketplace',
      hidden: !isBrand // only shown when used/available
    },
    { 
      name: 'Facility Profile', 
      icon: Building2, 
      path: '/app/register-facility',
      hidden: !isManufacturer
    },
    { 
      name: 'Sourcing & RFQs', 
      icon: Folder, 
      path: '/app/sourcing' 
    },
    { 
      name: 'Fabricate AI Assistant', 
      icon: Bot, 
      isAiToggle: true 
    },
    { 
      name: 'Fabricate OS (ERP Suite)', 
      icon: Layers, 
      path: '/os' 
    },
    { 
      name: 'Edge CRM Suite', 
      icon: Box, 
      path: '/edge' 
    },
    { 
      name: 'Connect Supplier Network', 
      icon: ArrowUpRight, 
      path: '/connect' 
    },
  ].filter(item => !item.hidden);

  const renderRail = () => (
    <div className="flex flex-col h-full items-center py-4 select-none justify-between">
      <div className="flex flex-col items-center w-full">
        {/* 1. Top Logo Mark: Bold Fabricate 'f.' mark inside Keychain yellow circle */}
        <Link 
          to="/app" 
          onClick={handleNavClick}
          className="w-9 h-9 rounded-full bg-[#f5cb39] text-[#111111] flex items-center justify-center font-bold text-lg select-none mb-4 shadow-2xs hover:scale-105 active:scale-95 transition-all group"
          title="Fabricate"
        >
          <span className="font-bold text-base lowercase tracking-tighter leading-none flex items-baseline">
            f<span className="text-[10px] leading-none text-black">.</span>
          </span>
        </Link>

        {/* 2. Focused Navigation Stack: Only active, functional routes */}
        <nav className="flex flex-col items-center space-y-2 w-full">
          {railItems.map((item, idx) => {
            const Icon = item.icon;

            // AI Assistant toggle item (Solid yellow pill matching screenshot)
            if (item.isAiToggle) {
              return (
                <div key={item.name + idx} className="relative group">
                  <button
                    type="button"
                    onClick={() => setAiPanelOpen && setAiPanelOpen(prev => !prev)}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                      aiPanelOpen 
                        ? 'bg-[#f5cb39] text-[#111111] shadow-xs' 
                        : 'text-[#888880] hover:text-[#111111] hover:bg-[#f4f4f2]'
                    }`}
                    title={item.name}
                  >
                    <Icon size={18} strokeWidth={2} />
                  </button>

                  {/* Floating Tooltip */}
                  <div className="absolute left-12 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center z-50 pointer-events-none">
                    <div className="bg-[#111111] text-white text-[11px] font-medium px-2.5 py-1 rounded-md shadow-lg whitespace-nowrap">
                      {item.name}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={item.name + idx} className="relative group">
                <NavLink
                  to={item.path}
                  end={item.exact}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                      isActive && !aiPanelOpen
                        ? 'bg-[#f5cb39] text-[#111111] shadow-xs'
                        : 'text-[#888880] hover:text-[#111111] hover:bg-[#f4f4f2]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <Icon 
                      size={18} 
                      strokeWidth={isActive && !aiPanelOpen ? 2.1 : 1.7}
                      className={isActive && !aiPanelOpen ? 'text-[#111111]' : 'text-[#888880] group-hover:text-[#111111]'} 
                    />
                  )}
                </NavLink>

                {/* Floating Tooltip */}
                <div className="absolute left-12 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center z-50 pointer-events-none">
                  <div className="bg-[#111111] text-white text-[11px] font-medium px-2.5 py-1 rounded-md shadow-lg whitespace-nowrap">
                    {item.name}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom indicator */}
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mb-1" title="System Connected" />
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar Rail: 56px wide matching screenshot */}
      <aside className="hidden md:flex w-14 border-r border-[#e8e8e5] bg-white flex-col h-[calc(100vh-3.5rem)] shrink-0 z-20 font-sans select-none overflow-y-auto overflow-x-hidden">
        {renderRail()}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)} 
          />
          <div className="relative w-16 bg-white h-full shadow-2xl flex flex-col z-10">
            {renderRail()}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
