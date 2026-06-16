class PosicionesService {
    constructor(PosicionesAPI) {
        if (!PosicionesAPI || typeof PosicionesAPI.createPosicion !== 'function') {
            throw new Error('El Repositorio de selecciones es obligatorio!');
        };

        this.PosicionesAPI = PosicionesAPI;
    };

    async obtenerPosiciones() {
        const result = await this.PosicionesAPI.getPosiciones();
        return result;
    };

    async crearPosicion(datosPosicion) {
        const result = await this.PosicionesAPI.createPosicion(datosPosicion);
        return result;
    };

    async modificarPosicion(idPosicion, datosPosicion) {
        const result = await this.PosicionesAPI.modifyPosicion(idPosicion, datosPosicion);
        return result;
    };
};

export default PosicionesService;
