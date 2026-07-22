import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [role, setRole] = useState(localStorage.getItem('userRole') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('userRole');
    const storedEmail = localStorage.getItem('userEmail');

    if (storedToken) {
      setToken(storedToken);
      setRole(storedRole || 'BRAND');
      setUser({
        email: storedEmail || '',
        role: storedRole || 'BRAND',
      });
    } else {
      setToken(null);
      setRole(null);
      setUser(null);
    }
    setLoading(false);
  }, []);

  const handleAuthSuccess = (authResponse) => {
    const { token: jwtToken, email, role: userRole } = authResponse;
    localStorage.setItem('token', jwtToken);
    localStorage.setItem('userRole', userRole);
    if (email) localStorage.setItem('userEmail', email);

    setToken(jwtToken);
    setRole(userRole);
    setUser({ email, role: userRole });
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await loginUser({ email, password });
      handleAuthSuccess(response);
      return { success: true, data: response };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data || err.message || 'Login failed';
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, userRole) => {
    setLoading(true);
    try {
      const response = await registerUser({ email, password, role: userRole });
      handleAuthSuccess(response);
      return { success: true, data: response };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data || err.message || 'Registration failed';
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
  };

  const isBrand = role === 'BRAND';
  const isManufacturer = role === 'MANUFACTURER';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role,
        isBrand,
        isManufacturer,
        loading,
        login,
        register,
        logout,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
