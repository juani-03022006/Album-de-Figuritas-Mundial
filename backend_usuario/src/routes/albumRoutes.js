import { Router } from 'express';
import { createAlbumController } from '../controllers/albumController.js';
import tokenExtractor from '../middleware/tokenExtractor.js';
import { requiereUsuario } from '../middleware/authorization.js';

export function createAlbumRoutes() {
  const router = Router();
  const controller = createAlbumController();

  // Rutas sin login conservadas para desarrollo y pruebas con un usuario explícito.
  router.get('/usuarios/:usuarioId/album', controller.getAlbum);
  router.get('/usuarios/:usuarioId/selecciones/:codigoSeleccion', controller.getSeleccion);

  // Rutas protegidas: el idUsuario sale del access_token de Keycloak.
  router.get('/me/album', tokenExtractor, requiereUsuario, controller.getMyAlbum);
  router.get('/me/selecciones/:codigoSeleccion', tokenExtractor, requiereUsuario, controller.getMySeleccion);

  return router;
}
