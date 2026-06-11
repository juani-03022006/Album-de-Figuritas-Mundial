import { Seleccion } from './models/index.js';


class SeleccionRepository {
    async createSeleccion({ nombreSeleccion, nombrePais, banderaPais, nroDesde, nroHasta }) {
        return Seleccion.create({
            nombreSeleccion: nombreSeleccion,
            nombrePais: nombrePais,
            banderaPais: banderaPais,
            nroDesde: nroDesde,
            nroHasta: nroHasta
        });
    };

    async getSeleccion(idSeleccion) {
        const seleccion = await Seleccion.findOne({ where: { idSeleccion } });

        return seleccion;
    };

    async modifySeleccion({ idSeleccion, nombreSeleccion, nombrePais, banderaPais, nroDesde, nroHasta }) {
        const seleccion = this.getSeleccion(idSeleccion);

        seleccion.set({
            nombreSeleccion: nombreSeleccion,
            nombrePais: nombrePais,
            banderaPais: banderaPais,
            nroDesde: nroDesde,
            nroHasta: nroHasta
        });

        await seleccion.save();
        return seleccion;
    };
};

export default SeleccionRepository;
