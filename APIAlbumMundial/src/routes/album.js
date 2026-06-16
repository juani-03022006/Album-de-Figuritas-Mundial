import { Router } from 'express';
import { createAlbumController } from '../controllers/AlbumController.js';

export function createAlbumRoutes(models) {
  const router = Router();
  const controller = createAlbumController(models);

  router.get('/usuarios/:usuarioId/album', controller.getAlbum);
  router.get('/usuarios/:usuarioId/selecciones/:codigoSeleccion', controller.getSeleccion);

  return router;
}
