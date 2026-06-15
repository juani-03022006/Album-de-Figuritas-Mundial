export function validarJugador({ nombre, apellido, estatura, peso, fechaNacimiento, idPosicion }, res) {
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

    if (typeof peso !== 'number' || peso <= 0) {
        return res.status(400).json({
            error: 'Peso de Jugador inválido.'
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
