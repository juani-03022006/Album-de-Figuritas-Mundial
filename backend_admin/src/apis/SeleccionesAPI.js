import axios from 'axios';
import FormData from 'form-data';


class SeleccionesAPI {
    constructor(urlAPI) {
        this.urlAPI = urlAPI;
    };

    async getSelecciones() {
        try {
            const result = await axios.get(`${this.urlAPI}/selecciones/`);
            return result.data;
        } catch (error) {
            throw new Error(error);
        };
    };
    
    async createSeleccion(datosSeleccion, fotoSeleccion) {
        try {
            const formSeleccion = new FormData();

            formSeleccion.append("nombreSeleccion", datosSeleccion.nombreSeleccion);
            formSeleccion.append("nombrePais", datosSeleccion.nombrePais);
            formSeleccion.append("pathBanderaPais", fotoSeleccion.originalname);
            formSeleccion.append("nroDesde", datosSeleccion.nroDesde);
            formSeleccion.append("nroHasta", datosSeleccion.nroHasta);
            formSeleccion.append("colorPrincipal", datosSeleccion.colorPrincipal);
            formSeleccion.append("colorAcento1", datosSeleccion.colorAcento1);
            formSeleccion.append("colorAcento2", datosSeleccion.colorAcento2);
            formSeleccion.append("colorTitulo", datosSeleccion.colorTitulo);
            formSeleccion.append('fotoJugador', fotoJugador.buffer, {
                filename: fotoJugador.originalname,
                contentType: fotoJugador.mimetype
            });

            const result = await axios.post(`${this.urlAPI}/selecciones/`, formSeleccion, {
                headers: formSeleccion.getHeaders()
            });
            return result.data;
        } catch (error) {
            throw new Error(error);
        };
    };

    async modifySeleccion(idSeleccion, datosSeleccion) {
        try {
            const result = await axios.put(`${this.urlAPI}/selecciones/${idSeleccion}`, datosSeleccion);
            return result.data;
        } catch (error) {
            throw new Error(error);
        };
    };
};

export default SeleccionesAPI;
