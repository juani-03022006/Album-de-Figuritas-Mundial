import { worldCup2026Squads } from './data/worldCup2026Squads.js';
import { DEFAULT_TEAM_VISUALS, TEAM_VISUALS } from './data/teamVisuals.js';
import {
  buildFallbackStickerImagesForTeam,
  resolveStickerImagesForTeam,
} from './utils/imageResolver.js';

const POSICIONES = ['Arquero', 'Defensor', 'Mediocampista', 'Delantero'];

const FIFA_POSITION_TO_APP = {
  GK: 'Arquero',
  DF: 'Defensor',
  MF: 'Mediocampista',
  FW: 'Delantero',
};

const STICKERS_PER_TEAM = 29;
const OFFICIAL_PLAYERS_PER_TEAM = 26;

// true: selección 1 => 1-29, selección 2 => 30-58, etc.
// false: cada selección numera internamente 1-29.
const USE_GLOBAL_STICKER_NUMBERING = true;

// Si queda en true, el seeder consulta Wikimedia/Wikidata/Commons y guarda URLs reales.
// Si necesitás seedear sin internet: SEED_REMOTE_IMAGES=false npm run dev
// Por defecto NO consulta internet durante el arranque del servidor.
// Para resolver imágenes reales, ejecutar explícitamente: SEED_REMOTE_IMAGES=true npm run dev
const RESOLVE_REMOTE_IMAGES = process.env.SEED_REMOTE_IMAGES === 'true';

// Por defecto el usuario demo se crea SIN figuritas.
// Si necesitás probar el álbum completo visible con demo, ejecutá una sola vez:
// SEED_MARK_ALL_OWNED=true npm run dev
const MARK_ALL_STICKERS_AS_OWNED = process.env.SEED_MARK_ALL_OWNED === 'true';

const SPECIAL_STICKERS = [
  {
    nroLocal: 1,
    tipo: 'escudo',
    getNombre: (team) => `Escudo - ${team.nombre}`,
  },
  {
    nroLocal: 2,
    tipo: 'foto_equipo',
    getNombre: (team) => `Foto de selección - ${team.nombre}`,
  },
  {
    nroLocal: 3,
    tipo: 'tecnico',
    getNombre: (team) => `Director técnico - ${team.directorTecnico.nombreCompleto}`,
  },
];

function getGlobalRange(teamIndex) {
  const nroDesde = teamIndex * STICKERS_PER_TEAM + 1;
  const nroHasta = nroDesde + STICKERS_PER_TEAM - 1;
  return { nroDesde, nroHasta };
}

function getStickerNumber(teamIndex, nroLocal) {
  const nroGlobal = teamIndex * STICKERS_PER_TEAM + nroLocal;
  return USE_GLOBAL_STICKER_NUMBERING ? nroGlobal : nroLocal;
}

function getPlayerStickerLocalNumber(player) {
  const numeroCamiseta = Number(player.numeroCamiseta);

  if (!Number.isInteger(numeroCamiseta) || numeroCamiseta < 1 || numeroCamiseta > OFFICIAL_PLAYERS_PER_TEAM) {
    throw new Error(
      `Número de camiseta inválido para ${player.nombreCompletoFifa}: ${player.numeroCamiseta}. Debe estar entre 1 y ${OFFICIAL_PLAYERS_PER_TEAM}.`
    );
  }

  // En el álbum, las primeras 3 figuritas de cada selección son:
  // 1 escudo, 2 foto de selección, 3 director técnico.
  // Por eso los 26 jugadores ocupan las posiciones locales 4 a 29.
  return numeroCamiseta + SPECIAL_STICKERS.length;
}

function normalizeTeamName(nombre) {
  return String(nombre ?? '').toUpperCase();
}

async function markAsOwned({ UsuarioFigurita, usuario, figurita }) {
  if (!MARK_ALL_STICKERS_AS_OWNED) return;

  await UsuarioFigurita.create({
    idUsuario: usuario.idUsuario,
    idFigurita: figurita.idFigurita,
  });
}

async function crearJugador({ Jugador, posicionMap, figuritaId, player }) {
  const posicionApp = FIFA_POSITION_TO_APP[player.posicionFifa];

  if (!posicionApp) {
    throw new Error(`Posición FIFA no reconocida: ${player.posicionFifa}`);
  }

  await Jugador.create({
    nombre: player.nombre,
    apellido: player.apellido,
    estatura: player.estaturaCm ? player.estaturaCm / 100 : null,
    peso: null,
    club: player.club,
    fechaNacimiento: player.fechaNacimiento,
    idFigurita: figuritaId,
    idPosicion: posicionMap[posicionApp],
  });
}

async function crearFiguritaJugador({
  Figurita,
  Jugador,
  UsuarioFigurita,
  usuario,
  posicionMap,
  seleccion,
  teamIndex,
  player,
  imageUrl,
}) {
  const nroLocal = getPlayerStickerLocalNumber(player);

  const figurita = await Figurita.create({
    nroFigurita: getStickerNumber(teamIndex, nroLocal),
    pathTopic: imageUrl,
    tipo: 'jugador',
    idSeleccion: seleccion.idSeleccion,
  });

  await crearJugador({
    Jugador,
    posicionMap,
    figuritaId: figurita.idFigurita,
    player,
  });

  await markAsOwned({ UsuarioFigurita, usuario, figurita });

  return figurita;
}

