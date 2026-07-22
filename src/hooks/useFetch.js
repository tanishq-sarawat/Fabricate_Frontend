import { useState, useCallback } from 'react';
import api from '../services/api';

export const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api({
        url,
        method: options.method || 'GET',
        data: options.body || null,
        params: options.params || null,
        headers: options.headers || {},
      });
      setData(response.data);
      return { data: response.data, success: true };
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Something went wrong';
      setError(errMsg);
      return { error: errMsg, success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  const clearState = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, request, clearState };
};
export default useFetch;
