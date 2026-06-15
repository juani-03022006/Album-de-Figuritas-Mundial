

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

function mapFigurita(figurita, ownedSet) {
  return {
    id: figurita.idFigurita,
    nroFigurita: figurita.nroFigurita,
    tipo: figurita.tipo,
    orientacion: mapOrientacion(figurita.tipo),
    fotoUrl: figurita.pathTopic,
    tiene: ownedSet.has(figurita.idFigurita),
    jugador: mapJugador(figurita.jugador),
    especial: figurita.especial ? { nombre: figurita.especial.nombre } : null,
  };
}

export async function getAlbumByUsuarioCodigo(codigoUsuario, models) {
  const { Usuario, Seleccion, Figurita, Jugador, FigEspeciales, Posicion, UsuarioFigurita } =
    models;

  const usuario = await Usuario.findOne({ where: { codigo: codigoUsuario } });
  if (!usuario) {
    const error = new Error('Usuario no encontrado');
    error.statusCode = 404;
    throw error;
  }

  const ownedRows = await UsuarioFigurita.findAll({
    where: { idUsuario: usuario.idUsuario },
    attributes: ['idFigurita'],
  });
  const ownedSet = new Set(ownedRows.map((row) => row.idFigurita));

  const selecciones = await Seleccion.findAll({ order: [['idSeleccion', 'ASC']] });

  const seleccionesResponse = await Promise.all(
    selecciones.map(async (seleccion) => {
      const figuritas = await Figurita.findAll({
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

      return {
        id: seleccion.codigo,
        nombre: seleccion.nombre,
        asociacion: seleccion.asociacion,
        flagUrl: seleccion.flagUrl,
        colores: {
          main: seleccion.colorMain,
          accent1: seleccion.colorAccent1,
          accent2: seleccion.colorAccent2,
          text: seleccion.colorText,
        },
        figuritas: figuritas.map((figurita) => mapFigurita(figurita, ownedSet)),
      };
    })
  );

  return {
    usuarioId: usuario.codigo,
    selecciones: seleccionesResponse,
  };
}
