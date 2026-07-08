import {
  findOrCreateUsuario,
  getLocalStickerNumber,
  normalizeText,
  normalizeTipoFigurita,
} from './albumUtils.js';

function mapOrientacion(tipo) {
  return tipo === 'foto_seleccion' || tipo === 'foto_equipo' ? 'landscape' : 'portrait';
}

function getSeleccionId(seleccion) {
  return normalizeText(seleccion.codigo ?? seleccion.idSeleccion, String(seleccion.idSeleccion ?? ''));
}

function getSeleccionNombre(seleccion) {
  return normalizeText(seleccion.nombre ?? seleccion.nombrePais ?? seleccion.nombreSeleccion);
}

function getSeleccionAsociacion(seleccion) {
  return normalizeText(seleccion.asociacion ?? seleccion.nombreSeleccion ?? seleccion.nombrePais);
}

function getSeleccionFlagUrl(seleccion) {
  return normalizeText(seleccion.flagUrl ?? seleccion.urlBandera);
}

function getColorPalette(seleccion) {
  return {
    main: seleccion.colorMain ?? seleccion.colorPrincipal ?? '#64748b',
    accent1: seleccion.colorAccent1 ?? seleccion.colorAcento1 ?? '#94a3b8',
    accent2: seleccion.colorAccent2 ?? seleccion.colorAcento2 ?? '#475569',
    text: seleccion.colorText ?? seleccion.colorTitulo ?? '#ffffff',
  };
}

function mapJugador(jugador) {
  if (!jugador) return null;

  const posicion = jugador.posicion ?? jugador.Posicion ?? null;

  return {
    nombre: jugador.nombre ?? '',
    apellido: jugador.apellido ?? '',
    fechaNacimiento: jugador.fechaNacimiento ?? null,
    estatura: jugador.estatura ?? null,
    peso: jugador.peso ?? null,
    club: jugador.club ?? '',
    posicion: posicion?.nombre ?? posicion?.descripcion ?? '',
  };
}

function getEspecialNombre(figurita, tipo, seleccion) {
  const nombreActual = normalizeText(figurita.especial?.nombre);
  const nombreSeleccion = getSeleccionNombre(seleccion);

  if (tipo === 'escudo') return nombreActual || `Escudo de ${nombreSeleccion}`;
  if (tipo === 'foto_seleccion') return nombreActual || `Foto de selección de ${nombreSeleccion}`;
  if (tipo === 'tecnico') return nombreActual || `Director técnico de ${nombreSeleccion}`;

  return nombreActual || `Figurita especial ${figurita.nroFigurita}`;
}

function mapFigurita(figurita, ownedSet, seleccion) {
  const tipo = normalizeTipoFigurita(figurita, seleccion);

  return {
    id: figurita.idFigurita,
    nroFigurita: figurita.nroFigurita,
    nroLocal: getLocalStickerNumber(figurita, seleccion),
    tipo,
    orientacion: mapOrientacion(tipo),
    fotoUrl: figurita.pathTopic ?? null,
    tiene: ownedSet.has(figurita.idFigurita),
    jugador: mapJugador(figurita.jugador),
    especial: figurita.especial
      ? { nombre: getEspecialNombre(figurita, tipo, seleccion) }
      : ['escudo', 'foto_seleccion', 'tecnico'].includes(tipo)
        ? { nombre: getEspecialNombre(figurita, tipo, seleccion) }
        : null,
  };
}

function mapSeleccion(seleccion, figuritas, ownedSet) {
  return {
    id: getSeleccionId(seleccion),
    nombre: getSeleccionNombre(seleccion),
    asociacion: getSeleccionAsociacion(seleccion),
    flagUrl: getSeleccionFlagUrl(seleccion),
    grupo: normalizeText(seleccion.grupo),
    nroDesde: seleccion.nroDesde,
    nroHasta: seleccion.nroHasta,
    imagenesResueltas: true,
    colores: getColorPalette(seleccion),
    figuritas: figuritas.map((figurita) => mapFigurita(figurita, ownedSet, seleccion)),
  };
}

async function getOwnedSet(UsuarioFigurita, usuario) {
  const ownedRows = await UsuarioFigurita.findAll({
    where: { idUsuario: usuario.idUsuario },
    attributes: ['idFigurita'],
  });

  return new Set(ownedRows.map((row) => row.idFigurita));
}

function seleccionMatchesCodigo(seleccion, codigoSeleccion) {
  const codigoBuscado = String(codigoSeleccion ?? '').trim().toUpperCase();

  if (!codigoBuscado) return false;

  const posiblesCodigos = [
    seleccion.codigo,
    seleccion.idSeleccion,
    seleccion.nombrePais,
    seleccion.nombreSeleccion,
    seleccion.nombre,
  ]
    .filter((value) => value !== null && value !== undefined)
    .map((value) => String(value).trim().toUpperCase());

  return posiblesCodigos.includes(codigoBuscado);
}

async function getSeleccionOrThrow(Seleccion, codigoSeleccion) {
  const selecciones = await Seleccion.findAll();
  const seleccion = selecciones.find((item) => seleccionMatchesCodigo(item, codigoSeleccion));

  if (!seleccion) {
    const error = new Error('Selección no encontrada');
    error.statusCode = 404;
    throw error;
  }

  return seleccion;
}

async function getFiguritasBySeleccion({ Figurita, FiguritaJugador, FiguritaEspecial, Posicion, seleccion }) {
  return Figurita.findAll({
    where: { idSeleccion: seleccion.idSeleccion },
    include: [
      {
        model: FiguritaJugador,
        as: 'jugador',
        include: [{ model: Posicion, as: 'posicion' }],
      },
      {
        model: FiguritaEspecial,
        as: 'especial',
      },
    ],
    order: [['nroFigurita', 'ASC']],
  });
}

export async function getAlbumByUsuarioCodigo(codigoUsuario, models, perfilUsuario = {}) {
  const { Usuario, Seleccion, Figurita, FiguritaJugador, FiguritaEspecial, Posicion, UsuarioFigurita } =
    models;

  const usuario = await findOrCreateUsuario(Usuario, codigoUsuario, perfilUsuario);
  const ownedSet = await getOwnedSet(UsuarioFigurita, usuario);

  const selecciones = await Seleccion.findAll({
    order: [
      ['grupo', 'ASC'],
      ['nroDesde', 'ASC'],
      ['nombrePais', 'ASC'],
    ],
  });

  const seleccionesResponse = await Promise.all(
    selecciones.map(async (seleccion) => {
      const figuritas = await getFiguritasBySeleccion({
        Figurita,
        FiguritaJugador,
        FiguritaEspecial,
        Posicion,
        seleccion,
      });

      return mapSeleccion(seleccion, figuritas, ownedSet);
    })
  );

  return {
    usuarioId: usuario.codigo,
    selecciones: seleccionesResponse,
  };
}

export async function getSeleccionByUsuarioCodigo(codigoUsuario, codigoSeleccion, models, perfilUsuario = {}) {
  const { Usuario, Seleccion, Figurita, FiguritaJugador, FiguritaEspecial, Posicion, UsuarioFigurita } =
    models;

  const usuario = await findOrCreateUsuario(Usuario, codigoUsuario, perfilUsuario);
  const ownedSet = await getOwnedSet(UsuarioFigurita, usuario);
  const seleccion = await getSeleccionOrThrow(Seleccion, codigoSeleccion);

  const figuritas = await getFiguritasBySeleccion({
    Figurita,
    FiguritaJugador,
    FiguritaEspecial,
    Posicion,
    seleccion,
  });

  return mapSeleccion(seleccion, figuritas, ownedSet);
}
