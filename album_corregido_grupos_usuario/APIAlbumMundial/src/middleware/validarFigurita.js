const TIPOS_VALIDOS = new Set([
    'jugador',
    'escudo',
    'foto_seleccion',
    'foto_equipo',
    'tecnico',
    'especial',
    'j',
    'e',
]);

function validarFigurita({ nroFigurita, pathTopic, pathToPic, tipo, idSeleccion }) {
    if (typeof nroFigurita !== 'number') {
        throw new Error('Número de figurita inválido.');
    };

    const path = pathTopic ?? pathToPic;
    if (typeof path !== 'string' || path.trim() === '') {
        throw new Error('URL de imagen de figurita inválida.');
    };

    if (typeof tipo !== 'string' || tipo.trim() === '' || !TIPOS_VALIDOS.has(tipo.trim().toLowerCase())) {
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
        res.status(400).json({ error: error.message });
    };
};
