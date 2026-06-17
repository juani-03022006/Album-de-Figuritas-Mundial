import { Seleccion } from './models/index.js';


class SeleccionRepository {
    async getSelecciones() {
        const selecciones = await Seleccion.findAll();

        return selecciones;
    };

    async createSeleccion(datosSeleccion) {
        const seleccionNueva = await Seleccion.create(datosSeleccion);    

        return seleccionNueva;
    };

    async modifySeleccion(idSeleccion, datosSeleccion) {
        const seleccion = await Seleccion.findOne({ where: { idSeleccion } });

        seleccion.set(datosSeleccion);

        await seleccion.save();
        return seleccion;
    };
};

export default SeleccionRepository;
