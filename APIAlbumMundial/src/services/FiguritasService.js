class FiguritasService {
    constructor(FiguritasRepository) {
        if (!FiguritasRepository || typeof FiguritasRepository.createJugador !== 'function') {
            throw new Error('El Repositorio de figuritas es obligatorio!');
        };

        this.FiguritasRepository = FiguritasRepository;
    };

    // Para jugadores
    async obtenerJugadores() {
        const jugadores = await this.FiguritasRepository.getJugadores();
        return jugadores;
    };

    async crearJugador(datosJugador) {
        const nuevoJugador = await this.FiguritasRepository.createJugador(datosJugador);
        return nuevoJugador;
    };

    async crearJugadores(arrayDatosJugadores) {
        const nuevosJugadores = await this.FiguritasRepository.createJugadores(arrayDatosJugadores);
        return nuevosJugadores;
    }

    async modificarJugador(idJugadorModificado, datosNuevosJugador) {
        const jugadorModificado = await this.FiguritasRepository.modifyJugador(idJugadorModificado, datosNuevosJugador);
        return jugadorModificado;
    };

    // Para especiales
    async obtenerEspeciales() {
        const especiales = await this.FiguritasRepository.getEspeciales();
        return especiales;
    };

    async crearEspecial(datosEspecial) {
        const nuevaEspecial = await this.FiguritasRepository.createEspecial(datosEspecial);
        return nuevaEspecial;
    };

    async crearEspeciales(arrayDatosEspeciales) {
        const nuevasEspeciales = await this.FiguritasRepository.createEspeciales(arrayDatosEspeciales);
        return nuevasEspeciales;
    }

    async modificarEspecial(idEspecialModificada, datosNuevosEspecial) {
        const especialModificada = await this.FiguritasRepository.modifyEspecial(idEspecialModificada, datosNuevosEspecial);
        return especialModificada;
    };
};

export default FiguritasService;
