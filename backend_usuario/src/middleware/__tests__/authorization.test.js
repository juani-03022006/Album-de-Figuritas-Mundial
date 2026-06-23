import { describe, expect, it, vi } from 'vitest';
import { requiereRol, requiereUsuario } from '../authorization.js';

function createResponse() {
  return {
    status: vi.fn(function status() { return this; }),
    json: vi.fn(function json() { return this; }),
  };
}

describe('backend_usuario/middleware/authorization', () => {
  it('rechaza rutas protegidas cuando no hay usuario autenticado', () => {
    const req = {};
    const res = createResponse();
    const next = vi.fn();

    requiereUsuario(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Se requiere autenticación' });
    expect(next).not.toHaveBeenCalled();
  });

  it('permite continuar cuando existe usuario autenticado', () => {
    const req = { user: { username: 'demo', roles: ['usuario'] } };
    const res = createResponse();
    const next = vi.fn();

    requiereUsuario(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  it('rechaza un rol faltante con 403 y comunica el rol requerido', () => {
    const req = { user: { username: 'demo', roles: ['usuario'] } };
    const res = createResponse();
    const next = vi.fn();

    requiereRol('admin')(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: 'No tiene permisos suficientes',
      rolRequerido: 'admin',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('permite avanzar cuando el usuario tiene el rol requerido', () => {
    const req = { user: { username: 'mora', roles: ['usuario', 'admin'] } };
    const res = createResponse();
    const next = vi.fn();

    requiereRol('admin')(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });
});
