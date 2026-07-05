function validarEspecial({ nombre }) {
    if (typeof nombre !== 'string' || nombre.trim() === '') {
        throw new Error('Nombre de Figurita inválido.');
    };
};

export const middlewareValidacionEspecial = (req, res, next) => {
    try {
        validarEspecial(req.body);
        next();
    } catch (error) {
        res.status(400).json({ error: error });
    };
};
