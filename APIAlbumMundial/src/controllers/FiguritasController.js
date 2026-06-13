function createFiguritasController(FiguritasService) {
    if (!FiguritasService || typeof FiguritasService.obtenerJugadores !== 'function') {
        throw new Error('El Servicio de Figuritas es inválido!');
    };

    return {
        getJugadores: async (req, res) => {
            try {
                const figuritas = await FiguritasService.obtenerJugadores();
                res.status(200).json(figuritas);
            } catch (error) {
                console.error(error);
            };
        },

        createJugador: async (req, res) => {
            try {
                const nuevoJugador = req.body;

                const result = await FiguritasService.crearJugador(nuevoJugador);
                res.status(200).json(result);
            } catch (error) {
                console.error(error); 
            };
        },

        modifyJugador: async (req, res) => {
            try {
                const idJugador = req.params.id;
                const jugadorModificado = req.body.jugador;

                const result = await FiguritasService.modificarJugador(idJugador, jugadorModificado);
                res.status(200).json(result);
            } catch (error) {
                console.error(error);
            };
        },
        
        getEspeciales: async (req, res) => {
            try {
                const figuritas = await FiguritasService.obtenerEspeciales();
                res.status(200).json(figuritas);
            } catch (error) {
                console.error(error);
            };
        },

        createEspecial: async (req, res) => {
            try {
                const nuevaEspecial = req.body;

                const result = await FiguritasService.crearEspecial(nuevaEspecial);
                res.status(200).json(result);
            } catch (error) {
                console.error(error);
            };
        },

        modifyEspecial: async (req, res) => {
            try {
                const idEspecial = req.params.id;
                const especialModificada = req.body;

                const result = await FiguritasService.modificarEspecial(idEspecial, especialModificada);
                res.status(200).json(result);
            } catch (error) {
                console.error(error);
            };
        }
    };
};

export default createFiguritasController;
