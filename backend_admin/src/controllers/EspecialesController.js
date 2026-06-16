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

        modifyJugador: async (req, res) => {
            try {
                console.log('Modificando jugador...');
                const idJugador = req.params.id;
                const jugadorModificado = req.body;

                const result = await EspecialesService.modificarJugador(idJugador, jugadorModificado);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        deleteJugador: async (req, res) => {
            try {
                console.log('Eliminando jugador...');
                const idFigurita = req.params.id;

                const result = await EspecialesService.eliminarJugador(idFigurita);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json(error);
            };
        }
    };
};

export default generarEspecialesController;
