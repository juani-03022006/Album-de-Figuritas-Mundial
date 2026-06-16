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

        createSeleccion: async (req, res) => {},

        modifySeleccion: async (req, res) => {}
    };
};

export default generarSeleccionesController;
