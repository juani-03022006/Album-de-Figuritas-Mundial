function validarSeleccion({ nombreSeleccion, nombrePais, pathBandera, nroDesde, nroHasta, colorPrincipal, colorAcento1, colorAcento2, colorTitulo }) {
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

    if (typeof pathBandera !== 'string' || pathBandera.trim() === '') {
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

    if (typeof colorPrincipal !== 'string' || colorPrincipal.trim() === '') {
        return res.status(400).json({
            error: 'Color Principal es inválido.'
        });
    };

    if (typeof colorAcento1 !== 'string' || colorAcento1.trim() === '') {
        return res.status(400).json({
            error: 'Color Acento 1 es inválido.'
        });
    };

    if (typeof colorAcento2 !== 'string' || colorAcento2.trim() === '') {
        return res.status(400).json({
            error: 'Color Acento 2 es inválido.'
        });
    };

    if (typeof colorTitulo !== 'string' || colorTitulo.trim() === '') {
        return res.status(400).json({
            error: 'Color Titulo es inválido.'
        });
    };
}

export const middlewareValidacionSeleccion = (req, res, next) => {
    validarSeleccion(req.body);
    next();
};
