/**
 * Safe JWT parser and validator for client-side session management.
 * Parses standard Base64 / Base64URL encoded payload claims without external dependencies.
 */

export const parseJwt = (token) => {
  if (!token || typeof token !== 'string') return null;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

/**
 * Checks if a JWT token has expired.
 * Includes a 10-second margin of safety.
 */
export const isTokenExpired = (token) => {
  const payload = parseJwt(token);
  if (!payload || !payload.exp) return true;
  return payload.exp * 1000 <= Date.now() + 10000;
};

/**
 * Calculates remaining milliseconds before the token expires.
 * Returns 0 if already expired or invalid.
 */
export const getTokenTimeRemaining = (token) => {
  const payload = parseJwt(token);
  if (!payload || !payload.exp) return 0;
  const remaining = payload.exp * 1000 - Date.now();
  return remaining > 0 ? remaining : 0;
};

export default {
  parseJwt,
  isTokenExpired,
  getTokenTimeRemaining,
};
