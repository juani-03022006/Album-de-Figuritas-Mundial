function createPosicionesController(PosicionesService) {
    if (!PosicionesService || typeof PosicionesService.obtenerPosiciones !== 'function') {
        throw new Error('El Servicio de Posiciones es inválido!');
    };

    return {
        getPosiciones: async (req, res) => {
            try {
                const posiciones = await PosicionesService.obtenerPosiciones();
                res.status(200).json(posiciones);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        createPosicion: async (req, res) => {
            try {
                const nuevaPosicion = req.body;

                const result = await PosicionesService.crearPosicion(nuevaPosicion);
                res.status(200).json(result);
            } catch (error) {
                console.log(error)
                res.status(500).json(error);
            };
        },

        modifyPosicion: async (req, res) => {
            try {
                const idNuevaPosicion = req.params.id;
                const posicionModificada = req.body;

                const result = await PosicionesService.modificarPosicion(idNuevaPosicion, posicionModificada);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        deletePosicion: async (req, res) => {
            try {
                const idPosicion = req.params.id;

                const result = await PosicionesService.eliminarPosicion(idPosicion);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json(error);
            };
        }
    };
};

export default createPosicionesController;
