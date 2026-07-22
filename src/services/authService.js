import api from './api';

/**
 * Register user
 * @param {{ email: string, password?: string, role: 'BRAND' | 'MANUFACTURER' }} data
 */
export const registerUser = async (data) => {
  const response = await api.post('/api/auth/register', data);
  return response.data;
};

/**
 * Login user
 * @param {{ email: string, password?: string }} credentials
 */
export const loginUser = async (credentials) => {
  const response = await api.post('/api/auth/login', credentials);
  return response.data;
};

export default {
  registerUser,
  loginUser,
};
