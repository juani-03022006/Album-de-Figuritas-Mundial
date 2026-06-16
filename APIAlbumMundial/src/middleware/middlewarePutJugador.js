import { validarJugador } from './validarJugador.js';


export const middlewarePutJugador = (req, res, next) => {
    validarJugador(JSON.parse(req.body.jugador), res);
    next();
};
