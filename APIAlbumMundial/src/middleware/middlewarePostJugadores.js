import { validarFigurita } from './validarFigurita.js';
import { validarJugador } from './validarJugador.js';
import { validarFoto } from './validarFoto.js';
import { validarZip } from './validarZip.js';


export const middlewarePostJugador = (req, res, next) => {
    validarFigurita(req.body);
    validarJugador(req.body.jugador);
    validarFoto(req.file);

    next();
};

export const middlewarePostJugadores = (req, res, next) => {
    const arrayJugadores = req.body;

    arrayJugadores.forEach(jugador => {
        validarFigurita(jugador);
        validarJugador(jugador.jugador);
    });
    validarZip(req.file);

    next();
};
