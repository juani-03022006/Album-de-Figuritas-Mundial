import { obtenerUrlEscudo, obtenerUrlFormacion, obtenerUrlJugador, obtenerUrlTecnico } from './buscarUrlFiguritas.js';

function numeroGlobal(datosSeleccion, posicionLocal) {
    return Number(datosSeleccion.nroDesde) + Number(posicionLocal) - 1;
};

export async function generarEscudo(datosSeleccion) {
    const nroFigurita = numeroGlobal(datosSeleccion, 1);
    const urlEscudo = await obtenerUrlEscudo(datosSeleccion.nombrePais);

    return {
        idFigurita: nroFigurita,
        nroFigurita,
        pathTopic: urlEscudo,
        tipo: 'escudo',
        idSeleccion: datosSeleccion.idSeleccion,
        especial: {
            nombre: `Escudo de ${datosSeleccion.nombrePais}`
        }
    };
};

export async function generarFormacion(datosSeleccion) {
    const nroFigurita = numeroGlobal(datosSeleccion, 2);
    const urlFormacion = await obtenerUrlFormacion(datosSeleccion.nombrePais);

    return {
        idFigurita: nroFigurita,
        nroFigurita,
        pathTopic: urlFormacion,
        tipo: 'foto_seleccion',
        idSeleccion: datosSeleccion.idSeleccion,
        especial: {
            nombre: `Foto de selección de ${datosSeleccion.nombrePais}`
        }
    };
};

export async function generarTecnico(datosSeleccion, nombreTecnico) {
    const nroFigurita = numeroGlobal(datosSeleccion, 3);
    const urlTecnico = await obtenerUrlTecnico(datosSeleccion.nombrePais, nombreTecnico);

    return {
        idFigurita: nroFigurita,
        nroFigurita,
        pathTopic: urlTecnico,
        tipo: 'tecnico',
        idSeleccion: datosSeleccion.idSeleccion,
        especial: {
            nombre: `Director técnico - ${nombreTecnico}`
        }
    };
};

export async function generarJugador(datosSeleccion, jugador, idPosicion, indiceJugador = 0) {
    const nroFigurita = numeroGlobal(datosSeleccion, 4 + indiceJugador);
    const nombreCompleto = [jugador.nombre, jugador.apellido].filter(Boolean).join(' ');
    const urlJugador = await obtenerUrlJugador(datosSeleccion.nombrePais, nombreCompleto);

    return {
        idFigurita: nroFigurita,
        nroFigurita,
        pathTopic: urlJugador,
        tipo: 'jugador',
        idSeleccion: datosSeleccion.idSeleccion,
        jugador: {
            nombre: jugador.nombre,
            apellido: jugador.apellido,
            estatura: jugador.estaturaCm,
            peso: jugador.peso ?? null,
            club: jugador.club ?? '',
            fechaNacimiento: jugador.fechaNacimiento,
            idPosicion
        }
    };
};
