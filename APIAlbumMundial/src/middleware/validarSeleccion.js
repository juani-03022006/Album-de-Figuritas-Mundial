function validarSeleccion(datosSeleccion) {
    if (typeof datosSeleccion.nombreSeleccion !== 'string' || datosSeleccion.nombreSeleccion.trim() === '') {
        return res.status(400).json({
            error: 'Nombre de Seleccion inválido.'
        });
    };

    if (typeof datosSeleccion.nombrePais !== 'string' || datosSeleccion.nombrePais.trim() === '') {
        return res.status(400).json({
            error: 'Nombre de Pais inválido.'
        });
    };

    if (typeof datosSeleccion.urlBandera !== 'string' || datosSeleccion.urlBandera.trim() === '') {
        return res.status(400).json({
            error: 'Bandera de pais inválida.'
        });
    };

    if (typeof datosSeleccion.nroDesde !== 'number') {
        return res.status(400).json({
            error: 'Numero Desde es inválido.'
        });
    };

    if (typeof datosSeleccion.nroHasta !== 'number') {
        return res.status(400).json({
            error: 'Numero Hasta es inválido.'
        });
    };

    if (typeof datosSeleccion.colorPrincipal !== 'string' || datosSeleccion.colorPrincipal.trim() === '') {
        return res.status(400).json({
            error: 'Color Principal es inválido.'
        });
    };

    if (typeof datosSeleccion.colorAcento1 !== 'string' || datosSeleccion.colorAcento1.trim() === '') {
        return res.status(400).json({
            error: 'Color Acento 1 es inválido.'
        });
    };

    if (typeof datosSeleccion.colorAcento2 !== 'string' || datosSeleccion.colorAcento2.trim() === '') {
        return res.status(400).json({
            error: 'Color Acento 2 es inválido.'
        });
    };

    if (typeof datosSeleccion.colorTitulo !== 'string' || datosSeleccion.colorTitulo.trim() === '') {
        return res.status(400).json({
            error: 'Color Titulo es inválido.'
        });
    };

    if (typeof datosSeleccion.grupo !== 'string' || (datosSeleccion.grupo.trim() === '' && 'ABCDEFGHIJKL'.includes(datosSeleccion.grupo))) {
        return res.status(400).json({
            error: 'Grupo es inválido.'
        });
    };
};

export const middlewareValidacionSeleccion = (req, res, next) => {
    validarSeleccion(req.body);
    next();
};
