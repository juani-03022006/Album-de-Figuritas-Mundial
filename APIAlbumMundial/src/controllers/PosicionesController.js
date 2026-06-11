function createPosicionesController(PosicionesService) {
    if (!PosicionesService || typeof PosicionesService.obtenerPosiciones !== 'function') {
        throw new Error('El Servicio de Posiciones es inválido!');
    };

    return {
        getPosiciones: async (req, res) => {
            try {
                const posiciones = await PosicionesService.obtenerPosiciones();
                return res.status(200).json(posiciones);
            } catch (error) {
                console.error(error);
            };
        },

        modifyPosicion: async (req, res) => {
            try {
                const posicionModificada = req.body;

                const result = await PosicionesService.modificarPosicion(posicionModificada);
                return res.status(200).json(result);
            } catch (error) {
                console.error(error);
            };
        },

        createPosicion: async (req, res) => {
            try {
                const idNuevaPosicion = req.params.id;
                const nuevaPosicion = req.body;

                const result = await PosicionesService.crearPosicion(idNuevaPosicion, nuevaPosicion);
                return res.status(200).json(result);
            } catch (error) {
                console.error(error);
            };
        }
    };
};

export default createPosicionesController;
