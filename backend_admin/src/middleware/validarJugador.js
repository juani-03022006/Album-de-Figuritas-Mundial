function validarJugador({ nombre, apellido, estatura, fechaNacimiento, idPosicion }) {
    if (typeof nombre !== 'string' || nombre.trim() === '') {
        throw new Error('Nombre de Jugador inválido.');
    };

    if (typeof apellido !== 'string' || apellido.trim() === '') {
        throw new Error('Apellido de Jugador inválido.');
    };

    if (typeof estatura !== 'number' || estatura <= 0) {
        throw new Error('Estatura de Jugador inválida.');
    };

    if (typeof fechaNacimiento !== 'string' || nombre.trim() === '') {
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
        res.status(400).json({ error: error });
    };
};
