export class Seleccion {
    constructor(nombreSeleccion, Pais) {
        this.nombreSeleccion = nombreSeleccion;
        this.Pais = Pais;
    };

    obtenerInfoSeleccion() {
        return ({
            "nombreSeleccion": this.nombreSeleccion,
            "nombrePais": this.Pais.obtenerNombre(),
            "banderaPais": this.Pais.obtenerBandera()
        });
    };
};
