import { describe, expect, it, vi } from 'vitest';
import { createAlbumController } from '../albumController.js';
import * as albumService from '../../services/albumService.js';

function createResponse() {
  return {
    status: vi.fn(function status() { return this; }),
    json: vi.fn(function json() { return this; }),
  };
}

describe('backend_usuario/controllers/albumController', () => {
  it('getMyAlbum usa el usuario extraido del token de Keycloak', async () => {
    const album = { usuarioId: 'mora', selecciones: [] };
    const serviceSpy = vi
      .spyOn(albumService, 'getAlbumByUsuarioCodigo')
      .mockResolvedValue(album);
    const controller = createAlbumController();
    const req = {
      user: {
        usuarioId: 'mora',
        username: 'mora',
        nombre: 'Mora',
        apellido: 'Garcia Sasso',
        email: 'mora@example.com',
      },
    };
    const res = createResponse();

    await controller.getMyAlbum(req, res);

    expect(serviceSpy).toHaveBeenCalledWith('mora', req.user);
    expect(res.json).toHaveBeenCalledWith(album);
  });

  it('abrirMyPaquete devuelve el status de error que llega desde APIAlbumMundial', async () => {
    const error = new Error('Todavía no hay un paquete disponible para este usuario');
    error.statusCode = 409;
    error.details = { disponible: false };
    vi.spyOn(albumService, 'abrirPaqueteByUsuarioCodigo').mockRejectedValue(error);

    const controller = createAlbumController();
    const req = { user: { usuarioId: 'demo' } };
    const res = createResponse();

    await controller.abrirMyPaquete(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Todavía no hay un paquete disponible para este usuario',
      details: { disponible: false },
    });
  });
});
