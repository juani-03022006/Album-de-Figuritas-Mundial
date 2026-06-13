function createFiguritasController(FiguritasService) {
    if (!FiguritasService || typeof FiguritasService.obtenerFiguritas !== 'function') {
        throw new Error('El Servicio de Figuritas es inválido!');
    };

    return {
        getFiguritas: (req, res) => {
            try {
                const figuritas = await FiguritasService.obtenerFiguritas();
                return res.status(200).json(figuritas);
            } catch (error) {
                console.error(error);
            };
        },

        modifyFigurita: (req, res) => {
            try {
                const idFigurita = req.params.id;
                const figuritaModificada = req.body;

                const result = await FiguritasService.modificarFigurita(idFigurita, figuritaModificada);
                return res.status(200).json(result);
            } catch (error) {
                console.error(error);
            };
        }
    }
}