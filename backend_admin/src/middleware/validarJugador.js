function validarJugador({ nombre, apellido, estatura, fechaNacimiento, idPosicion }) {
    if (typeof nombre !== 'string' || nombre.trim() === '') {
        return res.status(400).json({
            error: 'Nombre de Jugador inválido.'
        });
    };

    if (typeof apellido !== 'string' || apellido.trim() === '') {
        return res.status(400).json({
            error: 'Apellido de Jugador inválido.'
        });
    };

    if (typeof estatura !== 'number' || estatura <= 0) {
        return res.status(400).json({
            error: 'Estatura de Jugador inválida.'
        });
    };

    if (typeof fechaNacimiento !== 'string' || nombre.trim() === '') {
        return res.status(400).json({
            error: 'Fecha de Nacimiento de Jugador inválida.'
        });
    };

    if (typeof idPosicion !== 'number') {
        return res.status(400).json({
            error: 'ID de Posicion de Jugador inválido.'
        });
    };
};

export const middlewareValidacionJugador = (req, res, next) => {
    validarJugador(req.body.jugador);
    next();
};
