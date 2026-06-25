import { POSICIONES } from '../constants/posicionesJugadores.js';
import { FIGUS_POR_SELECCION, NRO_EMPIEZA_GRUPO } from '../constants/albumConfig.js';
import { TEAM_VISUALS } from '../constants/teamVisuals.js';
import { WORLD_CUP_2026_SQUADS } from '../constants/worldCup2026Squads.js';
import { calcularDesdeHasta } from '../utils/calcularDesdeHasta.js';
import { generarEscudo, generarFormacion, generarJugador, generarTecnico } from '../utils/generarDatosFiguritas.js';

function ordenarPorGrupoYPais(entries) {
    return [...entries].sort(([, a], [, b]) => {
        const grupoCompare = String(a.grupo).localeCompare(String(b.grupo), 'es');
        if (grupoCompare !== 0) return grupoCompare;
        return String(a.nombrePais).localeCompare(String(b.nombrePais), 'es');
    });
};

function ordenarPlantelPorNumero(plantel) {
    return [...plantel].sort((a, b) => Number(a.numeroCamiseta) - Number(b.numeroCamiseta));
};

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

            const equiposGrupos = {};
            const seleccionesOrdenadas = ordenarPorGrupoYPais(Object.entries(TEAM_VISUALS));

            for (const [codigo, datosSeleccionBase] of seleccionesOrdenadas) {
                const datosSeleccion = { ...datosSeleccionBase, codigo };
                console.log(`Generando a ${datosSeleccion.nombrePais} - Grupo ${datosSeleccion.grupo}...`);

                const equiposEnGrupo = equiposGrupos[datosSeleccion.grupo] ?? 0;
                const { nroDesde, nroHasta } = await calcularDesdeHasta(
                    equiposEnGrupo,
                    NRO_EMPIEZA_GRUPO[datosSeleccion.grupo],
                    FIGUS_POR_SELECCION
                );

                await this.SeleccionesService.crearSeleccion({
                    ...datosSeleccion,
                    nroDesde,
                    nroHasta,
                });

                equiposGrupos[datosSeleccion.grupo] = equiposEnGrupo + 1;
            };

            console.log('Selecciones Populadas!');
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async #populateFiguritas() {
        try {
            const posiciones = await this.PosicionesService.obtenerPosiciones();
            const seleccionesOrdenadas = ordenarPorGrupoYPais(Object.entries(TEAM_VISUALS));

            for (const [, datosVisuales] of seleccionesOrdenadas) {
                const seleccion = WORLD_CUP_2026_SQUADS.find(
                    item => item.nombre === datosVisuales.nombrePais
                );

                if (!seleccion) {
                    throw new Error(`No se encontró plantel para ${datosVisuales.nombrePais}`);
                }

                console.log(`Populando figuritas de ${seleccion.nombre} - Grupo ${datosVisuales.grupo}`);
                const datosSeleccion = await this.SeleccionesService.obtenerSeleccionPorNombrePais(seleccion.nombre);

                await this.EspecialesService.crearEspecial(await generarEscudo(datosSeleccion));
                await this.EspecialesService.crearEspecial(await generarFormacion(datosSeleccion));
                await this.EspecialesService.crearEspecial(
                    await generarTecnico(datosSeleccion, seleccion.directorTecnico.nombreCompleto)
                );

                const plantelOrdenado = ordenarPlantelPorNumero(seleccion.plantel);

                for (const [indiceJugador, jugador] of plantelOrdenado.entries()) {
                    const posicion = posiciones.find(
                        posicion => posicion.descripcion === jugador.posicionFifa
                    );

                    if (!posicion) {
                        throw new Error(`No se encontró posición ${jugador.posicionFifa} para ${jugador.nombreCompletoFifa}`);
                    }

                    const datosJugador = await generarJugador(
                        datosSeleccion,
                        jugador,
                        posicion.idPosicion,
                        indiceJugador
                    );

                    await this.JugadoresService.crearJugador(datosJugador);
                };
            };
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        };
    };

    async populateDB() {
        try {
            await this.#populatePosiciones();
            await this.#populateSelecciones();
            await this.#populateFiguritas();
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        };
    };
};

export default PopulateService;
