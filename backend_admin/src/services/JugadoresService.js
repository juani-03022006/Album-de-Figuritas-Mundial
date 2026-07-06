class JugadoresService {
    constructor(FiguritasAPI) {
        if (!FiguritasAPI || typeof FiguritasAPI.getJugadores !== 'function') {
            throw new Error('El Repositorio de Figuritas es obligatorio!');
        };

        this.FiguritasAPI = FiguritasAPI;
    };

    async obtenerJugadores() {
        try {
            const result = await this.FiguritasAPI.getJugadores();
            return result;
        } catch (error) {
            throw error;
        };
    };

    async obtenerJugadoresPorSeleccion(idSeleccion) {
        try {
            const result = await this.FiguritasAPI.getJugadoresPorSeleccion(idSeleccion);
            return result;
        } catch (error) {
            throw error;
        };
    };

    async crearJugador(datosJugador) {
        try {
            const result = await this.FiguritasAPI.createJugador(datosJugador);
            return result;
        } catch (error) {
            throw error;
        };
    };

    async modificarJugador(idJugadorModificado, datosNuevosJugador) {
        try {
            const jugadorModificado = await this.FiguritasAPI.modifyJugador(idJugadorModificado, datosNuevosJugador);
            return jugadorModificado;
        } catch (error) {
            throw error;
        };
    };

    async eliminarJugador(idFigurita) {
        try {
            const result = await this.FiguritasAPI.deleteFigurita(idFigurita);
            return result;
        } catch (error) {
            throw error;
        };
    };
};

export default JugadoresService;
