export const validarSeleccion = (req, res, next) => {
    const { nombreSeleccion, nombrePais, banderaPais, nroDesde, nroHasta } = req.body;

    if (typeof nombreSeleccion !== 'string' || nombreSeleccion.trim() === '') {
        return res.status(400).json({
            error: 'Nombre de Seleccion inválido.'
        });
    };

    if (typeof nombrePais !== 'string' || nombrePais.trim() === '') {
        return res.status(400).json({
            error: 'Nombre de Pais inválido.'
        });
    };

    if (typeof banderaPais !== 'string' || banderaPais.trim() === '') {
        return res.status(400).json({
            error: 'Bandera de pais inválida.'
        });
    };

    if (typeof nroDesde !== 'number') {
        return res.status(400).json({
            error: 'Numero Desde es inválido.'
        });
    };

    if (typeof nroHasta !== 'number') {
        return res.status(400).json({
            error: 'Numero Hasta es inválido.'
        });
    };

    next();
};
