function generarJugadoresController(JugadoresService) {
    if (!JugadoresService || typeof JugadoresService.obtenerJugadoresPorSeleccion !== 'function') {
        throw new Error('El Servicio de Jugadores es inválido!');
    };

    return {
        getJugadoresPorSeleccion: async (req, res) => {
            try {
                console.log('Obteniendo jugadores...');
                const idSeleccion = req.params.id;
                const jugadoresDeSeleccion = await JugadoresService.obtenerJugadoresPorSeleccion(idSeleccion);

                res.status(200).json(jugadoresDeSeleccion);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        createJugador: async (req, res) => {
            try {
                console.log('Añadiendo jugador...');
                const datosJugador = req.body;
                const fotoJugador = req.file;
                const jugador = await JugadoresService.crearJugador(datosJugador, fotoJugador);

                res.status(200).json(jugador);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        modifyJugador: async (req, res) => {
            try {
                console.log('Modificando jugador...');
                const idJugador = req.params.id;
                const jugadorModificado = req.body;

                const result = await JugadoresService.modificarJugador(idJugador, jugadorModificado);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        deleteJugador: async (req, res) => {
            try {
                console.log('Eliminando jugador...');
                const idFigurita = req.params.id;

                const result = await JugadoresService.eliminarJugador(idFigurita);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json(error);
            };
        }
    };
};

export default generarJugadoresController;
