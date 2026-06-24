import { createRemoteJWKSet, jwtVerify } from 'jose';
import {
  KEYCLOAK_AUTH_ENABLED,
  KEYCLOAK_AUDIENCE,
  KEYCLOAK_DEV_USER_ID,
  KEYCLOAK_ISSUER,
  KEYCLOAK_JWKS_URI,
  KEYCLOAK_USER_ID_CLAIM,
} from '../config/keycloak.js';

const JWKS = createRemoteJWKSet(new URL(KEYCLOAK_JWKS_URI));

function getBearerToken(req) {
  const authorization = req.get('authorization');

  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    return null;
  }

  return authorization.substring(7);
}

function getUsuarioId(payload) {
  return (
    payload?.[KEYCLOAK_USER_ID_CLAIM] ||
    payload?.idUsuario ||
    payload?.codigoUsuario ||
    payload?.preferred_username ||
    payload?.sub ||
    null
  );
}

export default async function tokenExtractor(req, res, next) {
  if (!KEYCLOAK_AUTH_ENABLED) {
    req.user = {
      id: KEYCLOAK_DEV_USER_ID,
      username: KEYCLOAK_DEV_USER_ID,
      usuarioId: KEYCLOAK_DEV_USER_ID,
      roles: ['usuario'],
      claims: null,
    };
    return next();
  }

  const token = getBearerToken(req);

  if (!token) {
    return res.status(401).json({ error: 'Token no informado' });
  }

  try {
    const verifyOptions = { issuer: KEYCLOAK_ISSUER };

    if (KEYCLOAK_AUDIENCE !== 'none') {
      verifyOptions.audience = KEYCLOAK_AUDIENCE;
    }

    const { payload } = await jwtVerify(token, JWKS, verifyOptions);
    const usuarioId = getUsuarioId(payload);

    if (!usuarioId) {
      return res.status(401).json({
        error: `El token no contiene el claim de usuario esperado: ${KEYCLOAK_USER_ID_CLAIM}`,
      });
    }

    req.user = {
      id: payload.sub,
      username: payload.preferred_username,
      usuarioId: String(usuarioId),
      nombre: payload.given_name,
      apellido: payload.family_name,
      email: payload.email,
      roles: payload.realm_access?.roles ?? [],
      claims: payload,
    };

    return next();
  } catch (error) {
    return res.status(401).json({
      error: 'Token inválido o expirado',
      detalle: error.message,
    });
  }
}
