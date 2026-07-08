class EspecialesService {
    constructor(FiguritasRepository) {
        if (!FiguritasRepository || typeof FiguritasRepository.getEspeciales !== 'function') {
            throw new Error('El Repositorio de figuritas es obligatorio!');
        };

        this.FiguritasRepository = FiguritasRepository;
    };

    async obtenerEspeciales() {
        try {
            const especiales = await this.FiguritasRepository.getEspeciales();
            return especiales;
        } catch (error) {
            throw error;
        };
    }

    async obtenerEspecialesPorSeleccion(idSeleccion) {
        try {
            const especiales = await this.FiguritasRepository.getEspecialesPorSeleccion(idSeleccion);
            return especiales;
        } catch (error) {
            throw error;
        };
    };

    async crearEspecial(datosEspecial) {
        try {
            const nuevaEspecial = await this.FiguritasRepository.createEspecial(datosEspecial);
            return nuevaEspecial;
        } catch (error) {
            throw error;
        };
    };

    async modificarEspecial(idEspecialModificada, datosNuevosEspecial) {
        try {
            const especialModificada = await this.FiguritasRepository.modifyEspecial(idEspecialModificada, datosNuevosEspecial);
            return especialModificada;
        } catch (error) {
            throw error;
        };
    };
};

export default EspecialesService;
