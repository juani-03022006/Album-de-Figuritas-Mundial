function validarPosicion({ descripcion }) {
    if (typeof descripcion !== 'string' || descripcion.trim() === '') {
        return res.status(400).json({
            error: 'Descripción de la posición inválida.'
        });
    };
};

export const middlewareValidacionPosicion = (req, res, next) => {
    validarPosicion(req.body);
    next();
}
