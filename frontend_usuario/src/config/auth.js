export const AUTH_ENABLED = import.meta.env.VITE_AUTH_ENABLED !== 'false';
export const AUTH_BASE_URL = import.meta.env.VITE_AUTH_URL || 'http://localhost:4000';
export const ACCESS_TOKEN_STORAGE_KEY = 'album_access_token';
