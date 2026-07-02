function generarEspecialesController(EspecialesService) {
    if (!EspecialesService || typeof EspecialesService.obtenerEspeciales !== 'function') {
        throw new Error('El Servicio de Jugadores es inválido!');
    };

    return {
        getEspeciales: async (req, res) => {
            try {
                const especiales = EspecialesService.obtenerEspeciales();

                console.log('Obteniendo las Especiales...');
                res.status(200).json(await especiales);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        getEspecialesPorSeleccion: async (req, res) => {
            try {
                const idSeleccion = req.params.id;
                const especialesDeSeleccion = EspecialesService.obtenerEspecialesPorSeleccion(idSeleccion);
                
                console.log('Obteniendo las Especiales...');
                res.status(200).json(await especialesDeSeleccion);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        createEspecial: async (req, res) => {
            try {
                const datosEspecial = req.body;
                const especial = EspecialesService.crearEspecial(datosEspecial);
                
                console.log('Añadiendo Especial...');
                res.status(200).json(await especial);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        modifyEspecial: async (req, res) => {
            try {
                const idEspecial = req.params.id;
                console.log(idEspecial)
                const datosEspecial = req.body;
                const result = EspecialesService.modificarEspecial(idEspecial, datosEspecial);
                
                console.log('Modificando Especial...');
                res.status(200).json(await result);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        deleteEspecial: async (req, res) => {
            try {
                const idFigurita = req.params.id;
                const result = EspecialesService.eliminarEspecial(idFigurita);
                
                console.log('Eliminando Especial...');
                res.status(200).json(await result);
            } catch (error) {
                res.status(500).json(error);
            };
        }
    };
};

export default generarEspecialesController;
