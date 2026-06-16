class SeleccionesService {
    constructor(SeleccionesAPI) {
        if (!SeleccionesAPI || typeof SeleccionesAPI.createSeleccion !== 'function') {
            throw new Error('El Repositorio de selecciones es obligatorio!');
        };

        this.SeleccionesAPI = SeleccionesAPI;
    };

    async obtenerSelecciones() {
        const selecciones = await this.SeleccionesAPI.getSelecciones();
        return selecciones;
    };

    async crearSeleccion(datosSeleccionNueva) {
        const nuevaSeleccion = await this.SeleccionesAPI.createSeleccion(datosSeleccionNueva);
        return nuevaSeleccion;
    };

    async modificarSeleccion(idSeleccion, datosSeleccion) {
        const seleccionModifcada = await this.SeleccionesAPI.modifySeleccion(idSeleccion, datosSeleccion);
        return seleccionModifcada;
    };
};

export default SeleccionesService;
