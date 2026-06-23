import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  abrirPaqueteByUsuarioCodigo,
  getAlbumByUsuarioCodigo,
  getEstadoPaqueteByUsuarioCodigo,
  getSeleccionByUsuarioCodigo,
} from '../albumService.js';

function mockFetchResponse({ ok = true, status = 200, body = {} } = {}) {
  return Promise.resolve({
    ok,
    status,
    json: vi.fn().mockResolvedValue(body),
  });
}

describe('backend_usuario/services/albumService', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('consulta el album por la ruta explicita cuando no hay token de Keycloak', async () => {
    const album = { usuarioId: 'demo', selecciones: [] };
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      await mockFetchResponse({ body: album })
    );

    const result = await getAlbumByUsuarioCodigo('demo');

    expect(result).toEqual(album);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3100/album/usuarios/demo/album',
      expect.objectContaining({ method: 'GET', headers: {} })
    );
  });

  it('envia los datos del usuario autenticado como headers hacia APIAlbumMundial', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      await mockFetchResponse({ body: { id: 'ARG', figuritas: [] } })
    );

    await getSeleccionByUsuarioCodigo('mora sasso', 'arg', {
      username: 'mora',
      nombre: 'Mora',
      apellido: 'Garcia Sasso',
      email: 'mora@example.com',
    });

    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3100/album/usuarios/mora%20sasso/selecciones/arg',
      expect.objectContaining({
        headers: {
          'x-keycloak-username': 'mora',
          'x-keycloak-name': 'Mora Garcia Sasso',
          'x-keycloak-email': 'mora@example.com',
        },
      })
    );
  });

  it('propaga codigo de estado y detalles cuando la API responde error', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      await mockFetchResponse({
        ok: false,
        status: 409,
        body: {
          message: 'Todavía no hay un paquete disponible para este usuario',
          details: { disponible: false, milisegundosRestantes: 1000 },
        },
      })
    );

    await expect(abrirPaqueteByUsuarioCodigo('demo')).rejects.toMatchObject({
      message: 'Todavía no hay un paquete disponible para este usuario',
      statusCode: 409,
      details: { disponible: false, milisegundosRestantes: 1000 },
    });
  });

  it('usa POST para abrir paquete y GET para consultar estado', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      await mockFetchResponse({ body: { disponible: true } })
    );

    await getEstadoPaqueteByUsuarioCodigo('demo');
    await abrirPaqueteByUsuarioCodigo('demo');

    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      'http://localhost:3100/album/usuarios/demo/paquete/estado',
      expect.objectContaining({ method: 'GET' })
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      'http://localhost:3100/album/usuarios/demo/paquete/abrir',
      expect.objectContaining({ method: 'POST' })
    );
  });
});
