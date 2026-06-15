import { validarFigurita } from './validarFigurita.js';
import { validarJugador } from './validarJugador.js';
import { validarFoto } from './validarFoto.js';
import { validarZip } from './validarZip.js';


export const middlewarePostJugador = (req, res, next) => {
    validarFigurita(req.body, res);
    validarJugador(JSON.parse(req.body.jugador), res);
    validarFoto(req.file);

    next();
};

export const middlewarePostJugadores = (req, res, next) => {
    const arrayJugadores = JSON.parse(req.body.jugadores);

    arrayJugadores.forEach(jugador => {
        validarFigurita(jugador, res);
        validarJugador(jugador.jugador, res);
    });
    validarZip(req.file);

    next();
};
