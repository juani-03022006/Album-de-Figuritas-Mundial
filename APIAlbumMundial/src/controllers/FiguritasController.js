function createFiguritasController(FiguritasService) {
    if (!FiguritasService || typeof FiguritasService.obtenerJugadores !== 'function') {
        throw new Error('El Servicio de Figuritas es inválido!');
    };

    return {
        // Para figuritas
        deleteFigurita: async (req, res) => {
            try {
                const idFigurita = req.params.id;

                const result = await FiguritasService.eliminarFigurita(idFigurita);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        // Para jugadores
        getJugadores: async (req, res) => {
            try {
                const figuritas = await FiguritasService.obtenerJugadores();
                res.status(200).json(figuritas);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        getJugadoresPorSeleccion: async (req, res) => {
            try {
                const idSeleccion = req.params.id
                const figuritas = await FiguritasService.obtenerJugadoresPorSeleccion(idSeleccion);
                res.status(200).json(figuritas);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        createJugador: async (req, res) => {
            try {
                const nuevoJugador = req.body;
                nuevoJugador.jugador = JSON.parse(nuevoJugador.jugador);
                nuevoJugador.nombreFoto = req.file.originalname;

                const result = await FiguritasService.crearJugador(nuevoJugador);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json(error);
            }
        },

        createJugadores: async (req, res) => {
            try {
                const jugadores = JSON.parse(req.body.jugadores);
                const archivoZipFotos = req.file.path;

                const result = await FiguritasService.crearJugadores(jugadores, archivoZipFotos);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        modifyJugador: async (req, res) => {
            try {
                const idJugador = req.params.id;
                const jugadorModificado = req.body;

                const result = await FiguritasService.modificarJugador(idJugador, jugadorModificado);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        // Para especiales
        getEspeciales: async (req, res) => {
            try {
                const figuritas = await FiguritasService.obtenerEspeciales();
                res.status(200).json(figuritas);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        createEspecial: async (req, res) => {
            try {
                const nuevaEspecial = req.body;
                nuevaEspecial.especial = JSON.parse(nuevaEspecial.especial);
                nuevaEspecial.nombreFoto = req.file.originalname;

                const result = await FiguritasService.crearEspecial(nuevaEspecial);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        createEspeciales: async (req, res) => {
            try {
                const especiales = JSON.parse(req.body.especiales);
                const archivoZipFotos = req.file.path;

                const result = await FiguritasService.crearEspeciales(especiales, archivoZipFotos);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        modifyEspecial: async (req, res) => {
            try {
                const idEspecial = req.params.id;
                const especialModificada = req.body;

                const result = await FiguritasService.modificarEspecial(idEspecial, especialModificada);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json(error);
            };
        }
    };
};

export default createFiguritasController;
