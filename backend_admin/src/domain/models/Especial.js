import { Figurita } from "./Figurita";


export class Especial extends Figurita {
    constructor(posicionPagina, nombre) {
        super(posicionPagina);

        this.nombre = nombre;
    };

    obtenerNombre() {
        return (this.nombre);
    };
};
