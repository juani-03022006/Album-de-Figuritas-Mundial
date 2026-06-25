import { Router } from 'express';
import { createAuthController } from '../controllers/authController.js';
import tokenExtractor from '../middleware/tokenExtractor.js';
import { requiereRol, requiereUsuario } from '../middleware/authorization.js';

export function createAuthRoutes() {
  const router = Router();
  const controller = createAuthController();

  router.get('/login', controller.login);
  router.get('/register', controller.register);
  router.get('/logout', controller.logout);
  router.get('/auth/callback', controller.callback);

  // Rutas didácticas de la guía: permiten probar token y roles.
  router.get('/api/me', tokenExtractor, requiereUsuario, controller.me);
  router.get('/api/admin', tokenExtractor, requiereRol('admin'), controller.admin);

  return router;
}
