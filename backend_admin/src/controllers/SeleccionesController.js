function generarSeleccionesController(SeleccionesService) {
    if (!SeleccionesService || typeof SeleccionesService.obtenerSelecciones !== 'function') {
        throw new Error('El Servicio de Selecciones es inválido!');
    };

    return {
        getSelecciones: async (req, res) => {
            try {
                const selecciones = await SeleccionesService.obtenerSelecciones();

                console.log('Obteniendo las Selecciones...');
                res.status(200).json(selecciones);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        createSeleccion: async (req, res) => {
            try {
                console.log('Añadiendo seleccion...');
                const datosSeleccion = req.body;
                const fotoSeleccion = req.file;
                const result = await SeleccionesService.crearSeleccion(datosSeleccion, fotoSeleccion);

                res.status(200).json(result);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        modifySeleccion: async (req, res) => {
            try {
                console.log('Modificando seleccion...');
                const idSeleccion = req.params.id
                const nuevosDatosSeleccion = req.body;
                const result = await SeleccionesService.modificarSeleccion(idSeleccion, nuevosDatosSeleccion);

                res.status(200).json(result);
            } catch (error) {
                res.status(500).json(error);
            };
        }
    };
};

export default generarSeleccionesController;
