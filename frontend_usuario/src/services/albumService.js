import axios from 'axios';
import { API_BASE_URL } from '../config/api.js';

/**
 * GET /apiUsuario/usuarios/:usuarioId/album
 * Carga el álbum completo como estructura de navegación.
 */
export async function fetchUserAlbum(userId) {
  const { data } = await axios.get(`${API_BASE_URL}/usuarios/${userId}/album`);
  return normalizeAlbumResponse(data);
}

/**
 * GET /apiUsuario/usuarios/:usuarioId/selecciones/:codigoSeleccion
 * Carga una sola selección. Esta ruta dispara la resolución lazy de imágenes en backend.
 */
export async function fetchUserSelection(userId, codigoSeleccion) {
  const { data } = await axios.get(
    `${API_BASE_URL}/usuarios/${userId}/selecciones/${codigoSeleccion}`
  );
  return normalizeSeleccion(data);
}

export function normalizeAlbumResponse(data) {
  const selecciones = Array.isArray(data?.selecciones) ? data.selecciones : [];

  return {
    usuarioId: data?.usuarioId ?? '',
    selecciones: selecciones.map(normalizeSeleccion),
  };
}

export function normalizeSeleccion(seleccion) {
  const figuritas = Array.isArray(seleccion?.figuritas) ? seleccion.figuritas : [];
  const figuritasOrdenadas = figuritas
    .map(normalizeFigurita)
    .filter((figurita) => Number.isFinite(figurita.nroFigurita))
    .sort((a, b) => a.nroFigurita - b.nroFigurita)
    .map((figurita, index) => ({
      ...figurita,
      // La grilla del álbum siempre usa posiciones internas 1-29 por selección.
      // El backend ahora también manda nroLocal, pero este fallback mantiene compatibilidad.
      nroLocal: Number.isFinite(figurita.nroLocal) ? figurita.nroLocal : index + 1,
    }));

  return {
    id: String(seleccion?.id ?? '').toUpperCase(),
    nombre: seleccion?.nombre ?? '',
    asociacion: seleccion?.asociacion ?? '',
    flagUrl: seleccion?.flagUrl ?? '',
    imagenesResueltas: Boolean(seleccion?.imagenesResueltas),
    figuritas: figuritasOrdenadas,
    colores: {
      main: seleccion?.colores?.main ?? '#64748b',
      accent1: seleccion?.colores?.accent1 ?? '#94a3b8',
      accent2: seleccion?.colores?.accent2 ?? '#475569',
      text: seleccion?.colores?.text ?? '#ffffff',
    },
  };
}

function toFiniteNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function normalizeFigurita(figurita) {
  const nroFigurita = toFiniteNumber(figurita?.nroFigurita);
  const nroLocal = toFiniteNumber(figurita?.nroLocal ?? figurita?.numeroLocal ?? figurita?.orden);

  return {
    id: Number(figurita?.id),
    nroFigurita,
    nroLocal,
    tipo: figurita?.tipo ?? 'jugador',
    orientacion: figurita?.orientacion === 'landscape' ? 'landscape' : 'portrait',
    fotoUrl: figurita?.fotoUrl ?? null,
    tiene: Boolean(figurita?.tiene),
    jugador: figurita?.jugador
      ? {
          nombre: figurita.jugador.nombre ?? '',
          apellido: figurita.jugador.apellido ?? '',
          fechaNacimiento: figurita.jugador.fechaNacimiento ?? null,
          estatura: figurita.jugador.estatura ?? null,
          peso: figurita.jugador.peso ?? null,
          club: figurita.jugador.club ?? '',
          posicion: figurita.jugador.posicion ?? '',
        }
      : null,
    especial: figurita?.especial ? { nombre: figurita.especial.nombre ?? '' } : null,
  };
}

export function getFiguritaByNumber(figuritas, number) {
  const requestedNumber = Number(number);

  if (!Number.isFinite(requestedNumber)) return null;

  return (
    figuritas.find((figurita) => figurita.nroLocal === requestedNumber) ??
    figuritas.find((figurita) => figurita.nroFigurita === requestedNumber) ??
    null
  );
}

export function countOwnedFiguritas(figuritas) {
  return figuritas.filter((figurita) => figurita.tiene).length;
}
