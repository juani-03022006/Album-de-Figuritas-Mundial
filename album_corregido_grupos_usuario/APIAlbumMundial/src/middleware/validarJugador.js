function validarJugador({ nombre, apellido, estatura, peso, club, fechaNacimiento, idPosicion }) {
    if (typeof nombre !== 'string' || nombre.trim() === '') {
        throw new Error('Nombre de Jugador inválido.');
    };

    if (typeof apellido !== 'string' || apellido.trim() === '') {
        throw new Error('Apellido de Jugador inválido.');
    };

    if (typeof estatura !== 'number' || estatura <= 0) {
        throw new Error('Estatura de Jugador inválida.');
    };

    if (peso !== null && peso !== undefined && (typeof peso !== 'number' || peso <= 0)) {
        throw new Error('Peso de Jugador inválido.');
    };

    if (club !== null && club !== undefined && typeof club !== 'string') {
        throw new Error('Club de Jugador inválido.');
    };

    if (typeof fechaNacimiento !== 'string' || fechaNacimiento.trim() === '') {
        throw new Error('Fecha de Nacimiento de Jugador inválida.');
    };

    if (typeof idPosicion !== 'number') {
        throw new Error('ID de Posicion de Jugador inválido.');
    };
};

export const middlewareValidacionJugador = (req, res, next) => {
    try {
        validarJugador(req.body.jugador);
        next();
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};
