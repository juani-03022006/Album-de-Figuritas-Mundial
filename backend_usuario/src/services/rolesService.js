import { KEYCLOAK_ADMIN_USERNAMES } from '../config/keycloak.js';

export function getRolesFromPayload(payload) {
  const roles = new Set(payload?.realm_access?.roles ?? []);
  const username = payload?.preferred_username;

  if (username && KEYCLOAK_ADMIN_USERNAMES.includes(username)) {
    roles.add('admin');
    roles.add('usuario');
  }

  return [...roles];
}

export function isAdminPayload(payload) {
  return getRolesFromPayload(payload).includes('admin');
}
