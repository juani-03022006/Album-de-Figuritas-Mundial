function generarPosicionesController(PosicionesService) {
    if (!PosicionesService || typeof PosicionesService.obtenerPosiciones !== 'function') {
        throw new Error('El Servicio de Posiciones es inválido!');
    };

    return {
        getPosiciones: async (req, res) => {
            try {
                const posiciones = await PosicionesService.obtenerPosiciones();
                
                console.log('Obteniendo las Posiciones...');
                res.status(200).json(posiciones);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        createPosicion: async (req, res) => {
            try {
                console.log('Añadiendo Posicion...');
                const datosPosicion = req.body;
                const result = await PosicionesService.crearPosicion(datosPosicion);

                res.status(200).json(result);
            } catch (error) {
                res.status(500).json(error);
            };
        },

        modifyPosicion: async (req, res) => {
            try {
                console.log('Modificando Posicion...');

                const idPosicion = req.params.id
                const nuevosDatosPoscion = req.body;
                const result = await PosicionesService.modificarPosicion(idPosicion, nuevosDatosPoscion);

                res.status(200).json(result);
            } catch (error) {
                res.status(500).json(error);
            };
        },
        
        deletePosicion: async (req, res) => {
            try {
                console.log('Eliminando Posicion...');

                const idPosicion = req.params.id;
                const result = await PosicionesService.eliminarPosicion(idPosicion);

                res.status(200).json(result);
            } catch (error) {
                res.status(500).json(error);
            };
        }
    };
};

export default generarPosicionesController;
