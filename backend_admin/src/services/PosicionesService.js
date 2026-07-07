class PosicionesService {
    constructor(PosicionesAPI) {
        if (!PosicionesAPI || typeof PosicionesAPI.createPosicion !== 'function') {
            throw new Error('El Repositorio de selecciones es obligatorio!');
        };

        this.PosicionesAPI = PosicionesAPI;
    };

    async obtenerPosiciones() {
        try {
            const result = await this.PosicionesAPI.getPosiciones();
            return result;
        } catch (error) {
            throw error;
        };
    };

    async crearPosicion(datosPosicion) {
        try {
            const result = await this.PosicionesAPI.createPosicion(datosPosicion);
            return result;
        } catch (error) {
            throw error;
        };
    };

    async modificarPosicion(idPosicion, datosPosicion) {
        try {
            const result = await this.PosicionesAPI.modifyPosicion(idPosicion, datosPosicion);
            return result;
        } catch (error) {
            throw error;
        };
    };
};

export default PosicionesService;
