import { validarFigurita } from './validarFigurita.js';
import { validarJugador } from './validarJugador.js';


export const middlewarePutJugador = (req, res, next) => {
    validarJugador(req.body.jugador);

    next();
};
