import { Seleccion } from './models/index.js';


class SeleccionRepository {
    async getSeleccion(idSeleccion) {
        const seleccion = await Seleccion.findOne({ where: { idSeleccion } });

        return seleccion;
    };

    async getSelecciones() {
        const selecciones = await Seleccion.findAll();

        return selecciones;
    };

    async modifySeleccion(idSeleccion, datosSeleccion) {
        const seleccion = await this.getSeleccion(idSeleccion);

        seleccion.set(datosSeleccion);

        await seleccion.save();
        return seleccion;
    };

    async createSeleccion(datosSeleccion) {
        const seleccionNueva = await Seleccion.create(datosSeleccion);    

        return seleccionNueva;
    };
};

export default SeleccionRepository;
