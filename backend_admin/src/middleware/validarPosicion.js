function validarPosicion({ descripcion }) {
    if (typeof descripcion !== 'string' || descripcion.trim() === '') {
        throw new Error('Descripción de la posición inválida.');
    };
};

export const middlewareValidacionPosicion = (req, res, next) => {
    try {
        validarPosicion(req.body);
        next();
    } catch (error) {
        res.status(400).json({ error: error });
    };
}
