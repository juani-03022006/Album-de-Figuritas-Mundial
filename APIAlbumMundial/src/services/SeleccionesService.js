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
            console.error(error);
        };
    };

    async crearSeleccion(datosSeleccion) {
        try {
            datosSeleccion.pathBanderaPais = `uploads/selecciones/${datosSeleccion.banderaPais}`;
            delete datosSeleccion.banderaPais;

            const seleccionNueva = await this.SeleccionesRepository.createSeleccion(datosSeleccionNueva);
            return seleccionNueva;
        } catch (error) {
            console.error(error);
        };
    };

    async modificarSeleccion(idSeleccionModificada, datosSeleccionModificada) {
        const seleccion = await this.SeleccionesRepository.modifySeleccion(idSeleccionModificada, datosSeleccionModificada);
        return seleccion;
    };
};

export default SeleccionesService;
