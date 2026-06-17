import { API_ALBUM_URL } from '../config/api.js';

function buildKeycloakUserHeaders(usuarioAutenticado = null) {
  const headers = {};

  if (!usuarioAutenticado) return headers;

  if (usuarioAutenticado.username) {
    headers['x-keycloak-username'] = String(usuarioAutenticado.username);
  }

  const nombreCompleto = [usuarioAutenticado.nombre, usuarioAutenticado.apellido]
    .filter(Boolean)
    .join(' ')
    .trim();

  if (nombreCompleto) {
    headers['x-keycloak-name'] = nombreCompleto;
  }

  if (usuarioAutenticado.email) {
    headers['x-keycloak-email'] = String(usuarioAutenticado.email);
  }

  return headers;
}

async function requestApi(path, options = {}) {
  const response = await fetch(`${API_ALBUM_URL}${path}`, {
    headers: options.headers ?? {},
  });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(data?.message || 'Error al consultar la API del album');
    error.statusCode = response.status;
    throw error;
  }

  return data;
}

export async function getAlbumByUsuarioCodigo(codigoUsuario, usuarioAutenticado = null) {
  const codigo = encodeURIComponent(codigoUsuario);

  return requestApi(`/album/usuarios/${codigo}/album`, {
    headers: buildKeycloakUserHeaders(usuarioAutenticado),
  });
}

export async function getSeleccionByUsuarioCodigo(
  codigoUsuario,
  codigoSeleccion,
  usuarioAutenticado = null
) {
  const codigo = encodeURIComponent(codigoUsuario);
  const seleccion = encodeURIComponent(codigoSeleccion);

  return requestApi(`/album/usuarios/${codigo}/selecciones/${seleccion}`, {
    headers: buildKeycloakUserHeaders(usuarioAutenticado),
  });
}
