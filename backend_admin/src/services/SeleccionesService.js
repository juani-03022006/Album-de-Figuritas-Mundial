import { FIGUS_POR_SELECCION, NRO_EMPIEZA_GRUPO } from '../constants/albumConfig.js';
import { buscarUrlBandera } from '../utils/buscarUrlBandera.js';
import { calcularDesdeHasta } from '../utils/calcularDesdeHasta.js';

class SeleccionesService {
    constructor(SeleccionesAPI) {
        if (!SeleccionesAPI || typeof SeleccionesAPI.createSeleccion !== 'function') {
            throw new Error('El Repositorio de selecciones es obligatorio!');
        };

        this.SeleccionesAPI = SeleccionesAPI;
    };

    async #seleccionesPorGrupo(grupo) {
        try {
            const selecciones = await this.obtenerSelecciones();
            const seleccionesGrupo = selecciones.filter(seleccion => seleccion.grupo === grupo);

            return seleccionesGrupo;
        } catch (error) {
            throw new Error(error.message);
        };
    }

    async obtenerSelecciones() {
        try {
            const selecciones = await this.SeleccionesAPI.getSelecciones();
            return selecciones;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async obtenerSeleccionPorNombrePais(nombrePais) {
        try {
            const seleccion = await this.SeleccionesAPI.getSeleccionPorNombrePais(nombrePais);
            return seleccion;
        } catch (error) {
            throw new Error(error.message);
        };
    }

    async crearSeleccion(datosSeleccion) {
        try {
            const equiposEnGrupo = (await this.#seleccionesPorGrupo(datosSeleccion.grupo)).length;

            const urlBandera = buscarUrlBandera(`Flag of ${datosSeleccion.nombrePais}.svg`);
            datosSeleccion.urlBandera = urlBandera;

            const { nroDesde, nroHasta } = await calcularDesdeHasta(equiposEnGrupo, NRO_EMPIEZA_GRUPO[datosSeleccion.grupo], FIGUS_POR_SELECCION);
            datosSeleccion.nroDesde = nroDesde;
            datosSeleccion.nroHasta = nroHasta;

            const nuevaSeleccion = await this.SeleccionesAPI.createSeleccion(datosSeleccion);
            return nuevaSeleccion;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async modificarSeleccion(idSeleccion, datosSeleccion) {
        try {
            const seleccionModifcada = await this.SeleccionesAPI.modifySeleccion(idSeleccion, datosSeleccion);
            return seleccionModifcada;
        } catch (error) {
            throw new Error(error.message);
        };
    };
};

export default SeleccionesService;
