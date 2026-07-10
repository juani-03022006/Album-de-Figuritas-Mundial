class EspecialesService {
    constructor(FiguritasAPI) {
        if (!FiguritasAPI || typeof FiguritasAPI.getEspeciales !== 'function') {
            throw new Error('El Repositorio de Figuritas es obligatorio!');
        };

        this.FiguritasAPI = FiguritasAPI;
    };

    async obtenerEspeciales() {
        try {
            const result = await this.FiguritasAPI.getEspeciales();
            return result
        } catch (error) {
            throw error;
        };
    };

    async obtenerEspecialesPorSeleccion(idSeleccion) {
        try {
            const result = await this.FiguritasAPI.getEspecialesPorSeleccion(idSeleccion);
            return result;
        } catch (error) {
            throw error;
        };
    };

    async crearEspecial(datosEspecial) {
        try {
            const result = await this.FiguritasAPI.createEspecial(datosEspecial);
            return result;
        } catch (error) {
            throw error;
        };
    };

    async modificarEspecial(idEspecial, datosEspecial) {
        try {
            const result = await this.FiguritasAPI.modifyEspecial(idEspecial, datosEspecial);
            return result;
        } catch (error) {
            throw error;
        };
    };

    async eliminarEspecial(idFigurita) {
        try {
            const result = await this.FiguritasAPI.deleteFigurita(idFigurita);
            return result;
        } catch (error) {
            throw error;
        };
    };
};

export default EspecialesService;
