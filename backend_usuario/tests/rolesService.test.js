import { describe, expect, it } from 'vitest';
import { getRolesFromPayload, isAdminPayload } from '../src/services/rolesService.js';

describe('rolesService', () => {
  it('mantiene los roles recibidos desde Keycloak', () => {
    const roles = getRolesFromPayload({ realm_access: { roles: ['usuario'] } });

    expect(roles).toContain('usuario');
    expect(roles).not.toContain('admin');
  });

  it('trata a admin_album como administrador aunque el token no traiga ese rol', () => {
    const payload = {
      preferred_username: 'admin_album',
      realm_access: { roles: ['usuario'] },
    };

    expect(getRolesFromPayload(payload)).toEqual(expect.arrayContaining(['usuario', 'admin']));
    expect(isAdminPayload(payload)).toBe(true);
  });
});
