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

    async crearSeleccion(datosSeleccionNueva) {
        const nuevaSeleccion = await this.SeleccionesRepository.createSeleccion(datosSeleccionNueva);
        return nuevaSeleccion;
    };

    async modificarSeleccion(idSeleccion, datosSeleccion) {
        const seleccionModifcada = await this.SeleccionesRepository.modifySeleccion(idSeleccion, datosSeleccion);
        return seleccionModifcada;
    };
};

export default SeleccionesService;
