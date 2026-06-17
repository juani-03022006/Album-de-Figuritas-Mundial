import { Router } from 'express';
import { createAlbumController } from '../controllers/AlbumController.js';
import { createPaqueteController } from '../controllers/PaqueteController.js';

export function createAlbumRoutes(models) {
  const router = Router();
  const controller = createAlbumController(models);
  const paqueteController = createPaqueteController(models);

  router.get('/usuarios/:usuarioId/album', controller.getAlbum);
  router.get('/usuarios/:usuarioId/selecciones/:codigoSeleccion', controller.getSeleccion);
  router.get('/usuarios/:usuarioId/paquete/estado', paqueteController.getEstado);
  router.post('/usuarios/:usuarioId/paquete/abrir', paqueteController.abrir);

  return router;
}
