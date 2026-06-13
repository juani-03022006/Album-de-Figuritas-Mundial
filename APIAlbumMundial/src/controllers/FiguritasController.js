function createFiguritasController(FiguritasService) {
    if (!FiguritasService || typeof FiguritasService.obtenerFiguritas !== 'function') {
        throw new Error('El Servicio de Figuritas es inválido!');
    };

    return {
        getJugadores: (req, res) => {
            try {
                const figuritas = await FiguritasService.obtenerJugadores();
                res.status(200).json(figuritas);
            } catch (error) {
                console.error(error);
            };
        },

        getEspeciales: (req, res) => {
            try {
                const figuritas = await FiguritasService.obtenerEspeciales();
                res.status(200).json(figuritas);
            } catch (error) {
                console.error(error);
            };
        },

        modifyJugador: (req, res) => {
            try {
                const idJugador = req.params.id;
                const jugadorModificado = req.body;

                const result = await FiguritasService.modificarJugador(idJugador, jugadorModificado);
                res.status(200).json(result);
            } catch (error) {
                console.error(error);
            };
        },

        modifyEspecial: (req, res) => {
            try {
                const idEspecial = req.params.id;
                const especialModificada = req.body;

                const result = await FiguritasService.modificarEspecial(idEspecial, especialModificada);
                res.status(200).json(result);
            } catch (error) {
                console.error(error);
            };
        },

        createFigurita: (req, res) => {
            try {
                const figuritaNueva = req.body;

                const result = await FiguritasService.crearFigurita(figuritaNueva);
                res.status(200).json(result);
            } catch (error) {
                console.error(error); 
            };
        }
    };
};

export default createFiguritasController;
