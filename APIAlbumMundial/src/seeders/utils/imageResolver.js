const WIKIDATA_API = 'https://www.wikidata.org/w/api.php';
const COMMONS_API = 'https://commons.wikimedia.org/w/api.php';
const COMMONS_FILE_PATH = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/';

const DEFAULT_TIMEOUT_MS = Number(process.env.SEED_IMAGE_TIMEOUT_MS ?? 2500);
const REQUEST_DELAY_MS = Number(process.env.SEED_IMAGE_REQUEST_DELAY_MS ?? 0);
const ENABLE_LOGS = process.env.SEED_IMAGE_LOG === 'true';

const memoryCache = new Map();

function log(...args) {
  if (ENABLE_LOGS) console.log('[seed-images]', ...args);
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeText(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function compact(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

export function commonsFileUrl(fileName, width = 640) {
  if (!fileName) return null;
  return `${COMMONS_FILE_PATH}${encodeURIComponent(fileName)}?width=${width}`;
}

function svgDataUrl({ label, background = '#334155', foreground = '#FFFFFF', sublabel = '' }) {
  const safeLabel = compact(label).slice(0, 60) || 'SIN IMAGEN';
  const safeSublabel = compact(sublabel).slice(0, 80);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="640" height="896" viewBox="0 0 640 896">
      <rect width="640" height="896" fill="${background}"/>
      <rect x="32" y="32" width="576" height="832" rx="36" fill="none" stroke="${foreground}" stroke-opacity="0.35" stroke-width="8"/>
      <circle cx="320" cy="315" r="125" fill="${foreground}" fill-opacity="0.16"/>
      <path d="M210 620c28-78 82-118 110-118s82 40 110 118" fill="none" stroke="${foreground}" stroke-opacity="0.28" stroke-width="32" stroke-linecap="round"/>
      <text x="320" y="720" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="44" font-weight="700" fill="${foreground}">${safeLabel}</text>
      <text x="320" y="775" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="500" fill="${foreground}" fill-opacity="0.82">${safeSublabel}</text>
    </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function fallbackImageUrl({ label, teamCode, colors = {} }) {
  return svgDataUrl({
    label,
    sublabel: teamCode ? `Imagen pendiente - ${teamCode}` : 'Imagen pendiente',
    background: colors.colorMain ?? '#334155',
    foreground: colors.colorText ?? '#FFFFFF',
  });
}

function buildUrl(baseUrl, params) {
  const url = new URL(baseUrl);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) url.searchParams.set(key, value);
  });
  return url.toString();
}

async function fetchJson(url, cacheKey) {
  if (memoryCache.has(cacheKey)) return memoryCache.get(cacheKey);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    await wait(REQUEST_DELAY_MS);
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        // Wikimedia recomienda identificar la app que usa la API.
        'User-Agent': 'AlbumMundialSeeder/1.0 (development; educational project)',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} al consultar ${url}`);
    }

    const data = await response.json();
    memoryCache.set(cacheKey, data);
    return data;
  } catch (error) {
    log('falló consulta', error.message);
    memoryCache.set(cacheKey, null);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function searchWikidataEntities(query, limit = 5) {
  const cleanQuery = compact(query);
  if (!cleanQuery) return [];

  const url = buildUrl(WIKIDATA_API, {
    action: 'wbsearchentities',
    search: cleanQuery,
    language: 'en',
    uselang: 'en',
    format: 'json',
    limit: String(limit),
    origin: '*',
  });

  const data = await fetchJson(url, `wikidata-search:${cleanQuery}:${limit}`);
  return Array.isArray(data?.search) ? data.search : [];
}

async function getWikidataEntity(id) {
  if (!id) return null;

  const url = buildUrl(WIKIDATA_API, {
    action: 'wbgetentities',
    ids: id,
    props: 'claims|labels|descriptions',
    languages: 'en',
    format: 'json',
    origin: '*',
  });

  const data = await fetchJson(url, `wikidata-entity:${id}`);
  return data?.entities?.[id] ?? null;
}

function getClaimFileName(entity, propertyIds) {
  for (const propertyId of propertyIds) {
    const claim = entity?.claims?.[propertyId]?.find(
      (item) => item?.mainsnak?.datavalue?.type === 'string'
    );
    const fileName = claim?.mainsnak?.datavalue?.value;
    if (fileName) return fileName;
  }

  return null;
}

function scoreWikidataCandidate(candidate, hints = []) {
  const label = normalizeText(candidate?.label);
  const description = normalizeText(candidate?.description);
  const aliases = normalizeText((candidate?.aliases ?? []).join(' '));
  const text = `${label} ${description} ${aliases}`;

  let score = 0;
  if (description.includes('football') || description.includes('soccer')) score += 6;
  if (description.includes('association football')) score += 3;
  if (description.includes('player') || description.includes('manager') || description.includes('coach')) score += 2;

  for (const hint of hints.map(normalizeText).filter(Boolean)) {
    if (label === hint) score += 5;
    if (label.includes(hint) || hint.includes(label)) score += 3;
    if (text.includes(hint)) score += 1;
  }

  return score;
}

async function imageFromWikidata({ queries, propertyIds, width = 640, hints = [] }) {
  const candidatesById = new Map();

  for (const query of queries.filter(Boolean)) {
    const results = await searchWikidataEntities(query, 6);
    for (const result of results) {
      if (!result?.id || candidatesById.has(result.id)) continue;
      candidatesById.set(result.id, {
        ...result,
        _score: scoreWikidataCandidate(result, hints),
      });
    }
  }

  const candidates = [...candidatesById.values()].sort((a, b) => b._score - a._score);

  for (const candidate of candidates) {
    const entity = await getWikidataEntity(candidate.id);
    const fileName = getClaimFileName(entity, propertyIds);
    if (fileName) {
      const url = commonsFileUrl(fileName, width);
      log('wikidata', candidate.label, candidate.id, fileName);
      return url;
    }
  }

  return null;
}

async function imageFromCommonsSearch({ queries, width = 640 }) {
  for (const query of queries.filter(Boolean).map(compact)) {
    const url = buildUrl(COMMONS_API, {
      action: 'query',
      generator: 'search',
      gsrsearch: query,
      gsrnamespace: '6',
      gsrlimit: '8',
      prop: 'imageinfo',
      iiprop: 'url|mime|size',
      iiurlwidth: String(width),
      format: 'json',
      origin: '*',
    });

    const data = await fetchJson(url, `commons-search:${query}:${width}`);
    const pages = Object.values(data?.query?.pages ?? {});

    const imagePage = pages.find((page) => {
      const info = page?.imageinfo?.[0];
      return info?.mime?.startsWith('image/') && (info?.thumburl || info?.url);
    });

    const info = imagePage?.imageinfo?.[0];
    const foundUrl = info?.thumburl ?? info?.url;

    if (foundUrl) {
      log('commons', query, foundUrl);
      return foundUrl;
    }
  }

  return null;
}

function playerSearchQueries(player, team) {
  const fullName = compact(`${player.nombre} ${player.apellido}`);
  const fifaName = compact(player.nombreCompletoFifa);
  const searchName = team.visuals?.searchName ?? `${team.nombre} national football team`;

  return [
    `${fullName} footballer`,
    `${fifaName} footballer`,
    `${fullName} ${searchName}`,
    `${player.nombreCamiseta ?? player.apellido} ${team.nombre} footballer`,
  ];
}

function coachSearchQueries(team) {
  const coach = team.directorTecnico;
  const fullName = compact(`${coach?.nombre ?? ''} ${coach?.apellido ?? ''}`) || coach?.nombreCompleto;
  return [
    `${fullName} football manager`,
    `${coach?.nombreCompleto ?? fullName} football coach`,
    `${fullName} ${team.visuals?.searchName ?? team.nombre}`,
  ];
}

export async function resolvePlayerImageUrl(player, team) {
  const fullName = compact(`${player.nombre} ${player.apellido}`);

  const wikidataUrl = await imageFromWikidata({
    queries: playerSearchQueries(player, team),
    propertyIds: ['P18'],
    width: 520,
    hints: [fullName, player.nombreCompletoFifa, player.nombreCamiseta],
  });

  if (wikidataUrl) return wikidataUrl;

  const commonsUrl = await imageFromCommonsSearch({
    queries: playerSearchQueries(player, team),
    width: 520,
  });

  return commonsUrl;
}

export async function resolveCoachImageUrl(team) {
  const fullName = team.directorTecnico?.nombreCompleto ?? 'Director técnico';

  const wikidataUrl = await imageFromWikidata({
    queries: coachSearchQueries(team),
    propertyIds: ['P18'],
    width: 520,
    hints: [fullName, team.directorTecnico?.apellido],
  });

  if (wikidataUrl) return wikidataUrl;

  return imageFromCommonsSearch({ queries: coachSearchQueries(team), width: 520 });
}

export async function resolveTeamShieldUrl(team) {
  const searchName = team.visuals?.searchName ?? `${team.nombre} national football team`;

  const wikidataUrl = await imageFromWikidata({
    queries: [searchName, `${searchName} logo`, `${searchName} badge`, `${team.nombre} football association logo`],
    // P154 = logo image; P18 = representative image; P41 = flag fallback.
    propertyIds: ['P154', 'P18', 'P41'],
    width: 520,
    hints: [searchName, team.nombre],
  });

  if (wikidataUrl) return wikidataUrl;

  const commonsUrl = await imageFromCommonsSearch({
    queries: [`${searchName} logo`, `${searchName} badge`, `${team.nombre} football federation logo`],
    width: 520,
  });

  return commonsUrl ?? team.visuals?.flagUrl ?? null;
}

export async function resolveTeamPhotoUrl(team) {
  const searchName = team.visuals?.searchName ?? `${team.nombre} national football team`;

  const commonsUrl = await imageFromCommonsSearch({
    queries: [
      `${searchName} squad`,
      `${searchName} team photo`,
      `${searchName} players`,
      `${searchName}`,
    ],
    width: 900,
  });

  if (commonsUrl) return commonsUrl;

  return imageFromWikidata({
    queries: [searchName],
    propertyIds: ['P18'],
    width: 900,
    hints: [searchName, team.nombre],
  });
}

export async function resolveTeamFlagUrl(team) {
  if (team.visuals?.flagUrl) return team.visuals.flagUrl;

  const wikidataUrl = await imageFromWikidata({
    queries: [team.nombre, `${team.nombre} country`, `${team.nombre} flag`],
    propertyIds: ['P41'],
    width: 640,
    hints: [team.nombre],
  });

  return wikidataUrl;
}

export async function resolveStickerImagesForTeam(team) {
  const colors = team.visuals ?? {};
  const playerImages = {};

  for (const player of team.plantel) {
    const label = compact(`${player.nombre} ${player.apellido}`);
    const remoteUrl = await resolvePlayerImageUrl(player, team);
    playerImages[player.numeroCamiseta] =
      remoteUrl ?? fallbackImageUrl({ label, teamCode: team.codigo, colors });
  }

  const escudoUrl =
    (await resolveTeamShieldUrl(team)) ??
    fallbackImageUrl({ label: `Escudo ${team.nombre}`, teamCode: team.codigo, colors });

  const fotoEquipoUrl =
    (await resolveTeamPhotoUrl(team)) ??
    fallbackImageUrl({ label: `Selección ${team.nombre}`, teamCode: team.codigo, colors });

  const tecnicoUrl =
    (await resolveCoachImageUrl(team)) ??
    fallbackImageUrl({
      label: team.directorTecnico?.nombreCompleto ?? 'Director técnico',
      teamCode: team.codigo,
      colors,
    });

  const flagUrl =
    (await resolveTeamFlagUrl(team)) ??
    team.visuals?.flagUrl ??
    fallbackImageUrl({ label: team.codigo, teamCode: team.codigo, colors });

  return {
    flagUrl,
    players: playerImages,
    specials: {
      escudo: escudoUrl,
      foto_equipo: fotoEquipoUrl,
      tecnico: tecnicoUrl,
    },
  };
}

export function buildFallbackStickerImagesForTeam(team) {
  const colors = team.visuals ?? {};
  const playerImages = Object.fromEntries(
    team.plantel.map((player) => [
      player.numeroCamiseta,
      fallbackImageUrl({
        label: compact(`${player.nombre} ${player.apellido}`),
        teamCode: team.codigo,
        colors,
      }),
    ])
  );

  return {
    flagUrl: team.visuals?.flagUrl ?? fallbackImageUrl({ label: team.codigo, teamCode: team.codigo, colors }),
    players: playerImages,
    specials: {
      escudo: team.visuals?.flagUrl ?? fallbackImageUrl({ label: `Escudo ${team.nombre}`, teamCode: team.codigo, colors }),
      foto_equipo: fallbackImageUrl({ label: `Selección ${team.nombre}`, teamCode: team.codigo, colors }),
      tecnico: fallbackImageUrl({
        label: team.directorTecnico?.nombreCompleto ?? 'Director técnico',
        teamCode: team.codigo,
        colors,
      }),
    },
  };
}
