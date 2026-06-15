import { validarEspecial } from './validarEspecial.js';


export const middlewarePutEspecial = (req, res, next) => {
    validarEspecial(req.body.jugador);

    next();
};
