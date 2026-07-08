import { describe, expect, it } from 'vitest';
import oauthService from '../src/services/oauthService.js';

describe('oauthService', () => {
  it('crea una URL de login con Authorization Code Flow y PKCE', () => {
    const url = new URL(oauthService.iniciarLogin());

    expect(url.origin + url.pathname).toBe(
      'http://localhost:8081/realms/dds-tareas/protocol/openid-connect/auth'
    );
    expect(url.searchParams.get('client_id')).toBe('dds-tareas-node-backend');
    expect(url.searchParams.get('response_type')).toBe('code');
    expect(url.searchParams.get('scope')).toBe('openid profile email');
    expect(url.searchParams.get('redirect_uri')).toBe('http://localhost:4000/auth/callback');
    expect(url.searchParams.get('state')).toBeTruthy();
    expect(url.searchParams.get('code_challenge')).toBeTruthy();
    expect(url.searchParams.get('code_challenge_method')).toBe('plain');
  });

  it('crea una URL de logout que vuelve al frontend de usuario por defecto', () => {
    const url = new URL(oauthService.crearUrlLogout());

    expect(url.origin + url.pathname).toBe(
      'http://localhost:8081/realms/dds-tareas/protocol/openid-connect/logout'
    );
    expect(url.searchParams.get('client_id')).toBe('dds-tareas-node-backend');
    expect(url.searchParams.get('post_logout_redirect_uri')).toBe('http://localhost:5173');
  });
});
