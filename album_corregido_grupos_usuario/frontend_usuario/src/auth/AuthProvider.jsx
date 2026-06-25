import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { DEFAULT_USER_ID } from '../config/api.js';
import { AUTH_BASE_URL, AUTH_ENABLED } from '../config/auth.js';
import { fetchAuthenticatedUser } from '../services/authService.js';
import { clearStoredAccessToken, getStoredAccessToken, storeAccessToken } from './tokenStorage.js';

export const AuthContext = createContext(null);

function readTokenFromCallbackHash() {
  if (window.location.pathname !== '/auth/callback') return null;

  const hash = window.location.hash.startsWith('#')
    ? window.location.hash.slice(1)
    : window.location.hash;

  const params = new URLSearchParams(hash);
  return params.get('access_token');
}

function clearCallbackUrl() {
  if (window.location.pathname === '/auth/callback') {
    window.history.replaceState({}, document.title, '/');
  }
}

export function AuthProvider({ children }) {
  const [isInitialized, setIsInitialized] = useState(!AUTH_ENABLED);
  const [isAuthenticated, setIsAuthenticated] = useState(!AUTH_ENABLED);
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(
    AUTH_ENABLED
      ? null
      : { usuarioId: DEFAULT_USER_ID, username: DEFAULT_USER_ID, roles: ['usuario'] }
  );
  const [error, setError] = useState(null);

  const logout = useCallback(() => {
    clearStoredAccessToken();
    setAccessToken(null);
    setUser(null);
    setIsAuthenticated(false);

    if (AUTH_ENABLED) {
      window.location.href = `${AUTH_BASE_URL}/logout`;
    }
  }, []);

  const loadUser = useCallback(async (token) => {
    try {
      const authenticatedUser = await fetchAuthenticatedUser(token);
      setAccessToken(token);
      setUser(authenticatedUser);
      setIsAuthenticated(true);
      setError(null);
    } catch (requestError) {
      clearStoredAccessToken();
      setAccessToken(null);
      setUser(null);
      setIsAuthenticated(false);
      setError(
        requestError.response?.data?.error ||
          requestError.response?.data?.message ||
          requestError.message ||
          'No se pudo validar la sesión'
      );
    } finally {
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (!AUTH_ENABLED) return;

    const callbackToken = readTokenFromCallbackHash();

    if (callbackToken) {
      storeAccessToken(callbackToken);
      clearCallbackUrl();
      loadUser(callbackToken);
      return;
    }

    const storedToken = getStoredAccessToken();

    if (storedToken) {
      loadUser(storedToken);
      return;
    }

    setIsInitialized(true);
    setIsAuthenticated(false);
  }, [loadUser]);

  const login = useCallback(() => {
    window.location.href = `${AUTH_BASE_URL}/login`;
  }, []);

  const register = useCallback(() => {
    clearStoredAccessToken();
    setAccessToken(null);
    setUser(null);
    setIsAuthenticated(false);

    // Keycloak no permite abrir registro si hay una sesión SSO activa
    // con otro usuario. Primero cerramos la sesión de Keycloak y luego
    // volvemos automáticamente al flujo de registro.
    window.location.href = `${AUTH_BASE_URL}/logout?next=register`;
  }, []);

  const value = useMemo(() => {
    const usuarioId = user?.usuarioId || user?.username || DEFAULT_USER_ID;

    return {
      enabled: AUTH_ENABLED,
      isInitialized,
      isAuthenticated,
      accessToken,
      usuarioId,
      user,
      displayName: user?.nombre || user?.username || usuarioId,
      error,
      login,
      register,
      logout,
    };
  }, [accessToken, error, isAuthenticated, isInitialized, login, logout, register, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
