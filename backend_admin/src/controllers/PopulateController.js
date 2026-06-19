function createPopulateController(PopulateService) {
    if (!PopulateService || typeof PopulateService.populateDB !== 'function') {
        throw new Error('El PopulateService es inválido.');
    };

    return {
        populateDB: async (req, res) => {
            try {
                const result = await PopulateService.populateDB();
                res.status(200).json('Base de datos Populada con éxito!');
            } catch (error) {
                res.status(500).json(error);
            };
        }
    };
};

export default createPopulateController;