async function crearFiguritaEspecial({
  Figurita,
  FigEspeciales,
  UsuarioFigurita,
  usuario,
  seleccion,
  teamIndex,
  team,
  special,
  imageUrl,
}) {
  const figurita = await Figurita.create({
    nroFigurita: getStickerNumber(teamIndex, special.nroLocal),
    pathTopic: imageUrl,
    tipo: special.tipo,
    idSeleccion: seleccion.idSeleccion,
  });

  await FigEspeciales.create({
    nombre: special.getNombre(team),
    idFigurita: figurita.idFigurita,
  });

  await markAsOwned({ UsuarioFigurita, usuario, figurita });

  return figurita;
}

function getTeamVisuals(team) {
  return {
    ...DEFAULT_TEAM_VISUALS,
    ...(TEAM_VISUALS[team.codigo] ?? {}),
  };
}

async function getTeamImages(team) {
  if (!RESOLVE_REMOTE_IMAGES) {
    return buildFallbackStickerImagesForTeam(team);
  }

  try {
    return await resolveStickerImagesForTeam(team);
  } catch (error) {
    console.warn(
      `[seed] No se pudieron resolver imágenes remotas para ${team.codigo}. Se usan fallbacks.`,
      error.message
    );
    return buildFallbackStickerImagesForTeam(team);
  }
}

export async function seedDatabase(models) {
  const inicioSeed = Date.now();
  console.log(`[seed] Iniciando carga de base. Imágenes remotas: ${RESOLVE_REMOTE_IMAGES ? 'activadas' : 'desactivadas'}.`);

  const { Posicion, Seleccion, Figurita, Jugador, FigEspeciales, Usuario, UsuarioFigurita } =
    models;

  const seleccionesExistentes = await Seleccion.count();
  if (seleccionesExistentes > 0) {
    console.log(`[seed] Base ya poblada: ${seleccionesExistentes} selecciones. No se vuelve a seedear.`);
    return;
  }

  if (worldCup2026Squads.length !== 48) {
    throw new Error(`El dataset debe tener 48 selecciones. Actualmente tiene ${worldCup2026Squads.length}.`);
  }

  await Posicion.bulkCreate(POSICIONES.map((nombre) => ({ nombre })));
  console.log('[seed] Posiciones cargadas.');

  const posicionRows = await Posicion.findAll();
  const posicionMap = Object.fromEntries(posicionRows.map((p) => [p.nombre, p.idPosicion]));

  const [usuario] = await Usuario.findOrCreate({
    where: { codigo: 'demo' },
    defaults: { nombre: 'Usuario Demo' },
  });
  console.log(`[seed] Usuario demo listo. Figuritas iniciales: ${MARK_ALL_STICKERS_AS_OWNED ? 'todas' : 'ninguna'}.`);

  for (const [teamIndex, rawTeam] of worldCup2026Squads.entries()) {
    if (rawTeam.plantel.length !== OFFICIAL_PLAYERS_PER_TEAM) {
      throw new Error(
        `La selección ${rawTeam.codigo} debe tener ${OFFICIAL_PLAYERS_PER_TEAM} jugadores oficiales. Tiene ${rawTeam.plantel.length}.`
      );
    }

    if (!rawTeam.directorTecnico?.nombreCompleto) {
      throw new Error(`La selección ${rawTeam.codigo} no tiene director técnico cargado.`);
    }

    const visuals = getTeamVisuals(rawTeam);
    const team = {
      ...rawTeam,
      nombre: normalizeTeamName(rawTeam.nombre),
      visuals,
    };

    console.log(`[seed] ${teamIndex + 1}/48 - Cargando ${team.codigo} (${team.nombre})...`);
    const images = await getTeamImages(team);
    const { nroDesde, nroHasta } = getGlobalRange(teamIndex);

    const seleccion = await Seleccion.create({
      codigo: team.codigo,
      nombre: team.nombre,
      asociacion: visuals.asociacion,
      flagUrl: images.flagUrl,
      nroDesde,
      nroHasta,
      colorMain: visuals.colorMain,
      colorAccent1: visuals.colorAccent1,
      colorAccent2: visuals.colorAccent2,
      colorText: visuals.colorText,
    });

    for (const special of SPECIAL_STICKERS) {
      await crearFiguritaEspecial({
        Figurita,
        FigEspeciales,
        UsuarioFigurita,
        usuario,
        seleccion,
        teamIndex,
        team,
        special,
        imageUrl: images.specials[special.tipo],
      });
    }

    const plantelOrdenado = [...team.plantel].sort(
      (a, b) => Number(a.numeroCamiseta) - Number(b.numeroCamiseta)
    );

    for (const player of plantelOrdenado) {
      await crearFiguritaJugador({
        Figurita,
        Jugador,
        UsuarioFigurita,
        usuario,
        posicionMap,
        seleccion,
        teamIndex,
        player,
        imageUrl: images.players[player.numeroCamiseta],
      });
    }

    console.log(`[seed] ${team.codigo} listo: 3 especiales + 26 jugadores.`);
  }

  console.log(`[seed] Base cargada completa en ${Math.round((Date.now() - inicioSeed) / 1000)}s.`);
}
