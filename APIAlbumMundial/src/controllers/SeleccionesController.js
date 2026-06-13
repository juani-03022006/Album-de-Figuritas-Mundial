function createSeleccionesController(SeleccionesService) {
    if (!SeleccionesService || typeof SeleccionesService.obtenerSelecciones !== 'function') {
        throw new Error('El Servicio de Selecciones es inválido!');
    };

    return {
        getSelectiones: async (req, res) => {
            try {
                const selecciones = await SeleccionesService.obtenerSelecciones();
                res.status(200).json(selecciones);
            } catch (error) {
                console.log(error);
            };
        },
        
        createSeleccion: async (req, res) => {
            try {
                const nuevaSeleccion = req.body;

                const result = await SeleccionesService.crearSeleccion(nuevaSeleccion);
                res.status(200).json(result);
            } catch (error) {
                console.error(error);
            };
        },

        modifySeleccion: async (req, res) => {
            try {
                const idSeleccionModificada = req.params.id;
                const seleccionModificada = req.body;

                const result = await SeleccionesService.modificarSeleccion(idSeleccionModificada, seleccionModificada);
                res.status(200).json(result);
            } catch (error) {
                console.error(error);
            };
        }
    };
};

export default createSeleccionesController;
