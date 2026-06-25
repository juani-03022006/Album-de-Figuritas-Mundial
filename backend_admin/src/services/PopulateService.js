import { POSICIONES } from '../constants/posicionesJugadores.js';
import { FIGUS_POR_SELECCION, NRO_EMPIEZA_GRUPO } from '../constants/albumConfig.js';
import { TEAM_VISUALS } from '../constants/teamVisuals.js';
import { WORLD_CUP_2026_SQUADS } from '../constants/worldCup2026Squads.js';
import { calcularDesdeHasta } from '../utils/calcularDesdeHasta.js';
import { obtenerUrlEscudo, obtenerUrlFormacion, obtenerUrlTecnico } from '../utils/buscarUrlFiguritas.js';
import { generarEscudo, generarFormacion, generarJugador, generarTecnico } from '../utils/generarDatosFiguritas.js';
import { ordenarPlantelPorPosiciones } from '../utils/ordenarPlantelPorPosiciones.js';


class PopulateService {
    constructor(PosicionesService, SeleccionesService, JugadoresService, EspecialesService) {
        if (!PosicionesService || typeof PosicionesService.crearPosicion !== 'function') {
            throw new Error('El Servicio de Posiciones no es válido.');
        };

        if (!SeleccionesService || typeof SeleccionesService.crearSeleccion !== 'function') {
            throw new Error('El Servicio de Selecciones no es válido.');
        };

        if (!JugadoresService || typeof JugadoresService.crearJugador !== 'function') {
            throw new Error('El Servicio de Jugadores no es válido.');
        };

        if (!EspecialesService || typeof EspecialesService.crearEspecial !== 'function') {
            throw new Error('El Servicio de Especiales no es válido.');
        }

        this.PosicionesService = PosicionesService;
        this.SeleccionesService = SeleccionesService;
        this.JugadoresService = JugadoresService;
        this.EspecialesService = EspecialesService;
    };

    async #populatePosiciones() {
        try {
            console.log('Populando Posiciones...');

            for (const posicion of POSICIONES) {
                await this.PosicionesService.crearPosicion({ descripcion: posicion });
            };

            console.log('Posiciones Populadas!');
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        };
    };

    async #populateSelecciones() {
        try {
            console.log('Populando Selecciones...');

            const equiposGrupos = { "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "I": 0, "J": 0, "K": 0, "L": 0 };

            for (const [nombrePais, datosSeleccion] of Object.entries(TEAM_VISUALS)) {
                console.log(`Generando a ${nombrePais}...`);

                const equiposEnGrupo = equiposGrupos[datosSeleccion.grupo];
                const { nroDesde, nroHasta } = await calcularDesdeHasta(
                    equiposEnGrupo,
                    NRO_EMPIEZA_GRUPO[datosSeleccion.grupo],
                    FIGUS_POR_SELECCION
                );
                datosSeleccion.nroDesde = nroDesde;
                datosSeleccion.nroHasta = nroHasta;

                await this.SeleccionesService.crearSeleccion(datosSeleccion);

                equiposGrupos[datosSeleccion.grupo] += 1;
            };

            console.log('Selecciones Populadas!');
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async #populateEspeciales() {
        try {
            for (const [indiceSeleccion, seleccion] of WORLD_CUP_2026_SQUADS.entries()) {
                console.log(`Populando especiales de ${seleccion.nombre}`);
                const datosSeleccion = await this.SeleccionesService.obtenerSeleccionPorNombrePais(seleccion.nombre);

                const datosEscudo = await generarEscudo(datosSeleccion);
                await this.EspecialesService.crearEspecial(datosEscudo);

                const datosFormacion = await generarFormacion(datosSeleccion);
                await this.EspecialesService.crearEspecial(datosFormacion);

                const datosTecnico = await generarTecnico(datosSeleccion, seleccion.directorTecnico.nombreCompleto);
                await this.EspecialesService.crearEspecial(datosTecnico);
            };
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        };
    };

    async #populateJugadores() {
        try {
            for (const [indiceSeleccion, seleccion] of WORLD_CUP_2026_SQUADS.entries()) {
                console.log(`Populando jugadores de ${seleccion.nombre}`);
                const datosSeleccion = await this.SeleccionesService.obtenerSeleccionPorNombrePais(seleccion.nombre);
                const posiciones = await this.PosicionesService.obtenerPosiciones();

                const plantelOrdenado = ordenarPlantelPorPosiciones(seleccion.plantel);
                
                for (const [indiceJugador, jugador] of plantelOrdenado.entries()) {
                    const posicion = posiciones.find(
                        posicion => posicion.descripcion === jugador.posicionFifa
                    );
                    const idPosicion = posicion.idPosicion;
                    
                    const datosJugador = await generarJugador(datosSeleccion, jugador, idPosicion, indiceJugador);
                    await this.JugadoresService.crearJugador(datosJugador);
                };
            };
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async populateDB() {
        try {
            // Primero Posiciones
            // await this.#populatePosiciones();

            // Despues Selecciones
            // await this.#populateSelecciones();

            // Luego Especiales
            await this.#populateEspeciales();

            // Por ultimo jugadores
            await this.#populateJugadores();
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        };
    };
};

export default PopulateService;
