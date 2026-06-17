class EspecialesService {
    constructor(FiguritasAPI) {
        if (!FiguritasAPI || typeof FiguritasAPI.getEspecialesPorSeleccion !== 'function') {
            throw new Error('El Repositorio de Figuritas es obligatorio!');
        };

        this.FiguritasAPI = FiguritasAPI;
    };

    async obtenerEspecialesPorSeleccion(idSeleccion) {
        try {
            const result = await this.FiguritasAPI.getEspecialesPorSeleccion(idSeleccion);
            return result;
        } catch (error) {
            console.error(error);
        };
    };

    async crearEspecial(datosEspecial, fotoEspecial) {
        try {
            const result = await this.FiguritasAPI.createEspecial(datosEspecial, fotoEspecial);
            return result;
        } catch (error) {
            console.error(error);
        };
    };

    async modificarEspecial(idEspecial, datosEspecial) {
        try {
            const result = await this.FiguritasAPI.modifyEspecial(idEspecial, datosEspecial);
            return result;
        } catch (error) {
            throw new Error(error);
        };
    };

    async eliminarEspecial(idFigurita) {
        try {
            const result = await this.FiguritasAPI.deleteFigurita(idFigurita);
            return result;
        } catch (error) {
            throw new Error(error);
        };
    };
};

export default EspecialesService;