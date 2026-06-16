class SeleccionesService {
    constructor(SeleccionesRepository) {
        if (!SeleccionesRepository || typeof SeleccionesRepository.createSeleccion !== 'function') {
            throw new Error('El Repositorio de selecciones es obligatorio!');
        };

        this.SeleccionesRepository = SeleccionesRepository;
    };

    async obtenerSelecciones() {
        const selecciones = await this.SeleccionesRepository.getSelecciones();
        return selecciones;
    };

    async crearSeleccion(datosSeleccionNueva) { };

    async modificarSeleccion(idSeleccionModificada, datosSeleccionModificada) { };
};

export default SeleccionesService;
