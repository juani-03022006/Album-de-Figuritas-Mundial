import {
  getAlbumByUsuarioCodigo,
  getSeleccionByUsuarioCodigo,
} from '../services/AlbumService.js';

export function createAlbumController(models) {
  return {
    async getAlbum(req, res) {
      try {
        const album = await getAlbumByUsuarioCodigo(req.params.usuarioId, models);
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
          models
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
