import { FIGUS_POR_SELECCION } from '../domain_CONSTS.js';

export class Seleccion {
    constructor(datosSeleccion) {
        this.nombreSeleccion = datosSeleccion.nombreSeleccion;
        this.nombrePais = datosSeleccion.nombrePais;
        this.banderaPais = datosSeleccion.banderaPais;
        this.nroDesde = datosSeleccion.nroDesde;
        this.colorPrincipal = datosSeleccion.colorPrincipal;
        this.colorAcento1 = datosSeleccion.colorAcento1;
        this.colorAcento2 = datosSeleccion.colorAcento2;
        this.colorTitulo = datosSeleccion.colorTitulo;
    };

    obtenerInfoSeleccion() {
        return ({
            "nombreSeleccion": this.nombreSeleccion,
            "nombrePais": this.nombrePais,
            "banderaPais": this.banderaPais,
            "nroDesde": this.nroDesde,
            "nroHasta": this.nroDesde + FIGUS_POR_SELECCION - 1,
            "colorPrincipal": this.colorPrincipal,
            "colorAcento1": this.colorAcento1,
            "colorAcento2": this.colorAcento2,
            "colorTitulo": this.colorTitulo
        });
    };
};
