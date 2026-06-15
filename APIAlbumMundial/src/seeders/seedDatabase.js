import { worldCup2026Squads } from './data/worldCup2026Squads.js';

const POSICIONES = ['Arquero', 'Defensor', 'Mediocampista', 'Delantero'];

const FIFA_POSITION_TO_APP = {
  GK: 'Arquero',
  DF: 'Defensor',
  MF: 'Mediocampista',
  FW: 'Delantero',
};

const DEFAULT_COLORS = {
  colorMain: '#f5f5f5',
  colorAccent1: '#d9d9d9',
  colorAccent2: '#222222',
  colorText: '#111111',
};

const STICKERS_PER_TEAM = 29;
const OFFICIAL_PLAYERS_PER_TEAM = 26;

// true: selección 1 => 1-29, selección 2 => 30-58, etc.
// false: cada selección numera sus figuritas internamente 1-29.
const USE_GLOBAL_STICKER_NUMBERING = true;

const SPECIAL_STICKERS = [
  {
    nroLocal: 27,
    tipo: 'escudo',
    getNombre: (team) => `Escudo - ${team.nombre}`,
    getPath: (codigoSeleccion) => `/assets/especiales/${codigoSeleccion}/escudo.png`,
  },
  {
    nroLocal: 28,
    tipo: 'foto_equipo',
    getNombre: (team) => `Foto de selección - ${team.nombre}`,
    getPath: (codigoSeleccion) => `/assets/especiales/${codigoSeleccion}/foto-seleccion.png`,
  },
  {
    nroLocal: 29,
    tipo: 'tecnico',
    getNombre: (team) => `Director técnico - ${team.directorTecnico.nombreCompleto}`,
    getPath: (codigoSeleccion) => `/assets/especiales/${codigoSeleccion}/director-tecnico.png`,
  },
];

function placeholderPlayerImagePath(codigoSeleccion, nroLocal) {
  return `/assets/jugadores/${codigoSeleccion}/${String(nroLocal).padStart(2, '0')}.png`;
}

function placeholderFlagPath(codigoSeleccion) {
  return `/assets/flags/${codigoSeleccion}.svg`;
}

function getGlobalRange(teamIndex) {
  const nroDesde = teamIndex * STICKERS_PER_TEAM + 1;
  const nroHasta = nroDesde + STICKERS_PER_TEAM - 1;
  return { nroDesde, nroHasta };
}

function getStickerNumber(teamIndex, nroLocal) {
  const nroGlobal = teamIndex * STICKERS_PER_TEAM + nroLocal;
  return USE_GLOBAL_STICKER_NUMBERING ? nroGlobal : nroLocal;
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

async function crearFiguritaJugador({ Figurita, Jugador, posicionMap, seleccion, teamIndex, player }) {
  const nroLocal = player.numeroCamiseta;

  const figurita = await Figurita.create({
    nroFigurita: getStickerNumber(teamIndex, nroLocal),
    pathTopic: placeholderPlayerImagePath(seleccion.codigo, nroLocal),
    tipo: 'jugador',
    idSeleccion: seleccion.idSeleccion,
  });

  await crearJugador({
    Jugador,
    posicionMap,
    figuritaId: figurita.idFigurita,
    player,
  });

  return figurita;
}

async function crearFiguritaEspecial({ Figurita, FigEspeciales, seleccion, teamIndex, team, special }) {
  const figurita = await Figurita.create({
    nroFigurita: getStickerNumber(teamIndex, special.nroLocal),
    pathTopic: special.getPath(seleccion.codigo),
    tipo: special.tipo,
    idSeleccion: seleccion.idSeleccion,
  });

  await FigEspeciales.create({
    nombre: special.getNombre(team),
    idFigurita: figurita.idFigurita,
  });

  return figurita;
}

export async function seedDatabase(models) {
  const { Posicion, Seleccion, Figurita, Jugador, FigEspeciales, Usuario } = models;

  if (worldCup2026Squads.length !== 48) {
    throw new Error(`El dataset debe tener 48 selecciones. Actualmente tiene ${worldCup2026Squads.length}.`);
  }

  await Posicion.bulkCreate(POSICIONES.map((nombre) => ({ nombre })));

  const posicionRows = await Posicion.findAll();
  const posicionMap = Object.fromEntries(posicionRows.map((p) => [p.nombre, p.idPosicion]));

  await Usuario.create({
    codigo: 'demo',
    nombre: 'Usuario Demo',
  });

  for (const [teamIndex, team] of worldCup2026Squads.entries()) {
    if (team.plantel.length !== OFFICIAL_PLAYERS_PER_TEAM) {
      throw new Error(
        `La selección ${team.codigo} debe tener ${OFFICIAL_PLAYERS_PER_TEAM} jugadores oficiales. Tiene ${team.plantel.length}.`
      );
    }

    if (!team.directorTecnico?.nombreCompleto) {
      throw new Error(`La selección ${team.codigo} no tiene director técnico cargado.`);
    }

    const { nroDesde, nroHasta } = getGlobalRange(teamIndex);

    const seleccion = await Seleccion.create({
      codigo: team.codigo,
      nombre: team.nombre,
      asociacion: `Federación/Asociación de fútbol de ${team.nombre}`,
      flagUrl: placeholderFlagPath(team.codigo),
      nroDesde,
      nroHasta,
      ...DEFAULT_COLORS,
    });

    for (const player of team.plantel) {
      await crearFiguritaJugador({
        Figurita,
        Jugador,
        posicionMap,
        seleccion,
        teamIndex,
        player,
      });
    }

    for (const special of SPECIAL_STICKERS) {
      await crearFiguritaEspecial({
        Figurita,
        FigEspeciales,
        seleccion,
        teamIndex,
        team,
        special,
      });
    }
  }
}
