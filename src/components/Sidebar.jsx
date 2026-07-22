import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Store, FileText, LogOut, User, Layers, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const { user, role, isBrand, isManufacturer, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = isManufacturer
    ? [{ name: 'Sourcing & Bids', path: '/app', icon: FileText }]
    : [
        { name: 'Console Dashboard', path: '/app', icon: LayoutDashboard },
        { name: 'Supplier Marketplace', path: '/app/marketplace', icon: Store },
        { name: 'Sourcing & RFQs', path: '/app/sourcing', icon: FileText },
      ];

  return (
    <aside
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } border-r border-slate-200/80 bg-white flex flex-col h-screen sticky top-0 shadow-xs z-30 transition-all duration-300 ease-in-out font-sans select-none`}
    >
      {/* Logo Header & Collapse Toggle */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shadow-xs shrink-0">
            <Layers className="h-5 w-5" />
          </div>
          {!isCollapsed && (
            <span className="font-logo text-xl font-extrabold lowercase text-slate-900 tracking-logo-tight truncate">
              fabricate<sup className="ml-0.5 text-[10px] font-semibold text-amber-500">®</sup>
            </span>
          )}
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors border border-transparent hover:border-slate-200 cursor-pointer"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Role Banner */}
      {!isCollapsed ? (
        <div className="mx-4 mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
          <div className="overflow-hidden">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Workspace</span>
            <span className="text-xs font-bold text-slate-900 truncate block">
              {isBrand ? 'Brand Sourcing' : 'Manufacturer Bids'}
            </span>
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-4 w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center" title={isBrand ? 'Brand Sourcing' : 'Manufacturer Bids'}>
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
        </div>
      )}

      {/* Navigation menu links */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        {!isCollapsed && (
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2 block">
            Navigation
          </span>
        )}

        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/app'}
              title={isCollapsed ? item.name : undefined}
              className={({ isActive }) =>
                `flex items-center justify-between py-2.5 rounded-xl text-sm transition-all duration-200 ${
                  isCollapsed ? 'px-0 justify-center' : 'px-3.5'
                } ${
                  isActive
                    ? 'bg-slate-100/90 text-slate-900 font-extrabold border border-slate-200/90 shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <Icon size={18} className={isActive ? 'text-amber-600' : 'text-slate-400'} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </div>

                  {!isCollapsed && isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User profile & Logout */}
      <div className="p-3 border-t border-slate-100 space-y-3 bg-slate-50/50">
        {!isCollapsed ? (
          <>
            <div className="flex items-center gap-2.5 overflow-hidden px-1">
              <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-600 shrink-0 font-bold text-xs">
                <User size={15} />
              </div>
              <div className="overflow-hidden flex-1">
                <p className="text-xs font-bold text-slate-900 truncate">{user?.email || 'User Session'}</p>
                <span className="inline-block text-[9px] font-bold text-amber-800 bg-amber-100/80 border border-amber-200 px-1.5 py-0.2 rounded mt-0.5 uppercase tracking-wider">
                  {role || 'BRAND'}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer bg-white shadow-2xs"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3 py-1">
            <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-600 font-bold text-xs" title={user?.email || 'User Session'}>
              <User size={15} />
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer bg-white shadow-2xs"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
