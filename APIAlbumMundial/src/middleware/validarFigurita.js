function validarFigurita({ nroFigurita, urlFoto, tipo, idSeleccion }) {
    if (typeof nroFigurita !== 'number') {
        return res.status(400).json({
            error: 'Número de figurita inválido.'
        });
    };

    if (typeof urlFoto !== 'string' || urlFoto.trim() === '') {
        return res.status(400).json({
            error: 'URL de Foto de figurita inválida.'
        });
    };

    if (typeof tipo !== 'string' || tipo.trim() === '' || !('ej'.includes(tipo))) {
        return res.status(400).json({
            error: 'Tipo de figurita inválido.'
        });
    };

    if (typeof idSeleccion !== 'number') {
        return res.status(400).json({
            error: 'ID de selección inválido.'
        });
    };
};

export const middlewareValidacionFigurita = (req, res, next) => {
    validarFigurita(req.body);
    next();
};
