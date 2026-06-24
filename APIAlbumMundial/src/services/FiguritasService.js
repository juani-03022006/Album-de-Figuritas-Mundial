class FiguritasService {
    constructor(FiguritasRepository) {
        if (!FiguritasRepository || typeof FiguritasRepository.createJugador !== 'function') {
            throw new Error('El Repositorio de figuritas es obligatorio!');
        };

        this.FiguritasRepository = FiguritasRepository;
    };

    async eliminarFigurita(idFigurita) {
        try {
            const result = await this.FiguritasRepository.deleteFigurita(idFigurita);
        } catch (error) {
            throw new Error(error);
        };
    };
};

export default FiguritasService;
