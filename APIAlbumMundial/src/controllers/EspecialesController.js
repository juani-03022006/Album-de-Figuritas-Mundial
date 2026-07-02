function createEspecialesController(EspecialesService) {
    if (!EspecialesService || typeof EspecialesService.obtenerEspeciales !== 'function') {
        throw new Error('El Servicio de Figuritas es inválido!');
    };

    return {
        getEspeciales: async (req, res) => {
            try {
                const especiales = await EspecialesService.obtenerEspeciales();
                res.status(200).json(especiales);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        getEspecialesPorSeleccion: async (req, res) => {
            try {
                const idSeleccion = req.params.id;
                const figuritas = await EspecialesService.obtenerEspecialesPorSeleccion(idSeleccion);
                res.status(200).json(figuritas);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        createEspecial: async (req, res) => {
            try {
                const nuevaEspecial = req.body;

                const result = await EspecialesService.crearEspecial(nuevaEspecial);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        modifyEspecial: async (req, res) => {
            try {
                const idEspecial = req.params.id;
                const especialModificada = req.body;

                const result = await EspecialesService.modificarEspecial(idEspecial, especialModificada);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json(error);
            };
        }
    };
};

export default createEspecialesController;
