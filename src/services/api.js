import axios from 'axios';
import { loadingBar } from '../components/ui/TopLoadingBar';

const rawBaseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const baseURL = rawBaseURL.endsWith('/') ? rawBaseURL.slice(0, -1) : rawBaseURL;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Helper to check if URL is a public permitAll endpoint
const isPublicAuthEndpoint = (url) => {
  if (!url) return false;
  return (
    url.includes('/api/auth/login') ||
    url.includes('/api/auth/register') ||
    url.includes('/api/auth/')
  );
};

// Request interceptor to append JWT token ONLY to protected endpoints and trigger loading bar
api.interceptors.request.use(
  (config) => {
    loadingBar.start();
    const token = localStorage.getItem('token');

    // Login & Register (/api/auth/*) are permitAll in backend security config.
    // Ensure no Authorization header is sent for public auth endpoints.
    if (isPublicAuthEndpoint(config.url)) {
      delete config.headers.Authorization;
    } else if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    loadingBar.done();
    return Promise.reject(error);
  }
);

// Response interceptor to handle expired or invalid tokens and finish loading bar
api.interceptors.response.use(
  (response) => {
    loadingBar.done();
    return response;
  },
  (error) => {
    loadingBar.done();
    const isPublic = isPublicAuthEndpoint(error.config?.url);

    // Only clear token and dispatch session expiration on 401 Unauthorized for protected endpoints.
    // Note: 403 Forbidden indicates insufficient role permissions (e.g. Manufacturer accessing Brand endpoint),
    // and must NOT invalidate or wipe the user's valid session!
    if (error.response && error.response.status === 401 && !isPublic) {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
      localStorage.removeItem('userCompany');

      sessionStorage.setItem('auth_notice', 'Your session has expired. Please log in again.');
      window.dispatchEvent(new Event('auth:unauthorized'));

      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
