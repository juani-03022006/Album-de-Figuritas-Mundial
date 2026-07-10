class JugadoresService {
    constructor(FiguritasRepository) {
        if (!FiguritasRepository || typeof FiguritasRepository.createJugador !== 'function') {
            throw new Error('El Repositorio de figuritas es obligatorio!');
        };

        this.FiguritasRepository = FiguritasRepository;
    };

    async obtenerJugadores() {
        try {
            const jugadores = await this.FiguritasRepository.getJugadores();
            return jugadores;
        } catch (error) {
            throw error;
        };
    };

    async obtenerJugadoresPorSeleccion(idSeleccion) {
        try {
            const jugadores = await this.FiguritasRepository.getJugadoresPorSeleccion(idSeleccion);
            return jugadores;
        } catch (error) {
            throw error;
        };
    };

    async crearJugador(datosJugador) {
        try {
            const nuevoJugador = await this.FiguritasRepository.createJugador(datosJugador);
            return nuevoJugador;
        } catch (error) {
            throw error;
        };
    };

    async modificarJugador(idJugadorModificado, datosNuevosJugador) {
        try {
            const jugadorModificado = await this.FiguritasRepository.modifyJugador(idJugadorModificado, datosNuevosJugador);
            return jugadorModificado;
        } catch (error) {
            throw error;
        };
    };
};

export default JugadoresService;
