class FiguritasService {
    constructor(FiguritasRepository) {
        if (!FiguritasRepository || typeof FiguritasRepository.createFigurita !== 'function') {
            throw new Error('El Repositorio de figuritas es obligatorio!');
        };

        this.FiguritasRepository = FiguritasRepository;
    };

    async obtenerJugadores() {
        const jugadores = await this.FiguritasRepository.getJugadores();
        return jugadores;
    };

    async obtenerEspeciales() {
        const especiales = await this.FiguritasRepository.getEspeciales();
        return especiales;
    };

    async modificarJugador(idJugadorModificado, datosNuevosJugador) {
        const jugadorModificado = await this.FiguritasRepository.modifyJugador(idJugadorModificado, datosNuevosJugador);
        return jugadorModificado;
    };

    async modificarEspecial(idEspecialModificada, datosNuevosEspecial) {
        const especialModificada = await this.FiguritasRepository.modifyEspecial(idEspecialModificada, datosNuevosEspecial);
        return especialModificada;
    };

    async crearFigurita(datosFigurita) {};
}