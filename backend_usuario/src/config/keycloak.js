export const KEYCLOAK_AUTH_ENABLED = process.env.KEYCLOAK_AUTH_ENABLED !== 'false';

export const KEYCLOAK_BASE_URL = process.env.KEYCLOAK_BASE_URL || 'http://localhost:8081';
export const KEYCLOAK_REALM = process.env.KEYCLOAK_REALM || 'dds-tareas';
export const KEYCLOAK_CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID || 'dds-tareas-node-backend';
export const KEYCLOAK_REDIRECT_URI =
  process.env.KEYCLOAK_REDIRECT_URI || 'http://localhost:4000/auth/callback';

export const ADMIN_FRONTEND_URL = process.env.ADMIN_FRONTEND_URL || 'http://localhost:5000';
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
export const BACKEND_PUBLIC_URL =
  process.env.BACKEND_PUBLIC_URL || `http://localhost:${process.env.PORT || 4000}`;

export const KEYCLOAK_ISSUER = `${KEYCLOAK_BASE_URL}/realms/${KEYCLOAK_REALM}`;
export const KEYCLOAK_JWKS_URI = `${KEYCLOAK_ISSUER}/protocol/openid-connect/certs`;
export const KEYCLOAK_AUTHORIZATION_ENDPOINT =
  `${KEYCLOAK_ISSUER}/protocol/openid-connect/auth`;
export const KEYCLOAK_TOKEN_ENDPOINT =
  `${KEYCLOAK_ISSUER}/protocol/openid-connect/token`;
export const KEYCLOAK_REGISTRATION_ENDPOINT =
  `${KEYCLOAK_ISSUER}/protocol/openid-connect/registrations`;
export const KEYCLOAK_LOGOUT_ENDPOINT =
  `${KEYCLOAK_ISSUER}/protocol/openid-connect/logout`;


export const KEYCLOAK_AUDIENCE = process.env.KEYCLOAK_AUDIENCE || 'none';


export const KEYCLOAK_USER_ID_CLAIM =
  process.env.KEYCLOAK_USER_ID_CLAIM || 'preferred_username';


export const KEYCLOAK_ADMIN_USERNAMES = (process.env.KEYCLOAK_ADMIN_USERNAMES || 'admin_album')
  .split(',')
  .map((username) => username.trim())
  .filter(Boolean);

export const KEYCLOAK_DEV_USER_ID = process.env.KEYCLOAK_DEV_USER_ID || 'demo';
export const KEYCLOAK_PKCE_METHOD = process.env.KEYCLOAK_PKCE_METHOD || 'plain';
