export const validarPosicion = (req, res, next) => {
    const { descripcion } = req.body;

    if (typeof descripcion !== 'string' || descripcion.trim() === '') {
        return res.status(400).json({
            error: 'Descripción de la posición inválida.'
        });
    };

    next();
};
