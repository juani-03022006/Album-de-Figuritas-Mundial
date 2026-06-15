import { validarFigurita } from './validarFigurita.js';
import { validarEspecial } from './validarEspecial.js';
import { validarFoto } from './validarFoto.js';
import { validarZip } from './validarZip.js';


export const middlewarePostEspecial = (req, res, next) => {
    validarFigurita(req.body, res);
    validarEspecial(req.body.especial);
    validarFoto(req.file);

    next();
};

export const middlewarePostEspeciales = (req, res, next) => {
    const arrayEspeciales = req.body;

    arrayEspeciales.forEach(especial => {
        validarFigurita(especial, res);
        validarEspecial(req.body.especial);
    });
    validarZip(req.file);

    next();
};