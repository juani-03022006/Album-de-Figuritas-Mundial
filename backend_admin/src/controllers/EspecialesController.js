function generarEspecialesController(EspecialesService) {
    if (!EspecialesService || typeof EspecialesService.obtenerEspecialesPorSeleccion !== 'function') {
        throw new Error('El Servicio de Jugadores es inválido!');
    };

    return {
        getEspecialesPorSeleccion: async (req, res) => {
            try {
                console.log('Obteniendo especiales...');
                const idSeleccion = req.params.id;
                const especialesDeSeleccion = await EspecialesService.obtenerEspecialesPorSeleccion(idSeleccion);

                res.status(200).json(especialesDeSeleccion);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        createEspecial: async (req, res) => {
            try {
                console.log('Añadiendo especial...');
                const datosEspecial = req.body;
                const fotoEspecial = req.file;
                const especial = await EspecialesService.crearEspecial(datosEspecial, fotoEspecial);

                res.status(200).json(especial);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        modifyEspecial: async (req, res) => {
            try {
                console.log('Modificando especial...');
                const idEspecial = req.params.id;
                const datosEspecial = req.body;

                const result = await EspecialesService.modificarEspecial(idEspecial, datosEspecial);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        deleteEspecial: async (req, res) => {
            try {
                console.log('Eliminando especial...');
                const idFigurita = req.params.id;

                const result = await EspecialesService.eliminarEspecial(idFigurita);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json(error);
            };
        }
    };
};

export default generarEspecialesController;
