class PosicionesService {
    constructor(PosicionesRepository) {
        if (!PosicionesRepository || typeof PosicionesRepository.createPosicion !== 'function') {
            throw new Error('El Repositorio de posiciones es obligatorio!');
        };

        this.PosicionesRepository = PosicionesRepository;
    };

    async obtenerPosiciones() {
        const posiciones = await this.PosicionesRepository.getPosiciones();
        return posiciones;
    };

    async modificarPosicion(idPosicionModificada, posicionModificada) {
        const posicion = await this.PosicionesRepository.modifyPosicion(idPosicionModificada, posicionModificada);
        return posicion;
    };

    async crearPosicion(datosPosicionNueva) {
        const nuevaPosicion = await this.PosicionesRepository.createPosicion(datosPosicionNueva);
        return nuevaPosicion;
    };
};

export default PosicionesService;
