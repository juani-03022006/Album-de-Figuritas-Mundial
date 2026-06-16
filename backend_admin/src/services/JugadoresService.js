class JugadoresService {
    constructor(FiguritasAPI) {
        if (!FiguritasAPI || typeof FiguritasAPI.createJugador !== 'function') {
            throw new Error('El Repositorio de Figuritas es obligatorio!');
        };

        this.FiguritasAPI = FiguritasAPI;
    };

    async obtenerJugadoresPorSeleccion(idSeleccion) {
        try {
            const result = await this.FiguritasAPI.getJugadoresPorSeleccion(idSeleccion);
            return result;
        } catch (error) {
            console.error(error);
        };
    };

    async crearJugador(datosJugador, fotoJugador) {
        try {
            const result = await this.FiguritasAPI.createJugador(datosJugador, fotoJugador);
            return result;
        } catch (error) {
            console.error(error);
        };
    };

    async modificarJugador(idJugadorModificado, datosNuevosJugador) {
        try {
            const jugadorModificado = await this.FiguritasAPI.modifyJugador(idJugadorModificado, datosNuevosJugador);
            return jugadorModificado;
        } catch (error) {
            throw new Error(error);
        };
    };

    async eliminarJugador(idFigurita) {
        try {
            const result = await this.FiguritasAPI.deleteFigurita(idFigurita);
            return result;
        } catch (error) {
            throw new Error(error);
        };
    };
};

export default JugadoresService;
