export const validarEspecial = (req, res, next) => {
    const { nombre } = req.body.especial;

    if (typeof nombre !== 'string' || nombre.trim() === '') {
        return res.status(400).json({
            error: 'Nombre de Figurita inválido.'
        });
    };

    next();
};
