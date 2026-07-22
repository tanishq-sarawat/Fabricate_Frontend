import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';
import FactorySearch from '../features/marketplace/FactorySearch';
import RFQTracker from '../features/sourcing/RFQTracker';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import LandingPage from '../features/landing/LandingPage';
import { useAuth } from '../context/AuthContext';

// App Layout enclosing Sidebar and Navbar
const AppLayout = () => {
  const { isBrand } = useAuth();

  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('sidebar_collapsed') === 'true';
  });

  const handleToggleCollapse = (collapsedState) => {
    setIsCollapsed(collapsedState);
    localStorage.setItem('sidebar_collapsed', String(collapsedState));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={handleToggleCollapse} />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 max-w-7xl w-full mx-auto">
          <Routes>
            <Route path="/" element={<RFQTracker />} />
            <Route path="/sourcing" element={<RFQTracker />} />
            <Route path="/marketplace" element={isBrand ? <FactorySearch /> : <Navigate to="/app" replace />} />
            <Route path="*" element={<Navigate to="/app" replace />} />
          </Routes>
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
