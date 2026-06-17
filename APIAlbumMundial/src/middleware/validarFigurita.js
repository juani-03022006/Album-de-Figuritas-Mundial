function validarFigurita({ nroFigurita, pathToPic, tipo, idSeleccion }) {
    if (typeof nroFigurita !== 'number') {
        return res.status(400).json({
            error: 'Número de figurita inválido.'
        });
    };

    if (typeof pathToPic !== 'string' || pathToPic.trim() === '') {
        return res.status(400).json({
            error: 'Foto de figurita inválida.'
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

export const middlewareValidacionFiguritas = (req, res, next) => {
    const arrayFiguritas = req.body;

    arrayFiguritas.forEach(figurita => {
        validarFigurita(figurita);
    });

    next();
}
