import { describe, expect, it, vi } from 'vitest';
import { requiereRol, requiereUsuario } from '../src/middleware/authorization.js';

function createResponse() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe('authorization middleware', () => {
  it('rechaza rutas que requieren usuario cuando no hay req.user', () => {
    const req = {};
    const res = createResponse();
    const next = vi.fn();

    requiereUsuario(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Se requiere autenticación' });
    expect(next).not.toHaveBeenCalled();
  });

  it('permite continuar si el usuario tiene el rol requerido', () => {
    const req = { user: { roles: ['usuario', 'admin'] } };
    const res = createResponse();
    const next = vi.fn();

    requiereRol('admin')(req, res, next);

    expect(next).toHaveBeenCalledOnce();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('responde 403 si el usuario no tiene el rol requerido', () => {
    const req = { user: { roles: ['usuario'] } };
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
});
