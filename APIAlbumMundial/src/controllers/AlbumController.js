import {
  getAlbumByUsuarioCodigo,
  getSeleccionByUsuarioCodigo,
} from '../services/AlbumService.js';

function getPerfilUsuarioFromRequest(req) {
  return {
    username: req.get('x-keycloak-username') || null,
    nombreCompleto: req.get('x-keycloak-name') || null,
    email: req.get('x-keycloak-email') || null,
  };
}

export function createAlbumController(models) {
  return {
    async getAlbum(req, res) {
      try {
        const album = await getAlbumByUsuarioCodigo(
          req.params.usuarioId,
          models,
          getPerfilUsuarioFromRequest(req)
        );
        res.json(album);
      } catch (error) {
        res.status(error.statusCode || 500).json({
          message: error.message || 'Error interno del servidor',
        });
      }
    },

    async getSeleccion(req, res) {
      try {
        const seleccion = await getSeleccionByUsuarioCodigo(
          req.params.usuarioId,
          req.params.codigoSeleccion,
          models,
          getPerfilUsuarioFromRequest(req)
        );
        res.json(seleccion);
      } catch (error) {
        res.status(error.statusCode || 500).json({
          message: error.message || 'Error interno del servidor',
        });
      }
    },
  };
}
