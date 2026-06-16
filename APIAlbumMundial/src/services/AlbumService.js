import { worldCup2026Squads } from '../seeders/data/worldCup2026Squads.js';
import { DEFAULT_TEAM_VISUALS, TEAM_VISUALS } from '../seeders/data/teamVisuals.js';
import { resolveStickerImagesForTeam } from '../seeders/utils/imageResolver.js';

// Evita intentar resolver la misma selección muchas veces durante la misma ejecución.
const resolvedSelectionsInMemory = new Set();

const SHOULD_RESOLVE_LAZY_REMOTE_IMAGES = process.env.LAZY_REMOTE_IMAGES !== 'false';

const SPECIAL_STICKERS_COUNT = 3;
const PLAYERS_PER_TEAM = 26;

function mapOrientacion(tipo) {
  return tipo === 'foto_equipo' ? 'landscape' : 'portrait';
}

function mapJugador(jugador) {
  if (!jugador) return null;

  return {
    nombre: jugador.nombre,
    apellido: jugador.apellido,
    fechaNacimiento: jugador.fechaNacimiento,
    estatura: jugador.estatura,
    peso: jugador.peso,
    club: jugador.club,
    posicion: jugador.Posicion?.nombre ?? null,
  };
}

function isRemoteImageUrl(url) {
  if (!url) return false;
  const cleanUrl = String(url);
  return cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://');
}

function areImagesResolved(figuritas) {
  if (!Array.isArray(figuritas) || figuritas.length === 0) return false;
  return figuritas.every((figurita) => isRemoteImageUrl(figurita.pathTopic));
}

function getLocalStickerNumber(figurita, seleccion) {
  const nroFigurita = Number(figurita.nroFigurita);
  const nroDesde = Number(seleccion.nroDesde);
  const nroHasta = Number(seleccion.nroHasta);

  if (
    Number.isFinite(nroDesde) &&
    Number.isFinite(nroHasta) &&
    nroFigurita >= nroDesde &&
    nroFigurita <= nroHasta
  ) {
    return nroFigurita - nroDesde + 1;
  }

  // Fallback por si se usa numeración local 1-29 en vez de numeración global.
  return nroFigurita;
}

function mapFigurita(figurita, ownedSet, seleccion) {
  return {
    id: figurita.idFigurita,
    nroFigurita: figurita.nroFigurita,
    nroLocal: getLocalStickerNumber(figurita, seleccion),
    tipo: figurita.tipo,
    orientacion: mapOrientacion(figurita.tipo),
    fotoUrl: figurita.pathTopic,
    tiene: ownedSet.has(figurita.idFigurita),
    jugador: mapJugador(figurita.jugador),
    especial: figurita.especial ? { nombre: figurita.especial.nombre } : null,
  };
}

