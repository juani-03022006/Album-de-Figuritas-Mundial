function createFiguritasController(FiguritasService) {
    if (!FiguritasService || typeof FiguritasService.eliminarFigurita !== 'function') {
        throw new Error('El Servicio de Figuritas es inválido!');
    };

    return {
        deleteFigurita: async (req, res) => {
            try {
                const idFigurita = req.params.id;

                const result = await FiguritasService.eliminarFigurita(idFigurita);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json(error);
            };
        }
    };
};

export default createFiguritasController;
