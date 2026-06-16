import { Posicion } from './models/index.js';


class PosicionesRepository {
    async getPosiciones() {
        const posiciones = await Posicion.findAll();

        return posiciones;
    };
    
    async createPosicion({ descripcion }) {
        const nuevaPosicion = await Posicion.create({
            descripcion: descripcion
        });
        
        return nuevaPosicion;
    };
    
    async modifyPosicion(idPosicion, { descripcion }) {
        const posicion = await Posicion.findOne({ where: { idPosicion } });

        posicion.set({
            descripcion: descripcion
        });
        await posicion.save();

        return posicion;
    };

    async deletePosicion(idPosicion) {
        const posiconEliminada = await Posicion.destroy({ where: { idPosicion } });
        return posiconEliminada;
    }
};

export default PosicionesRepository;
