const DEFAULT_PROVIDER = String(process.env.LAZY_DIRECT_SEARCH_PROVIDER ?? 'bing').toLowerCase();
const ENABLE_DIRECT_SEARCH_IMAGES = process.env.LAZY_DIRECT_SEARCH_IMAGES !== 'false';

// Estas medidas mantienen el límite de resolución bajo, pero respetan la proporción
// real de las figuritas del frontend:
// portrait: 72 x 100  => 360 x 500
// landscape: 144 x 100 => 720 x 500
export const THUMBNAIL_SIZES = {
  portrait: {
    width: Number(process.env.LAZY_IMAGE_PORTRAIT_WIDTH ?? 360),
    height: Number(process.env.LAZY_IMAGE_PORTRAIT_HEIGHT ?? 500),
  },
  landscape: {
    width: Number(process.env.LAZY_IMAGE_LANDSCAPE_WIDTH ?? 720),
    height: Number(process.env.LAZY_IMAGE_LANDSCAPE_HEIGHT ?? 500),
  },
  flag: {
    width: Number(process.env.LAZY_IMAGE_FLAG_WIDTH ?? 180),
    height: Number(process.env.LAZY_IMAGE_FLAG_HEIGHT ?? 120),
  },
};

function compact(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function sanitizeHex(value, fallback) {
  const clean = String(value ?? '')
    .replace('#', '')
    .trim();

  return /^[0-9a-fA-F]{6}$/.test(clean) ? clean : fallback;
}

function buildBingThumbnailUrl(query, { width, height }) {
  const params = new URLSearchParams({
    q: compact(query),
    w: String(width),
    h: String(height),
    c: '7',
    rs: '1',
    p: '0',
    o: '5',
    pid: '1.7',
  });

  return `https://tse1.mm.bing.net/th?${params.toString()}`;
}

function buildDirectSearchThumbnailUrl(query, size) {
  if (!ENABLE_DIRECT_SEARCH_IMAGES) return null;
  if (DEFAULT_PROVIDER !== 'bing') return null;
  return buildBingThumbnailUrl(query, size);
}

export function fallbackImageUrl({
  label,
  teamCode,
  colors = {},
  width = THUMBNAIL_SIZES.portrait.width,
  height = THUMBNAIL_SIZES.portrait.height,
}) {
  const bg = sanitizeHex(colors.colorMain, '334155');
  const fg = sanitizeHex(colors.colorText, 'FFFFFF');
  const title = compact(label).slice(0, 34) || 'SIN IMAGEN';
  const subtitle = teamCode ? `PENDIENTE ${teamCode}` : 'PENDIENTE';
  const text = `${title}\n${subtitle}`;

  return `https://placehold.co/${width}x${height}/${bg}/${fg}.svg?font=montserrat&text=${encodeURIComponent(text)}`;
}

export function commonsFileUrl(fileName, width = THUMBNAIL_SIZES.portrait.width) {
  if (!fileName) return null;
  const url = new URL(`https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(fileName)}`);
  url.searchParams.set('width', String(width));
  return url.toString();
}

function teamSearchName(team) {
  return team.visuals?.searchName ?? `${team.nombre} national football team`;
}

function playerFullName(player) {
  return compact(`${player.nombre} ${player.apellido}`) || compact(player.nombreCompletoFifa);
}

export async function resolvePlayerImageUrl(player, team) {
  const fullName = playerFullName(player);
  const query = `${fullName} ${team.nombre} national football team player portrait`;

  return (
    buildDirectSearchThumbnailUrl(query, THUMBNAIL_SIZES.portrait) ??
    fallbackImageUrl({
      label: fullName,
      teamCode: team.codigo,
      colors: team.visuals,
      ...THUMBNAIL_SIZES.portrait,
    })
  );
}

export async function resolveCoachImageUrl(team) {
  const fullName = team.directorTecnico?.nombreCompleto ?? 'Director técnico';
  const query = `${fullName} ${team.nombre} national football team coach portrait`;

  return (
    buildDirectSearchThumbnailUrl(query, THUMBNAIL_SIZES.portrait) ??
    fallbackImageUrl({
      label: fullName,
      teamCode: team.codigo,
      colors: team.visuals,
      ...THUMBNAIL_SIZES.portrait,
    })
  );
}

export async function resolveTeamShieldUrl(team) {
  const query = `${team.nombre} national football team crest logo png`;

  return (
    buildDirectSearchThumbnailUrl(query, THUMBNAIL_SIZES.portrait) ??
    fallbackImageUrl({
      label: `Escudo ${team.nombre}`,
      teamCode: team.codigo,
      colors: team.visuals,
      ...THUMBNAIL_SIZES.portrait,
    })
  );
}

export async function resolveTeamPhotoUrl(team) {
  const query = `${team.nombre} national football team squad photo`;

  return (
    buildDirectSearchThumbnailUrl(query, THUMBNAIL_SIZES.landscape) ??
    fallbackImageUrl({
      label: `Selección ${team.nombre}`,
      teamCode: team.codigo,
      colors: team.visuals,
      ...THUMBNAIL_SIZES.landscape,
    })
  );
}

export async function resolveTeamFlagUrl(team) {
  const query = `${team.nombre} flag`;

  return (
    buildDirectSearchThumbnailUrl(query, THUMBNAIL_SIZES.flag) ??
    team.visuals?.flagUrl ??
    fallbackImageUrl({
      label: team.codigo,
      teamCode: team.codigo,
      colors: team.visuals,
      ...THUMBNAIL_SIZES.flag,
    })
  );
}

export async function resolveStickerImagesForTeam(team) {
  const playerEntries = await Promise.all(
    team.plantel.map(async (player) => [
      player.numeroCamiseta,
      await resolvePlayerImageUrl(player, team),
    ])
  );

  const [escudoUrl, fotoEquipoUrl, tecnicoUrl, flagUrl] = await Promise.all([
    resolveTeamShieldUrl(team),
    resolveTeamPhotoUrl(team),
    resolveCoachImageUrl(team),
    resolveTeamFlagUrl(team),
  ]);

  return {
    flagUrl,
    players: Object.fromEntries(playerEntries),
    specials: {
      escudo: escudoUrl,
      foto_equipo: fotoEquipoUrl,
      tecnico: tecnicoUrl,
    },
  };
}

export function buildFallbackStickerImagesForTeam(team) {
  // En esta versión el fallback también usa URLs remotas de thumbnail, porque no hace
  // consultas externas ni descarga archivos. Sólo arma URLs directas y rápidas.
  const playerImages = Object.fromEntries(
    team.plantel.map((player) => {
      const fullName = playerFullName(player);
      return [
        player.numeroCamiseta,
        buildDirectSearchThumbnailUrl(
          `${fullName} ${team.nombre} national football team player portrait`,
          THUMBNAIL_SIZES.portrait
        ) ??
          fallbackImageUrl({
            label: fullName,
            teamCode: team.codigo,
            colors: team.visuals,
            ...THUMBNAIL_SIZES.portrait,
          }),
      ];
    })
  );

  return {
    flagUrl:
      buildDirectSearchThumbnailUrl(`${team.nombre} flag`, THUMBNAIL_SIZES.flag) ??
      team.visuals?.flagUrl ??
      fallbackImageUrl({
        label: team.codigo,
        teamCode: team.codigo,
        colors: team.visuals,
        ...THUMBNAIL_SIZES.flag,
      }),
    players: playerImages,
    specials: {
      escudo:
        buildDirectSearchThumbnailUrl(
          `${team.nombre} national football team crest logo png`,
          THUMBNAIL_SIZES.portrait
        ) ??
        fallbackImageUrl({
          label: `Escudo ${team.nombre}`,
          teamCode: team.codigo,
          colors: team.visuals,
          ...THUMBNAIL_SIZES.portrait,
        }),
      foto_equipo:
        buildDirectSearchThumbnailUrl(
          `${team.nombre} national football team squad photo`,
          THUMBNAIL_SIZES.landscape
        ) ??
        fallbackImageUrl({
          label: `Selección ${team.nombre}`,
          teamCode: team.codigo,
          colors: team.visuals,
          ...THUMBNAIL_SIZES.landscape,
        }),
      tecnico:
        buildDirectSearchThumbnailUrl(
          `${team.directorTecnico?.nombreCompleto ?? 'Director técnico'} ${team.nombre} national football team coach portrait`,
          THUMBNAIL_SIZES.portrait
        ) ??
        fallbackImageUrl({
          label: team.directorTecnico?.nombreCompleto ?? 'Director técnico',
          teamCode: team.codigo,
          colors: team.visuals,
          ...THUMBNAIL_SIZES.portrait,
        }),
    },
  };
}
