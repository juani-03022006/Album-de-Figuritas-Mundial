import { Figurita } from "./Figurita";


export class Especial extends Figurita {
    constructor(numeroFigurita, nombre) {
        super(numeroFigurita);

        this.nombre = nombre;
    };

    obtenerNombre() {
        return (this.nombre);
    };
};
