class PosicionesService {
    constructor(PosicionesRepository) {
        if (!PosicionesRepository || typeof PosicionesRepository.createPosicion !== 'function') {
            throw new Error('El Repositorio de posiciones es obligatorio!');
        };

        this.PosicionesRepository = PosicionesRepository;
    };

    async obtenerPosiciones() {
        try {
            const posiciones = await this.PosicionesRepository.getPosiciones();
            return posiciones;
        } catch (error) {
            throw new Error(error);
        };
    };

    async crearPosicion(datosPosicionNueva) {
        try {
            const nuevaPosicion = await this.PosicionesRepository.createPosicion(datosPosicionNueva);
            return nuevaPosicion;
        } catch (error) {
            throw new Error(error);
        };
    };

    async modificarPosicion(idPosicionModificada, posicionModificada) {
        try {
            const posicion = await this.PosicionesRepository.modifyPosicion(idPosicionModificada, posicionModificada);
            return posicion;
        } catch (error) {
            throw new Error(error);
        };
    };

    async eliminarPosicion(idPosicion) {
        try {
            const posicion = await this.PosicionesRepository.deletePosicion(idPosicion);
            return posicion;
        } catch (error) {
            throw new Error(error);
        };
    }
};

export default PosicionesService;
