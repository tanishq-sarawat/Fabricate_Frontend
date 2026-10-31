import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { loginUser, registerUser } from '../services/authService';
import { parseJwt, isTokenExpired, getTokenTimeRemaining } from '../utils/jwt';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const expirationTimerRef = useRef(null);

  // Clear any existing expiration timeout
  const clearExpirationTimer = () => {
    if (expirationTimerRef.current) {
      clearTimeout(expirationTimerRef.current);
      expirationTimerRef.current = null;
    }
  };

  // Logout handler with optional reason ('session_expired', etc.)
  const logout = useCallback((reason = '') => {
    clearExpirationTimer();
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userCompany');

    if (reason === 'session_expired') {
      sessionStorage.setItem('auth_notice', 'Your session has expired. Please sign in again.');
    } else {
      sessionStorage.removeItem('auth_notice');
    }

    setToken(null);
    setRole(null);
    setUser(null);

    // Notify other components & tabs
    window.dispatchEvent(new Event('auth:logout'));
  }, []);

  // Schedule auto-logout when token expiration time is reached
  const scheduleTokenExpiration = useCallback((jwtToken) => {
    clearExpirationTimer();
    const remainingMs = getTokenTimeRemaining(jwtToken);
    if (remainingMs <= 0) {
      logout('session_expired');
      return;
    }

    expirationTimerRef.current = setTimeout(() => {
      logout('session_expired');
    }, remainingMs);
  }, [logout]);

  // Establish authenticated session state from server response
  const handleAuthSuccess = useCallback((authResponse, extraProfile = {}) => {
    const { token: jwtToken, email: resEmail, role: resRole } = authResponse;
    if (!jwtToken) {
      throw new Error('No authentication token received from server');
    }

    const payload = parseJwt(jwtToken);
    const canonicalEmail = resEmail || payload?.sub || '';
    const canonicalRole = resRole || payload?.role || 'BRAND';

    localStorage.setItem('token', jwtToken);
    localStorage.setItem('userRole', canonicalRole);
    if (canonicalEmail) localStorage.setItem('userEmail', canonicalEmail);
    if (extraProfile.name) localStorage.setItem('userName', extraProfile.name);
    if (extraProfile.company) localStorage.setItem('userCompany', extraProfile.company);

    setToken(jwtToken);
    setRole(canonicalRole);
    setUser({
      email: canonicalEmail,
      role: canonicalRole,
      name: extraProfile.name || localStorage.getItem('userName') || '',
      company: extraProfile.company || localStorage.getItem('userCompany') || '',
    });

    scheduleTokenExpiration(jwtToken);
  }, [scheduleTokenExpiration]);

  // Initial session hydration on app load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('userRole');
    const storedEmail = localStorage.getItem('userEmail');
    const storedName = localStorage.getItem('userName');
    const storedCompany = localStorage.getItem('userCompany');

    if (storedToken) {
      if (isTokenExpired(storedToken)) {
        // Expired token: clear dirty storage
        logout('session_expired');
      } else {
        const payload = parseJwt(storedToken);
        const resolvedRole = payload?.role || storedRole || 'BRAND';
        const resolvedEmail = payload?.sub || storedEmail || '';

        setToken(storedToken);
        setRole(resolvedRole);
        setUser({
          email: resolvedEmail,
          role: resolvedRole,
          name: storedName || '',
          company: storedCompany || '',
        });
        scheduleTokenExpiration(storedToken);
      }
    } else {
      setToken(null);
      setRole(null);
      setUser(null);
    }
    setLoading(false);

    return () => clearExpirationTimer();
  }, [logout, scheduleTokenExpiration]);

  // Multi-tab synchronization & unauthorized event listener
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'token') {
        if (!e.newValue) {
          // Token deleted in another tab (user logged out)
          clearExpirationTimer();
          setToken(null);
          setRole(null);
          setUser(null);
        } else if (!isTokenExpired(e.newValue)) {
          // New login in another tab
          const payload = parseJwt(e.newValue);
          const newRole = payload?.role || localStorage.getItem('userRole') || 'BRAND';
          const newEmail = payload?.sub || localStorage.getItem('userEmail') || '';
          setToken(e.newValue);
          setRole(newRole);
          setUser({
            email: newEmail,
            role: newRole,
            name: localStorage.getItem('userName') || '',
            company: localStorage.getItem('userCompany') || '',
          });
          scheduleTokenExpiration(e.newValue);
        }
      }
    };

    const handleUnauthorizedEvent = () => {
      logout('session_expired');
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('auth:unauthorized', handleUnauthorizedEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth:unauthorized', handleUnauthorizedEvent);
    };
  }, [logout, scheduleTokenExpiration]);

  // Login handler
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await loginUser({ email, password });
      handleAuthSuccess(response);
      return { success: true, data: response };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        (typeof err.response?.data === 'string' ? err.response.data : null) ||
        err.message ||
        'Login failed';
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Register handler (with seamless auto-login)
  const register = async (email, password, userRole, profile = {}) => {
    setLoading(true);
    try {
      // 1. Create account on backend
      await registerUser({ email, password, role: userRole });

      // 2. Automatically log in to establish JWT session
      const authResponse = await loginUser({ email, password });
      handleAuthSuccess(authResponse, profile);
      return { success: true, data: authResponse };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        (typeof err.response?.data === 'string' ? err.response.data : null) ||
        err.message ||
        'Registration failed';
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
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
