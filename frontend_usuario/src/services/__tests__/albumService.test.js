import axios from 'axios';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  countOwnedFiguritas,
  fetchStickerPackStatus,
  fetchUserAlbum,
  fetchUserSelection,
  getFiguritaByNumber,
  normalizeOpenedPack,
  normalizeSeleccion,
  openStickerPack,
} from '../albumService.js';

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe('frontend_usuario/services/albumService', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('usa rutas /me cuando recibe accessToken de Keycloak', async () => {
    axios.get.mockResolvedValueOnce({ data: { usuarioId: 'mora', selecciones: [] } });

    await fetchUserAlbum('demo', 'TOKEN_DE_PRUEBA');

    expect(axios.get).toHaveBeenCalledWith('/apiUsuario/me/album', {
      headers: { Authorization: 'Bearer TOKEN_DE_PRUEBA' },
    });
  });

  it('usa rutas explicitas de desarrollo cuando no recibe token', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        id: 'arg',
        nombre: 'ARGENTINA',
        figuritas: [],
      },
    });

    await fetchUserSelection('demo', 'ARG');

    expect(axios.get).toHaveBeenCalledWith('/apiUsuario/usuarios/demo/selecciones/ARG', undefined);
  });

  it('normaliza y ordena figuritas por numero global, conservando nroLocal', () => {
    const seleccion = normalizeSeleccion({
      id: 'arg',
      nombre: 'ARGENTINA',
      colores: { main: '#111111' },
      figuritas: [
        { id: 2, nroFigurita: 12, tipo: 'jugador', tiene: true, jugador: { nombre: 'Lionel', apellido: 'Messi' } },
        { id: 1, nroFigurita: 10, nroLocal: 3, tipo: 'escudo', especial: { nombre: 'Escudo' } },
        { id: 99, nroFigurita: 'no-numero' },
      ],
    });

    expect(seleccion.id).toBe('ARG');
    expect(seleccion.colores).toEqual(expect.objectContaining({ main: '#111111' }));
    expect(seleccion.figuritas.map((figurita) => figurita.nroFigurita)).toEqual([10, 12]);
    expect(seleccion.figuritas[0]).toEqual(
      expect.objectContaining({
        nroLocal: 3,
        especial: { nombre: 'Escudo' },
      })
    );
    expect(countOwnedFiguritas(seleccion.figuritas)).toBe(1);
    expect(getFiguritaByNumber(seleccion.figuritas, 3).id).toBe(1);
  });

  it('normaliza estado y apertura de paquetes que llegan desde backend_usuario', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        disponible: true,
        intervaloHoras: 4,
        figuritasPorPaquete: 7,
        milisegundosRestantes: 0,
      },
    });
    axios.post.mockResolvedValueOnce({
      data: {
        abiertoAt: '2026-06-23T10:00:00.000Z',
        estado: { disponible: false, milisegundosRestantes: 14400000 },
        figuritas: [
          {
            id: '5',
            nroFigurita: '5',
            nroLocal: '5',
            nombre: 'Lionel Messi',
            tipo: 'jugador',
            yaLaTenia: false,
            seleccion: { id: 'arg', nombre: 'ARGENTINA' },
          },
        ],
      },
    });

    const estado = await fetchStickerPackStatus('demo', 'TOKEN');
    const paquete = await openStickerPack('demo', 'TOKEN');

    expect(axios.get).toHaveBeenCalledWith('/apiUsuario/me/paquete/estado', {
      headers: { Authorization: 'Bearer TOKEN' },
    });
    expect(axios.post).toHaveBeenCalledWith('/apiUsuario/me/paquete/abrir', undefined, {
      headers: { Authorization: 'Bearer TOKEN' },
    });
    expect(estado).toEqual(expect.objectContaining({ disponible: true, figuritasPorPaquete: 7 }));
    expect(paquete.figuritas[0]).toEqual(
      expect.objectContaining({
        id: 5,
        nroFigurita: 5,
        nroLocal: 5,
        nombre: 'Lionel Messi',
        seleccion: { id: 'ARG', nombre: 'ARGENTINA' },
      })
    );
  });

  it('normalizeOpenedPack tolera respuestas incompletas', () => {
    expect(normalizeOpenedPack(null)).toEqual({
      abiertoAt: null,
      estado: expect.objectContaining({ disponible: false, intervaloHoras: 4 }),
      figuritas: [],
    });
  });
});
