import { buscarUrlBandera } from '../utils/buscarUrlBandera.js';

class SeleccionesService {
    constructor(SeleccionesAPI) {
        if (!SeleccionesAPI || typeof SeleccionesAPI.createSeleccion !== 'function') {
            throw new Error('El Repositorio de selecciones es obligatorio!');
        };

        this.SeleccionesAPI = SeleccionesAPI;
    };

    async obtenerSelecciones() {
        try {
            const selecciones = await this.SeleccionesAPI.getSelecciones();
            return selecciones;
        } catch (error) {
            throw new Error(error);
        };
    };

    async crearSeleccion(datosSeleccion) {
        try {
            const urlBandera = buscarUrlBandera(`Flag of ${datosSeleccion.nombrePais}.svg`);
            datosSeleccion.urlBandera = urlBandera;

            const nuevaSeleccion = await this.SeleccionesAPI.createSeleccion(datosSeleccion);
            return nuevaSeleccion;
        } catch (error) {
            throw new Error(error);
        };
    };

    async modificarSeleccion(idSeleccion, datosSeleccion) {
        try {
            const seleccionModifcada = await this.SeleccionesAPI.modifySeleccion(idSeleccion, datosSeleccion);
            return seleccionModifcada;
        } catch (error) {
            throw new Error(error);
        };
    };
};

export default SeleccionesService;
