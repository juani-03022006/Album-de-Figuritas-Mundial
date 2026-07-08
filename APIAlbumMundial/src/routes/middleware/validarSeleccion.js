function validarSeleccion(datosSeleccion) {
    if (typeof datosSeleccion.nombreSeleccion !== 'string' || datosSeleccion.nombreSeleccion.trim() === '') {
        throw new Error('Nombre de Seleccion inválido.');
    };

    if (typeof datosSeleccion.nombrePais !== 'string' || datosSeleccion.nombrePais.trim() === '') {
        throw new Error('Nombre de Pais inválido.');
    };

    if (typeof datosSeleccion.nroDesde !== 'number') {
        throw new Error('Numero Desde es inválido.');
    };

    if (typeof datosSeleccion.nroHasta !== 'number') {
        throw new Error('Numero Hasta es inválido.');
    };

    if (typeof datosSeleccion.colorPrincipal !== 'string' || datosSeleccion.colorPrincipal.trim() === '') {
        throw new Error('Color Principal es inválido.');
    };

    if (typeof datosSeleccion.colorAcento1 !== 'string' || datosSeleccion.colorAcento1.trim() === '') {
        throw new Error('Color Acento 1 es inválido.');
    };

    if (typeof datosSeleccion.colorAcento2 !== 'string' || datosSeleccion.colorAcento2.trim() === '') {
        throw new Error('Color Acento 2 es inválido.');
    };

    if (typeof datosSeleccion.colorTitulo !== 'string' || datosSeleccion.colorTitulo.trim() === '') {
        throw new Error('Color Titulo es inválido.');
    };

    if (typeof datosSeleccion.grupo !== 'string' || (datosSeleccion.grupo.trim() === '' && 'ABCDEFGHIJKL'.includes(datosSeleccion.grupo))) {
        throw new Error('Grupo es inválido.');
    };
};

export const middlewareValidacionSeleccion = (req, res, next) => {
    try {
        validarSeleccion(req.body);
        next();
    } catch (error) {
        res.status(400).json(error);
    };
};
