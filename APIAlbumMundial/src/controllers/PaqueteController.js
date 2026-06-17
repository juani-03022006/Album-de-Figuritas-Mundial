import {
  abrirPaqueteByUsuarioCodigo,
  getEstadoPaqueteByUsuarioCodigo,
} from '../services/PaqueteService.js';

function getPerfilUsuarioFromRequest(req) {
  return {
    username: req.get('x-keycloak-username') || null,
    nombreCompleto: req.get('x-keycloak-name') || null,
    email: req.get('x-keycloak-email') || null,
  };
}

export function createPaqueteController(models) {
  return {
    async getEstado(req, res) {
      try {
        const estado = await getEstadoPaqueteByUsuarioCodigo(
          req.params.usuarioId,
          models,
          getPerfilUsuarioFromRequest(req)
        );
        res.json(estado);
      } catch (error) {
        res.status(error.statusCode || 500).json({
          message: error.message || 'Error interno del servidor',
          details: error.details,
        });
      }
    },

    async abrir(req, res) {
      try {
        const paquete = await abrirPaqueteByUsuarioCodigo(
          req.params.usuarioId,
          models,
          getPerfilUsuarioFromRequest(req)
        );
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
