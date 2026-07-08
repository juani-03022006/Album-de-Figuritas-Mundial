import {
  abrirPaqueteByUsuarioCodigo,
  getAlbumByUsuarioCodigo,
  getEstadoPaqueteByUsuarioCodigo,
  getSeleccionByUsuarioCodigo,
} from '../services/albumService.js';

function responderError(res, error) {
  return res.status(error.statusCode || 500).json({
    message: error.message || 'Error interno del servidor',
    details: error.details,
  });
}

async function responderServicio(res, servicio) {
  try {
    const data = await servicio();
    return res.json(data);
  } catch (error) {
    return responderError(res, error);
  }
}

export function createAlbumController() {
  return {
    getAlbum(req, res) {
      return responderServicio(res, () => getAlbumByUsuarioCodigo(req.params.usuarioId));
    },

    getSeleccion(req, res) {
      return responderServicio(res, () =>
        getSeleccionByUsuarioCodigo(req.params.usuarioId, req.params.codigoSeleccion)
      );
    },

    getMyAlbum(req, res) {
      return responderServicio(res, () => getAlbumByUsuarioCodigo(req.user.usuarioId, req.user));
    },

    getMySeleccion(req, res) {
      return responderServicio(res, () =>
        getSeleccionByUsuarioCodigo(req.user.usuarioId, req.params.codigoSeleccion, req.user)
      );
    },

    getEstadoPaquete(req, res) {
      return responderServicio(res, () => getEstadoPaqueteByUsuarioCodigo(req.params.usuarioId));
    },

    abrirPaquete(req, res) {
      return responderServicio(res, () => abrirPaqueteByUsuarioCodigo(req.params.usuarioId));
    },

    getMyEstadoPaquete(req, res) {
      return responderServicio(res, () =>
        getEstadoPaqueteByUsuarioCodigo(req.user.usuarioId, req.user)
      );
    },

    abrirMyPaquete(req, res) {
      return responderServicio(res, () => abrirPaqueteByUsuarioCodigo(req.user.usuarioId, req.user));
    },
  };
}
