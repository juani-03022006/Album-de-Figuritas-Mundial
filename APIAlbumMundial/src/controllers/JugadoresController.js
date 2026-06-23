function createJugadoresController(JugadoresService) {
    if (!JugadoresService || typeof JugadoresService.obtenerJugadores !== 'function') {
        throw new Error('El Servicio de Jugadores es inválido!');
    };

    return {
        getJugadores: async (req, res) => {
            try {
                const jugadores = await JugadoresService.obtenerJugadores();
                res.status(200).json(jugadores);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        getJugadoresPorSeleccion: async (req, res) => {
            try {
                const idSeleccion = req.params.id
                const jugadores = await JugadoresService.obtenerJugadoresPorSeleccion(idSeleccion);
                res.status(200).json(jugadores);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        createJugador: async (req, res) => {
            try {
                const nuevoJugador = req.body;

                const result = await JugadoresService.crearJugador(nuevoJugador);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json(error);
            }
        },

        modifyJugador: async (req, res) => {
            try {
                const idJugador = req.params.id;
                const jugadorModificado = req.body;

                const result = await JugadoresService.modificarJugador(idJugador, jugadorModificado);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json(error);
            };
        }
    };
};

export default createJugadoresController;
