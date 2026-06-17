function validarEspecial({ nombre }) {
    if (typeof nombre !== 'string' || nombre.trim() === '') {
        return res.status(400).json({
            error: 'Nombre de Figurita inválido.'
        });
    };
}

export const middlewareValidacionEspecial = (req, res, next) => {
    validarEspecial(req.body.especial);

    next();
};

export const middlewareValidacionEspeciales = (req, res, next) => {
    const arrayEspeciales = req.body;

    arrayEspeciales.forEach(especial => {
        validarEspecial(especial.especial);
    });

    next();
};
