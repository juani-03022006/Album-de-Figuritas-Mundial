function generarSeleccionesController(SeleccionesService) {
    if (!SeleccionesService || typeof SeleccionesService.obtenerSelecciones !== 'function') {
        throw new Error('El Servicio de Selecciones es inválido!');
    };

    return {
        getSelecciones: async (req, res) => {
            try {
                const selecciones = SeleccionesService.obtenerSelecciones();
                
                console.log('Obteniendo las Selecciones...');
                res.status(200).json(await selecciones);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        createSeleccion: async (req, res) => {
            try {
                const datosSeleccion = req.body;
                const result = SeleccionesService.crearSeleccion(datosSeleccion);
                
                console.log('Añadiendo seleccion...');
                res.status(200).json(await result);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        modifySeleccion: async (req, res) => {
            try {
                const idSeleccion = req.params.id
                const nuevosDatosSeleccion = req.body;

                const result = SeleccionesService.modificarSeleccion(idSeleccion, nuevosDatosSeleccion);
                
                console.log('Modificando seleccion...');
                res.status(200).json(await result);
            } catch (error) {
                res.status(500).json(error);
            };
        }
    };
};

export default generarSeleccionesController;
