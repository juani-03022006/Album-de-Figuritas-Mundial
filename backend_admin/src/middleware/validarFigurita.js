function validarFigurita({ nroFigurita, nombreFoto, tipo, idSeleccion }) {
    if (typeof nroFigurita !== 'number') {
        throw new Error('Número de figurita inválido.');
    };

    if (typeof nombreFoto !== 'string' || nombreFoto.trim() === '') {
        throw new Error('Nombre de la Foto de figurita inválida.');
    };

    if (typeof tipo !== 'string' || tipo.trim() === '' || !('ej'.includes(tipo))) {
        throw new Error('Tipo de figurita inválido.');
    };

    if (typeof idSeleccion !== 'number') {
        throw new Error('ID de selección inválido.');
    };
};

export const middlewareValidacionFigurita = (req, res, next) => {
    try {
        validarFigurita(req.body);
        next();
    } catch (error) {
        res.status(400).json({ error: error });
    };
};
