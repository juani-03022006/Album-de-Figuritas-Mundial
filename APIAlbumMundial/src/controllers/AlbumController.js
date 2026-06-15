import { getAlbumByUsuarioCodigo } from '../services/AlbumService.js';

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
  };
}
