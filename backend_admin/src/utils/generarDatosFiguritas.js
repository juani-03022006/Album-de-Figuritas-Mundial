import { obtenerUrlEscudo, obtenerUrlFormacion, obtenerUrlJugador, obtenerUrlTecnico } from './buscarUrlFiguritas.js';


export async function generarEscudo(datosSeleccion) {
    const urlEscudo = await obtenerUrlEscudo(datosSeleccion.nombrePais);

    return {
        nroFigurita: datosSeleccion.nroDesde,
        pathTopic: urlEscudo,
        tipo: 'escudo',
        idSeleccion: datosSeleccion.idSeleccion,
        especial: {
            nombre: `Escudo de ${datosSeleccion.nombrePais}`
        }
    };
};

export async function generarFormacion(datosSeleccion) {
    const urlFormacion = await obtenerUrlFormacion(datosSeleccion.nombrePais);

    return {
        nroFigurita: datosSeleccion.nroDesde + 1,
        pathTopic: urlFormacion,
        tipo: 'foto_seleccion',
        idSeleccion: datosSeleccion.idSeleccion,
        especial: {
            nombre: `Foto de selección de ${datosSeleccion.nombrePais}`
        }
    };
};

export async function generarTecnico(datosSeleccion, nombreTecnico) {
    const urlTecnico = await obtenerUrlTecnico(datosSeleccion.nombrePais, nombreTecnico);

    return {
        nroFigurita: datosSeleccion.nroDesde + 2,
        pathTopic: urlTecnico,
        tipo: 'tecnico',
        idSeleccion: datosSeleccion.idSeleccion,
        especial: {
            nombre: `Director técnico - ${nombreTecnico}`
        }
    };
};

export async function generarJugador(datosSeleccion, jugador, idPosicion, indiceJugador) {
    const nroFigurita = datosSeleccion.nroDesde + 2 + indiceJugador;
    const nombreCompleto = [jugador.nombre, jugador.apellido].filter(Boolean).join(' ');
    const urlJugador = await obtenerUrlJugador(datosSeleccion.nombrePais, nombreCompleto);

    return {
        nroFigurita,
        pathTopic: urlJugador,
        tipo: 'jugador',
        idSeleccion: datosSeleccion.idSeleccion,
        jugador: {
            nombre: jugador.nombre,
            apellido: jugador.apellido,
            estatura: jugador.estaturaCm,
            club: jugador.club ?? '',
            fechaNacimiento: jugador.fechaNacimiento,
            idPosicion
        }
    };
};
