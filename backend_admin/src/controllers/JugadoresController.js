function generarJugadoresController(JugadoresService) {
    if (!JugadoresService || typeof JugadoresService.obtenerJugadores !== 'function') {
        throw new Error('El Servicio de Jugadores es inválido!');
    };

    return {
        getJugadores: async (req, res) => {
            try {
                const jugadores = JugadoresService.obtenerJugadores();
                console.log('Obteniendo los Jugadores...');

                res.status(200).json(await jugadores);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        getJugadoresPorSeleccion: async (req, res) => {
            try {
                const idSeleccion = req.params.id;

                const jugadoresDeSeleccion = JugadoresService.obtenerJugadoresPorSeleccion(idSeleccion);
                console.log('Obteniendo los Jugadores...');

                res.status(200).json(await jugadoresDeSeleccion);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        createJugador: async (req, res) => {
            try {
                const datosJugador = req.body;
                const jugador = JugadoresService.crearJugador(datosJugador);

                console.log('Añadiendo Jugador...');
                res.status(200).json(await jugador);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        modifyJugador: async (req, res) => {
            try {
                const idJugador = req.params.id;
                const jugadorModificado = req.body;
                const result = JugadoresService.modificarJugador(idJugador, jugadorModificado);
                
                console.log('Modificando Jugador...');
                res.status(200).json(await result);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        deleteJugador: async (req, res) => {
            try {
                const idFigurita = req.params.id;
                const result = JugadoresService.eliminarJugador(idFigurita);
                
                console.log('Eliminando Jugador...');
                res.status(200).json(await result);
            } catch (error) {
                res.status(500).json(error);
            };
        }
    };
};

export default generarJugadoresController;
