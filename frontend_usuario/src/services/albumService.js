import axios from 'axios';
import { API_BASE_URL } from '../config/api.js';

function getAuthConfig(accessToken) {
  if (!accessToken) return undefined;

  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
}


export async function fetchUserAlbum(userId, accessToken = null) {
  const endpoint = accessToken
    ? `${API_BASE_URL}/me/album`
    : `${API_BASE_URL}/usuarios/${userId}/album`;

  const { data } = await axios.get(endpoint, getAuthConfig(accessToken));
  return normalizeAlbumResponse(data);
}


export async function fetchUserSelection(userId, codigoSeleccion, accessToken = null) {
  const endpoint = accessToken
    ? `${API_BASE_URL}/me/selecciones/${codigoSeleccion}`
    : `${API_BASE_URL}/usuarios/${userId}/selecciones/${codigoSeleccion}`;

  const { data } = await axios.get(endpoint, getAuthConfig(accessToken));
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
    .sort((a, b) => {
      const localA = Number.isFinite(a.nroLocal) ? a.nroLocal : a.nroFigurita;
      const localB = Number.isFinite(b.nroLocal) ? b.nroLocal : b.nroFigurita;
      return localA - localB;
    })
    .map((figurita, index) => ({
      ...figurita,
      nroLocal: Number.isFinite(figurita.nroLocal) ? figurita.nroLocal : index + 1,
    }));

  return {
    id: String(seleccion?.id ?? '').toUpperCase(),
    nombre: seleccion?.nombre ?? '',
    asociacion: seleccion?.asociacion ?? '',
    flagUrl: seleccion?.flagUrl ?? '',
    grupo: String(seleccion?.grupo ?? '').toUpperCase(),
    nroDesde: toFiniteNumber(seleccion?.nroDesde),
    nroHasta: toFiniteNumber(seleccion?.nroHasta),
    imagenesResueltas: Boolean(seleccion?.imagenesResueltas),
    colores: {
      main: seleccion?.colores?.main ?? '#64748b',
      accent1: seleccion?.colores?.accent1 ?? '#94a3b8',
      accent2: seleccion?.colores?.accent2 ?? '#475569',
      text: seleccion?.colores?.text ?? '#ffffff',
    },
    figuritas: figuritasOrdenadas,
  };
}

function toFiniteNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function normalizeTipo(tipo) {
  const raw = String(tipo ?? 'jugador').trim().toLowerCase();
  if (raw === 'foto_equipo') return 'foto_seleccion';
  if (raw === 'j') return 'jugador';
  if (raw === 'e') return 'especial';
  return raw || 'jugador';
}

function normalizeFigurita(figurita) {
  const nroFigurita = toFiniteNumber(figurita?.nroFigurita);
  const nroLocal = toFiniteNumber(figurita?.nroLocal ?? figurita?.numeroLocal ?? figurita?.orden);

  return {
    id: Number(figurita?.id),
    nroFigurita,
    nroLocal,
    tipo: normalizeTipo(figurita?.tipo),
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

export async function fetchStickerPackStatus(userId, accessToken = null) {
  const endpoint = accessToken
    ? `${API_BASE_URL}/me/paquete/estado`
    : `${API_BASE_URL}/usuarios/${userId}/paquete/estado`;

  const { data } = await axios.get(endpoint, getAuthConfig(accessToken));
  return normalizePackStatus(data);
}

export async function openStickerPack(userId, accessToken = null) {
  const endpoint = accessToken
    ? `${API_BASE_URL}/me/paquete/abrir`
    : `${API_BASE_URL}/usuarios/${userId}/paquete/abrir`;

  const { data } = await axios.post(endpoint, undefined, getAuthConfig(accessToken));
  return normalizeOpenedPack(data);
}

export function normalizePackStatus(data) {
  return {
    disponible: Boolean(data?.disponible),
    intervaloHoras: Number(data?.intervaloHoras ?? 4),
    figuritasPorPaquete: Number(data?.figuritasPorPaquete ?? 7),
    ultimoPaqueteAbiertoAt: data?.ultimoPaqueteAbiertoAt ?? null,
    proximoPaqueteDisponibleAt: data?.proximoPaqueteDisponibleAt ?? null,
    milisegundosRestantes: Number(data?.milisegundosRestantes ?? 0),
  };
}

export function normalizeOpenedPack(data) {
  const figuritas = Array.isArray(data?.figuritas) ? data.figuritas : [];

  return {
    abiertoAt: data?.abiertoAt ?? null,
    estado: normalizePackStatus(data?.estado),
    figuritas: figuritas.map((figurita) => ({
      id: Number(figurita?.id),
      nroFigurita: Number(figurita?.nroFigurita),
      nroLocal: Number(figurita?.nroLocal),
      nombre: figurita?.nombre ?? '',
      tipo: normalizeTipo(figurita?.tipo),
      yaLaTenia: Boolean(figurita?.yaLaTenia),
      seleccion: figurita?.seleccion
        ? {
            id: String(figurita.seleccion.id ?? '').toUpperCase(),
            nombre: figurita.seleccion.nombre ?? '',
          }
        : null,
    })),
  };
}