function mapSeleccion(seleccion, figuritas, ownedSet, opciones = {}) {
  return {
    id: seleccion.codigo,
    nombre: seleccion.nombre,
    asociacion: seleccion.asociacion,
    flagUrl: seleccion.flagUrl,
    imagenesResueltas: Boolean(opciones.imagenesResueltas ?? areImagesResolved(figuritas)),
    colores: {
      main: seleccion.colorMain,
      accent1: seleccion.colorAccent1,
      accent2: seleccion.colorAccent2,
      text: seleccion.colorText,
    },
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

async function getUsuarioOrThrow(Usuario, codigoUsuario) {
  const usuario = await Usuario.findOne({ where: { codigo: codigoUsuario } });

  if (!usuario) {
    const error = new Error('Usuario no encontrado');
    error.statusCode = 404;
    throw error;
  }

  return usuario;
}

async function getSeleccionOrThrow(Seleccion, codigoSeleccion) {
  const seleccion = await Seleccion.findOne({
    where: { codigo: String(codigoSeleccion).toUpperCase() },
  });

  if (!seleccion) {
    const error = new Error('Selección no encontrada');
    error.statusCode = 404;
    throw error;
  }

  return seleccion;
}

async function getFiguritasBySeleccion({ Figurita, Jugador, FigEspeciales, Posicion, seleccion }) {
  return Figurita.findAll({
    where: { idSeleccion: seleccion.idSeleccion },
    include: [
      {
        model: Jugador,
        as: 'jugador',
        include: [{ model: Posicion }],
      },
      {
        model: FigEspeciales,
        as: 'especial',
      },
    ],
    order: [['nroFigurita', 'ASC']],
  });
}

function getTeamSeedData(codigoSeleccion) {
  const codigo = String(codigoSeleccion).toUpperCase();
  const rawTeam = worldCup2026Squads.find((team) => team.codigo === codigo);

  if (!rawTeam) {
    const error = new Error(`No hay datos de seed para la selección ${codigo}`);
    error.statusCode = 404;
    throw error;
  }

  const visuals = {
    ...DEFAULT_TEAM_VISUALS,
    ...(TEAM_VISUALS[codigo] ?? {}),
  };

  return {
    ...rawTeam,
    nombre: String(rawTeam.nombre ?? '').toUpperCase(),
    visuals,
  };
}

async function updateSelectionImageUrls({ Seleccion, Figurita, seleccion, figuritas, images }) {
  if (images.flagUrl && seleccion.flagUrl !== images.flagUrl) {
    await Seleccion.update(
      { flagUrl: images.flagUrl },
      { where: { idSeleccion: seleccion.idSeleccion } }
    );
  }

  await Promise.all(
    figuritas.map(async (figurita) => {
      const nroLocal = getLocalStickerNumber(figurita, seleccion);
      const camiseta = nroLocal - SPECIAL_STICKERS_COUNT;
      const nextUrl =
        figurita.tipo === 'jugador' && camiseta >= 1 && camiseta <= PLAYERS_PER_TEAM
          ? images.players?.[camiseta]
          : images.specials?.[figurita.tipo];

      if (!nextUrl || nextUrl === figurita.pathTopic) return;

      await Figurita.update(
        { pathTopic: nextUrl },
        { where: { idFigurita: figurita.idFigurita } }
      );
    })
  );
}

async function ensureSelectionImagesResolved({ models, seleccion, figuritas }) {
  const codigo = seleccion.codigo;

  if (!SHOULD_RESOLVE_LAZY_REMOTE_IMAGES) {
    // El frontend necesita saber que no hay una búsqueda pendiente para no volver a pedir
    // la misma selección en cada navegación cuando el modo lazy está desactivado.
    return { attempted: false, resolved: true };
  }

  if (resolvedSelectionsInMemory.has(codigo)) {
    return { attempted: true, resolved: true };
  }

  if (areImagesResolved(figuritas)) {
    resolvedSelectionsInMemory.add(codigo);
    return { attempted: false, resolved: true };
  }

  const team = getTeamSeedData(codigo);

  console.log(`[lazy-images] Resolviendo imágenes de ${codigo}...`);

  try {
    const images = await resolveStickerImagesForTeam(team);

    await updateSelectionImageUrls({
      Seleccion: models.Seleccion,
      Figurita: models.Figurita,
      seleccion,
      figuritas,
      images,
    });

    resolvedSelectionsInMemory.add(codigo);
    console.log(`[lazy-images] ${codigo} listo.`);

    return { attempted: true, resolved: true };
  } catch (error) {
    console.warn(`[lazy-images] No se pudieron resolver imágenes de ${codigo}: ${error.message}`);
    resolvedSelectionsInMemory.add(codigo);
    // Se devuelve true para evitar reintentos infinitos al volver a la misma página.
    // Las figuritas conservan el fallback que ya estaba guardado en la base.
    return { attempted: true, resolved: true };
  }
}

export async function getAlbumByUsuarioCodigo(codigoUsuario, models) {
  const { Usuario, Seleccion, Figurita, Jugador, FigEspeciales, Posicion, UsuarioFigurita } =
    models;

  const usuario = await getUsuarioOrThrow(Usuario, codigoUsuario);
  const ownedSet = await getOwnedSet(UsuarioFigurita, usuario);

  const selecciones = await Seleccion.findAll({ order: [['idSeleccion', 'ASC']] });

  const seleccionesResponse = await Promise.all(
    selecciones.map(async (seleccion) => {
      const figuritas = await getFiguritasBySeleccion({
        Figurita,
        Jugador,
        FigEspeciales,
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

export async function getSeleccionByUsuarioCodigo(codigoUsuario, codigoSeleccion, models) {
  const { Usuario, Seleccion, Figurita, Jugador, FigEspeciales, Posicion, UsuarioFigurita } =
    models;

  const usuario = await getUsuarioOrThrow(Usuario, codigoUsuario);
  const ownedSet = await getOwnedSet(UsuarioFigurita, usuario);
  let seleccion = await getSeleccionOrThrow(Seleccion, codigoSeleccion);

  let figuritas = await getFiguritasBySeleccion({
    Figurita,
    Jugador,
    FigEspeciales,
    Posicion,
    seleccion,
  });

  const imageStatus = await ensureSelectionImagesResolved({
    models,
    seleccion,
    figuritas,
  });

  // Si se actualizaron URLs, recargo selección y figuritas para devolver el dato persistido en BD.
  if (imageStatus.attempted) {
    seleccion = await getSeleccionOrThrow(Seleccion, codigoSeleccion);
    figuritas = await getFiguritasBySeleccion({
      Figurita,
      Jugador,
      FigEspeciales,
      Posicion,
      seleccion,
    });
  }

  return mapSeleccion(seleccion, figuritas, ownedSet, {
    imagenesResueltas: imageStatus.resolved || areImagesResolved(figuritas),
  });
}
