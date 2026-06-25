import {
  abrirPaqueteByUsuarioCodigo,
  getAlbumByUsuarioCodigo,
  getEstadoPaqueteByUsuarioCodigo,
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
          details: error.details,
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
          details: error.details,
        });
      }
    },

    async getMyAlbum(req, res) {
      try {
        const album = await getAlbumByUsuarioCodigo(req.user.usuarioId, req.user);
        res.json(album);
      } catch (error) {
        res.status(error.statusCode || 500).json({
          message: error.message || 'Error interno del servidor',
          details: error.details,
        });
      }
    },

    async getMySeleccion(req, res) {
      try {
        const seleccion = await getSeleccionByUsuarioCodigo(
          req.user.usuarioId,
          req.params.codigoSeleccion,
          req.user
        );
        res.json(seleccion);
      } catch (error) {
        res.status(error.statusCode || 500).json({
          message: error.message || 'Error interno del servidor',
          details: error.details,
        });
      }
    },

    async getEstadoPaquete(req, res) {
      try {
        const estado = await getEstadoPaqueteByUsuarioCodigo(req.params.usuarioId);
        res.json(estado);
      } catch (error) {
        res.status(error.statusCode || 500).json({
          message: error.message || 'Error interno del servidor',
          details: error.details,
        });
      }
    },

    async abrirPaquete(req, res) {
      try {
        const paquete = await abrirPaqueteByUsuarioCodigo(req.params.usuarioId);
        res.json(paquete);
      } catch (error) {
        res.status(error.statusCode || 500).json({
          message: error.message || 'Error interno del servidor',
          details: error.details,
        });
      }
    },

    async getMyEstadoPaquete(req, res) {
      try {
        const estado = await getEstadoPaqueteByUsuarioCodigo(req.user.usuarioId, req.user);
        res.json(estado);
      } catch (error) {
        res.status(error.statusCode || 500).json({
          message: error.message || 'Error interno del servidor',
          details: error.details,
        });
      }
    },

    async abrirMyPaquete(req, res) {
      try {
        const paquete = await abrirPaqueteByUsuarioCodigo(req.user.usuarioId, req.user);
        res.json(paquete);
      } catch (error) {
        res.status(error.statusCode || 500).json({
          message: error.message || 'Error interno del servidor',
          details: error.details,
        });
      }
    },
  };
}
