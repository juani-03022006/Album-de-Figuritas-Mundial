import oauthService from '../services/oauthService.js';
import { FRONTEND_URL } from '../config/keycloak.js';

function buildFrontendCallbackUrl(tokens) {
  const params = new URLSearchParams({
    access_token: tokens.access_token,
    token_type: tokens.token_type || 'Bearer',
    expires_in: String(tokens.expires_in ?? ''),
  });

  if (tokens.id_token) {
    params.set('id_token', tokens.id_token);
  }

  return `${FRONTEND_URL}/auth/callback#${params.toString()}`;
}

export function createAuthController() {
  return {
    login(_req, res) {
      const loginUrl = oauthService.iniciarLogin();
      res.redirect(loginUrl);
    },

    register(_req, res) {
      const registerUrl = oauthService.iniciarRegistro();
      res.redirect(registerUrl);
    },

    logout(req, res) {
      const logoutUrl = oauthService.crearUrlLogout({
        next: req.query.next === 'register' ? 'register' : 'frontend',
      });

      res.redirect(logoutUrl);
    },

    async callback(req, res) {
      const { code, state, error } = req.query;

      if (error) {
        return res.status(401).json({ error: String(error) });
      }

      if (!code || !state) {
        return res.status(400).json({ error: 'Callback inválido: faltan code o state' });
      }

      try {
        const tokens = await oauthService.intercambiarCodigoPorTokens({
          code: String(code),
          state: String(state),
        });

        if (req.query.format === 'json') {
          return res.json({
            mensaje: 'Login realizado correctamente',
            token_type: tokens.token_type,
            expires_in: tokens.expires_in,
            access_token: tokens.access_token,
            id_token: tokens.id_token,
            refresh_token: tokens.refresh_token,
          });
        }

        return res.redirect(buildFrontendCallbackUrl(tokens));
      } catch (callbackError) {
        return res.status(500).json({
          error: 'No se pudo completar el login',
          detalle: callbackError.message,
        });
      }
    },

    me(req, res) {
      res.json({
        mensaje: 'Usuario autenticado',
        usuario: {
          id: req.user.id,
          usuarioId: req.user.usuarioId,
          username: req.user.username,
          nombre: req.user.nombre,
          apellido: req.user.apellido,
          email: req.user.email,
          roles: req.user.roles,
        },
      });
    },

    admin(req, res) {
      res.json({
        mensaje: 'Ruta exclusiva para administradores',
        usuario: req.user.username,
        roles: req.user.roles,
      });
    },
  };
}
