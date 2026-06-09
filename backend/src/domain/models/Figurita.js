export class Figurita {
    constructor(numeroFigurita) {
        if (typeof numeroFigurita !== 'number') {
            throw new Error('El número de figurita debe ser del tipo numeérico.');
        };

        this.numeroFigurita = numeroFigurita;
    };

    obtenerNumeroFigurita() {
        return this.numeroFigurita;
    };
};
