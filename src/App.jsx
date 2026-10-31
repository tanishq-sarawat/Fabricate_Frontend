import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import TopLoadingBar from './components/ui/TopLoadingBar';
import './assets/styles/index.css';

function App() {
  return (
    <BrowserRouter>
      <TopLoadingBar />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
