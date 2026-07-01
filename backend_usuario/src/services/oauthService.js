import crypto from 'node:crypto';
import {
  KEYCLOAK_AUTHORIZATION_ENDPOINT,
  BACKEND_PUBLIC_URL,
  FRONTEND_URL,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_LOGOUT_ENDPOINT,
  KEYCLOAK_PKCE_METHOD,
  KEYCLOAK_REDIRECT_URI,
  KEYCLOAK_REGISTRATION_ENDPOINT,
  KEYCLOAK_TOKEN_ENDPOINT,
} from '../config/keycloak.js';

const pendingLogins = new Map();
const LOGIN_TTL_MS = 5 * 60 * 1000;

function base64UrlEncode(buffer) {
  return buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function generarValorSeguro() {
  return base64UrlEncode(crypto.randomBytes(32));
}

function generarCodeChallenge(codeVerifier) {
  if (KEYCLOAK_PKCE_METHOD === 'S256') {
    const hash = crypto.createHash('sha256').update(codeVerifier).digest();
    return base64UrlEncode(hash);
  }

  return codeVerifier;
}

function limpiarLoginsExpirados() {
  const now = Date.now();
  for (const [state, data] of pendingLogins.entries()) {
    if (now - data.createdAt > LOGIN_TTL_MS) {
      pendingLogins.delete(state);
    }
  }
}

class OAuthService {
  crearUrlAutenticacion({ mode = 'login' } = {}) {
    limpiarLoginsExpirados();

    const state = generarValorSeguro();
    const codeVerifier = generarValorSeguro();
    const codeChallenge = generarCodeChallenge(codeVerifier);

    pendingLogins.set(state, {
      codeVerifier,
      createdAt: Date.now(),
    });

    const params = new URLSearchParams({
      client_id: KEYCLOAK_CLIENT_ID,
      response_type: 'code',
      scope: 'openid profile email',
      redirect_uri: KEYCLOAK_REDIRECT_URI,
      state,
      code_challenge: codeChallenge,
      code_challenge_method: KEYCLOAK_PKCE_METHOD,
    });

    const endpoint = mode === 'register'
      ? KEYCLOAK_REGISTRATION_ENDPOINT
      : KEYCLOAK_AUTHORIZATION_ENDPOINT;

    return `${endpoint}?${params.toString()}`;
  }

  iniciarLogin() {
    return this.crearUrlAutenticacion({ mode: 'login' });
  }

  iniciarRegistro() {
    return this.crearUrlAutenticacion({ mode: 'register' });
  }

  crearUrlLogout({ next = 'frontend' } = {}) {
    const postLogoutRedirectUri = next === 'register'
      ? `${BACKEND_PUBLIC_URL}/register`
      : FRONTEND_URL;

    const params = new URLSearchParams({
      client_id: KEYCLOAK_CLIENT_ID,
      post_logout_redirect_uri: postLogoutRedirectUri,
    });

    return `${KEYCLOAK_LOGOUT_ENDPOINT}?${params.toString()}`;
  }

  async intercambiarCodigoPorTokens({ code, state }) {
    limpiarLoginsExpirados();

    const loginData = pendingLogins.get(state);

    if (!loginData) {
      throw new Error('State inválido o expirado');
    }

    pendingLogins.delete(state);

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: KEYCLOAK_CLIENT_ID,
      code,
      redirect_uri: KEYCLOAK_REDIRECT_URI,
      code_verifier: loginData.codeVerifier,
    });

    const response = await fetch(KEYCLOAK_TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Error al intercambiar code por tokens: ${errorBody}`);
    }

    return response.json();
  }
}

export default new OAuthService();
