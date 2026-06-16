import { Router } from 'express';
import { createAlbumController } from '../controllers/albumController.js';

export function createAlbumRoutes() {
  const router = Router();
  const controller = createAlbumController();

  router.get('/usuarios/:usuarioId/album', controller.getAlbum);
  router.get('/usuarios/:usuarioId/selecciones/:codigoSeleccion', controller.getSeleccion);

  return router;
}
