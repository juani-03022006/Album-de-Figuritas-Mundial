import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  abrirPaqueteByUsuarioCodigo,
  getAlbumByUsuarioCodigo,
} from '../src/services/albumService.js';

function createFetchResponse({ ok = true, status = 200, body = {} } = {}) {
  return {
    ok,
    status,
    json: vi.fn().mockResolvedValue(body),
  };
}

describe('backend_usuario albumService', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('consulta el álbum y envía al API los datos del usuario autenticado', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      createFetchResponse({ body: { usuarioId: 'demo', selecciones: [] } })
    );
    vi.stubGlobal('fetch', fetchMock);

    const result = await getAlbumByUsuarioCodigo('demo user', {
      username: 'demo',
      nombre: 'Usuario',
      apellido: 'Demo',
      email: 'demo@mail.com',
    });

    expect(result).toEqual({ usuarioId: 'demo', selecciones: [] });
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3100/album/usuarios/demo%20user/album', {
      method: 'GET',
      headers: {
        'x-keycloak-username': 'demo',
        'x-keycloak-name': 'Usuario Demo',
        'x-keycloak-email': 'demo@mail.com',
      },
    });
  });

  it('propaga statusCode y details cuando la API devuelve error', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      createFetchResponse({
        ok: false,
        status: 409,
        body: { message: 'Todavía no hay un paquete disponible', details: { restante: 1000 } },
      })
    );
    vi.stubGlobal('fetch', fetchMock);

    await expect(abrirPaqueteByUsuarioCodigo('demo')).rejects.toMatchObject({
      message: 'Todavía no hay un paquete disponible',
      statusCode: 409,
      details: { restante: 1000 },
    });
  });
});
