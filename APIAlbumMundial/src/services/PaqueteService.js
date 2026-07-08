import sequelize from '../repositories/sequelizeConnection.js';
import {
  findOrCreateUsuario,
  getLocalStickerNumber,
  normalizeTipoFigurita,
} from './albumUtils.js';
const PACKAGE_INTERVAL_HOURS = 4;
const PACKAGE_INTERVAL_MS = PACKAGE_INTERVAL_HOURS * 60 * 60 * 1000;
const FIGURITAS_PER_PACKAGE = 7;

function getNow() {
  return new Date();
}

function getLastOpenedDate(usuario) {
  if (!usuario?.ultimoPaqueteAbiertoAt) return null;

  const date = new Date(usuario.ultimoPaqueteAbiertoAt);
  return Number.isNaN(date.getTime()) ? null : date;
}

function buildPackageStatus(usuario, now = getNow()) {
  const ultimoPaqueteAbiertoAt = getLastOpenedDate(usuario);

  if (!ultimoPaqueteAbiertoAt) {
    return {
      disponible: true,
      intervaloHoras: PACKAGE_INTERVAL_HOURS,
      figuritasPorPaquete: FIGURITAS_PER_PACKAGE,
      ultimoPaqueteAbiertoAt: null,
      proximoPaqueteDisponibleAt: now.toISOString(),
      milisegundosRestantes: 0,
    };
  }

  const proximoPaqueteDisponibleAt = new Date(
    ultimoPaqueteAbiertoAt.getTime() + PACKAGE_INTERVAL_MS
  );
  const milisegundosRestantes = Math.max(
    0,
    proximoPaqueteDisponibleAt.getTime() - now.getTime()
  );

  return {
    disponible: milisegundosRestantes === 0,
    intervaloHoras: PACKAGE_INTERVAL_HOURS,
    figuritasPorPaquete: FIGURITAS_PER_PACKAGE,
    ultimoPaqueteAbiertoAt: ultimoPaqueteAbiertoAt.toISOString(),
    proximoPaqueteDisponibleAt: proximoPaqueteDisponibleAt.toISOString(),
    milisegundosRestantes,
  };
}

function getFiguritaNombre(figurita) {
  if (figurita.jugador) {
    return [figurita.jugador.nombre, figurita.jugador.apellido]
      .filter(Boolean)
      .join(' ')
      .trim();
  }

  if (figurita.especial?.nombre) {
    return figurita.especial.nombre;
  }

  return `Figurita ${figurita.nroFigurita}`;
}

function mapPackageFigurita(figurita, yaLaTenia) {
  const seleccion = figurita.seleccion ?? figurita.Seleccion;

  return {
    id: figurita.idFigurita,
    nroFigurita: figurita.nroFigurita,
    nroLocal: getLocalStickerNumber(figurita, seleccion),
    nombre: getFiguritaNombre(figurita),
    tipo: normalizeTipoFigurita(figurita),
    yaLaTenia,
    seleccion: seleccion
      ? {
          id: String(seleccion.codigo ?? seleccion.idSeleccion ?? '').trim(),
          nombre: seleccion.nombre ?? seleccion.nombrePais ?? seleccion.nombreSeleccion ?? '',
          grupo: seleccion.grupo ?? '',
        }
      : null,
  };
}

async function getRandomFiguritas(models) {
  const { Figurita, FiguritaJugador, FiguritaEspecial, Posicion, Seleccion } = models;

  const figuritas = await Figurita.findAll({
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
      {
        model: Seleccion,
        as: 'seleccion',
      },
    ],
    order: sequelize.random(),
    limit: FIGURITAS_PER_PACKAGE,
  });

  if (figuritas.length < FIGURITAS_PER_PACKAGE) {
    const error = new Error('No hay suficientes figuritas cargadas para abrir un paquete');
    error.statusCode = 500;
    throw error;
  }

  return figuritas;
}

export async function getEstadoPaqueteByUsuarioCodigo(codigoUsuario, models, perfilUsuario = {}) {
  const { Usuario } = models;
  const usuario = await findOrCreateUsuario(Usuario, codigoUsuario, perfilUsuario);

  return buildPackageStatus(usuario);
}

export async function abrirPaqueteByUsuarioCodigo(codigoUsuario, models, perfilUsuario = {}) {
  const { Usuario, UsuarioFigurita } = models;
  const usuario = await findOrCreateUsuario(Usuario, codigoUsuario, perfilUsuario);
  const estadoActual = buildPackageStatus(usuario);

  if (!estadoActual.disponible) {
    const error = new Error('Todavía no hay un paquete disponible para este usuario');
    error.statusCode = 409;
    error.details = estadoActual;
    throw error;
  }

  const figuritas = await getRandomFiguritas(models);
  const resultado = [];

  for (const figurita of figuritas) {
    const [registro, created] = await UsuarioFigurita.findOrCreate({
      where: {
        idUsuario: usuario.idUsuario,
        idFigurita: figurita.idFigurita,
      },
      defaults: {
        idUsuario: usuario.idUsuario,
        idFigurita: figurita.idFigurita,
      },
    });


    void registro;
    resultado.push(mapPackageFigurita(figurita, !created));
  }

  const now = getNow();
  await usuario.update({ ultimoPaqueteAbiertoAt: now });

  return {
    abiertoAt: now.toISOString(),
    estado: buildPackageStatus({ ultimoPaqueteAbiertoAt: now }, now),
    figuritas: resultado,
  };
}
