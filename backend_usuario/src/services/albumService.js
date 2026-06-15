import { API_ALBUM_URL } from '../config/api.js';

export async function getAlbumByUsuarioCodigo(codigoUsuario) {
  const response = await fetch(`${API_ALBUM_URL}/album/usuarios/${codigoUsuario}/album`);

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(data?.message || 'Error al consultar la API del album');
    error.statusCode = response.status;
    throw error;
  }

  return data;
}
