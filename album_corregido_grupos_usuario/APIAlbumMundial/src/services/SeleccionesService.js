class SeleccionesService {
    constructor(SeleccionesRepository) {
        if (!SeleccionesRepository || typeof SeleccionesRepository.createSeleccion !== 'function') {
            throw new Error('El Repositorio de selecciones es obligatorio!');
        };

        this.SeleccionesRepository = SeleccionesRepository;
    };

    async obtenerSelecciones() {
        try {
            const selecciones = await this.SeleccionesRepository.getSelecciones();
            return selecciones;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async obtenerSeleccionPorNombrePais(nombrePais) {
        try {
            const seleccion = await this.SeleccionesRepository.getSeleccionPorNombrePais(nombrePais);
            return seleccion;
        } catch (error) {
            throw new Error(error.message);
        };
    }

    async crearSeleccion(datosSeleccion) {
        try {
            const seleccionNueva = await this.SeleccionesRepository.createSeleccion(datosSeleccion);
            return seleccionNueva;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async modificarSeleccion(idSeleccionModificada, datosSeleccionModificada) {
        try {
            const seleccion = await this.SeleccionesRepository.modifySeleccion(idSeleccionModificada, datosSeleccionModificada);
            return seleccion;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async eliminarSelecciones() {
        try {
            const result = await this.SeleccionesRepository.deleteSelecciones();
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };
};

export default SeleccionesService;
