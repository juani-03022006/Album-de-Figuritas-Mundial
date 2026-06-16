import {
  getAlbumByUsuarioCodigo,
  getSeleccionByUsuarioCodigo,
} from '../services/albumService.js';

export function createAlbumController() {
  return {
    async getAlbum(req, res) {
      try {
        const album = await getAlbumByUsuarioCodigo(req.params.usuarioId);
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
          req.params.codigoSeleccion
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
