export function normalizeText(value, fallback = '') {
  const text = String(value ?? '').trim();
  return text || fallback;
}

export function normalizeCodigoUsuario(codigoUsuario) {
  const codigo = String(codigoUsuario ?? '').trim();

  if (!codigo) {
    const error = new Error('Código de usuario inválido');
    error.statusCode = 400;
    throw error;
  }

  return codigo;
}

export function getNombreUsuarioDefault(codigoUsuario, perfilUsuario = {}) {
  const nombreDesdePerfil = String(
    perfilUsuario.nombreCompleto ||
      perfilUsuario.nombre ||
      perfilUsuario.username ||
      codigoUsuario
  ).trim();

  return nombreDesdePerfil || codigoUsuario;
}

export async function findOrCreateUsuario(Usuario, codigoUsuario, perfilUsuario = {}) {
  const codigo = normalizeCodigoUsuario(codigoUsuario);

  const [usuario, created] = await Usuario.findOrCreate({
    where: { codigo },
    defaults: {
      codigo,
      nombre: getNombreUsuarioDefault(codigo, perfilUsuario),
      ultimoPaqueteAbiertoAt: null,
    },
  });

  if (created) {
    console.log(`[usuarios] Usuario creado automáticamente desde Keycloak: ${codigo}`);
  }

  return usuario;
}

export function getLocalStickerNumber(figurita, seleccion) {
  const nroFigurita = Number(figurita.nroFigurita);
  const nroDesde = Number(seleccion?.nroDesde);
  const nroHasta = Number(seleccion?.nroHasta);

  if (
    Number.isFinite(nroDesde) &&
    Number.isFinite(nroHasta) &&
    nroFigurita >= nroDesde &&
    nroFigurita <= nroHasta
  ) {
    return nroFigurita - nroDesde + 1;
  }

  return nroFigurita;
}

export function normalizeTipoFigurita(figurita, seleccion = figurita?.seleccion ?? figurita?.Seleccion) {
  const rawTipo = String(figurita?.tipo ?? '').trim().toLowerCase();

  if (rawTipo === 'j') return 'jugador';
  if (rawTipo === 'foto_equipo') return 'foto_seleccion';

  if (['jugador', 'escudo', 'foto_seleccion', 'tecnico'].includes(rawTipo)) {
    return rawTipo;
  }

  if (rawTipo === 'e' || rawTipo === 'especial') {
    const nroLocal = getLocalStickerNumber(figurita, seleccion);

    if (nroLocal === 1) return 'escudo';
    if (nroLocal === 2) return 'foto_seleccion';
    if (nroLocal === 3) return 'tecnico';

    return 'especial';
  }

  return rawTipo || 'jugador';
}
