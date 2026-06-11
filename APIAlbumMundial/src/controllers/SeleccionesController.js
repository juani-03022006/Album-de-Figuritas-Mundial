function createSeleccionesController({ SeleccionesService }) {
    if (!SeleccionesService || typeof SeleccionesService.obtenerSelecciones !== 'function') {
        throw new Error('El Servicio de Selecciones es invalido!');
    };

    return {
        getSelectiones: async (req, res) => {
            try {
                const selecciones = await SeleccionesService.obtenerSelecciones();
                return res.status(200).json(selecciones);
            } catch (error) {
                console.log(error);
            };
        },

        modifySeleccion: async (req, res) => {
            try {
                const seleccionModificada = req.body;

                if (!seleccionModificada) {
                    throw new Error('Los datos de la selección son obligatorios.');
                };

                const result = await SeleccionesService.moificarSeleccion(seleccionModificada);
                res.status(200).json(result);
            } catch (error) {
                console.error(error);
            };
        },

        createSeleccion: async (req, res) => {
            try {
                const nuevaSeleccion = req.body;

                if (!nuevaSeleccion) {
                    throw new Error('Los datos de la selección son obligatorios.');
                };

                const result = await SeleccionesService.crearSeleccion(nuevaSeleccion);
            } catch (error) {
                console.error(error);
            };
        }
    };
};

export default createSeleccionesController;
