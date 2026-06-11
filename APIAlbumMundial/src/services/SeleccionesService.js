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

    async modificarSeleccion(seleccionModificada) {
        const seleccion = await this.SeleccionesRepository.modifySeleccion(seleccionModificada);
        return seleccion;
    };

    async crearSeleccion(datosSeleccionNueva) {
        const seleccionNueva = await this.SeleccionesRepository.createSeleccion(datosSeleccionNueva);
        return seleccionNueva;
    };
};

export default SeleccionesService;
