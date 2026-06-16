import { API_ALBUM_URL } from '../config/api.js';

async function requestApi(path) {
  const response = await fetch(`${API_ALBUM_URL}${path}`);
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(data?.message || 'Error al consultar la API del album');
    error.statusCode = response.status;
    throw error;
  }

  return data;
}

export async function getAlbumByUsuarioCodigo(codigoUsuario) {
  return requestApi(`/album/usuarios/${codigoUsuario}/album`);
}

export async function getSeleccionByUsuarioCodigo(codigoUsuario, codigoSeleccion) {
  return requestApi(`/album/usuarios/${codigoUsuario}/selecciones/${codigoSeleccion}`);
}
