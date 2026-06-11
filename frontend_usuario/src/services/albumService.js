import axios from 'axios';
import { API_BASE_URL } from '../config/api.js';

/**
 * GET /api/usuarios/:usuarioId/album
 */
export async function fetchUserAlbum(userId) {
  const { data } = await axios.get(`${API_BASE_URL}/usuarios/${userId}/album`);
  return normalizeAlbumResponse(data);
}

export function normalizeAlbumResponse(data) {
  const selecciones = Array.isArray(data?.selecciones) ? data.selecciones : [];

  return {
    usuarioId: data?.usuarioId ?? '',
    selecciones: selecciones.map(normalizeSeleccion),
  };
}

function normalizeSeleccion(seleccion) {
  const figuritas = Array.isArray(seleccion?.figuritas) ? seleccion.figuritas : [];

  return {
    id: String(seleccion?.id ?? '').toUpperCase(),
    nombre: seleccion?.nombre ?? '',
    asociacion: seleccion?.asociacion ?? '',
    flagUrl: seleccion?.flagUrl ?? '',
    colores: {
      main: seleccion?.colores?.main ?? '#64748b',
      accent1: seleccion?.colores?.accent1 ?? '#94a3b8',
      accent2: seleccion?.colores?.accent2 ?? '#475569',
      text: seleccion?.colores?.text ?? '#ffffff',
    },
    figuritas: figuritas.map(normalizeFigurita).sort((a, b) => a.nroFigurita - b.nroFigurita),
  };
}

function normalizeFigurita(figurita) {
  return {
    id: Number(figurita?.id),
    nroFigurita: Number(figurita?.nroFigurita),
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
  return figuritas.find((figurita) => figurita.nroFigurita === number) ?? null;
}

export function countOwnedFiguritas(figuritas) {
  return figuritas.filter((figurita) => figurita.tiene).length;
}
