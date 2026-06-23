import { obtenerUrlEscudo, obtenerUrlFormacion, obtenerUrlJugador, obtenerUrlTecnico } from './buscarUrlFiguritas.js';


export async function generarEscudo(datosSeleccion) {
    const urlEscudo = await obtenerUrlEscudo(datosSeleccion.nombrePais);
    return {
        "nroFigurita": datosSeleccion.nroDesde,
        "pathToPic": urlEscudo,
        "tipo": "e",
        "idSeleccion": datosSeleccion.idSeleccion,
        "especial": {
            "nombre": `Escudo de ${datosSeleccion.nombrePais}`
        }
    };
};

export async function generarFormacion(datosSeleccion) {
    const urlFormacion = await obtenerUrlFormacion(datosSeleccion.nombrePais);
    return {
        "nroFigurita": datosSeleccion.nroDesde + 1,
        "pathToPic": urlFormacion,
        "tipo": "e",
        "idSeleccion": datosSeleccion.idSeleccion,
        "especial": {
            "nombre": `Formación de ${datosSeleccion.nombrePais}`
        }
    };
};

export async function generarTecnico(datosSeleccion, nombreTecnico) {
    const urlTecnico = await obtenerUrlTecnico(datosSeleccion.nombrePais, nombreTecnico);
    return {
        "nroFigurita": datosSeleccion.nroDesde + 2,
        "pathToPic": urlTecnico,
        "tipo": "e",
        "idSeleccion": datosSeleccion.idSeleccion,
        "especial": {
            "nombre": `${nombreTecnico}`
        }
    };
};

export async function generarJugador(datosSeleccion, jugador, idPosicion) {
    const urlJugador = await obtenerUrlJugador(datosSeleccion.nombrePais, (jugador.nombre, jugador.apellido));
    return {
        "nroFigurita": datosSeleccion.nroDesde + 2 + jugador.numeroCamiseta,
        "pathToPic": urlJugador,
        "tipo": "j",
        "idSeleccion": datosSeleccion.idSeleccion,
        "jugador": {
            "nombre": jugador.nombre,
            "apellido": jugador.apellido,
            "estatura": jugador.estaturaCm,
            "fechaNacimiento": jugador.fechaNacimiento,
            "idPosicion": idPosicion
        }
    };
};
