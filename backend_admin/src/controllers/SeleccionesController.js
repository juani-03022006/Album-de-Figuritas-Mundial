function generarSeleccionesController(SeleccionesService) {
    if (!SeleccionesService || typeof SeleccionesService.obtenerSelecciones !== 'function') {
        throw new Error('El Servicio de Selecciones es inválido!');
    };

    return {
        getSelecciones: async (req, res) => {},

        createSeleccion: async (req, res) => {},
    }
}