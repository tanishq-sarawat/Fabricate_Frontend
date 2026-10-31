import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';
import FactorySearch from '../features/marketplace/FactorySearch';
import RFQTracker from '../features/sourcing/RFQTracker';
import ConsoleDashboard from '../features/dashboard/ConsoleDashboard';
import RegisterFacility from '../features/marketplace/RegisterFacility';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import LandingPage from '../features/landing/LandingPage';
import ConnectPage from '../features/products/ConnectPage';
import OSPage from '../features/products/OSPage';
import EdgePage from '../features/products/EdgePage';
import AIAssistantPanel from '../components/AIAssistantPanel';
import { useAuth } from '../context/AuthContext';

// App Layout enclosing full-width Navbar, Sidebar, and Keychain AI Assistant
const AppLayout = () => {
  const { isBrand } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);

  return (
    <div className="h-screen w-screen bg-[#f8f9fb] flex flex-col font-sans overflow-hidden">
      {/* 1. Full-Width Top Bar (Matching Screenshot) */}
      <Navbar 
        onToggleMobileSidebar={() => setMobileSidebarOpen(prev => !prev)}
        onToggleAiPanel={() => setAiPanelOpen(prev => !prev)}
      />

      {/* 2. Workspace Body: Sidebar + AI Assistant Panel + Main Content Area */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        <Sidebar 
          mobileOpen={mobileSidebarOpen}
          setMobileOpen={setMobileSidebarOpen}
          aiPanelOpen={aiPanelOpen}
          setAiPanelOpen={setAiPanelOpen}
        />

        {/* AI Assistant Chat Panel matching screenshot */}
        <AIAssistantPanel 
          isOpen={aiPanelOpen} 
          onClose={() => setAiPanelOpen(false)} 
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-[#f8f9fb]">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<ConsoleDashboard />} />
              <Route path="/sourcing" element={<RFQTracker />} />
              <Route path="/register-facility" element={<RegisterFacility />} />
              <Route path="/marketplace" element={isBrand ? <FactorySearch /> : <Navigate to="/app" replace />} />
              <Route path="*" element={<Navigate to="/app" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/connect" element={<ConnectPage />} />
      <Route path="/os" element={<OSPage />} />
      <Route path="/edge" element={<EdgePage />} />
      <Route path="/crm" element={<Navigate to="/edge" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Layout Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/app/*" element={<AppLayout />} />
      </Route>

      {/* Catch-all redirect to Landing Page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
