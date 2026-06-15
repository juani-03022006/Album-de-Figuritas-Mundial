export function validarFigurita({ nroFigurita, nombreFoto, tipo, idSeleccion }, res) {
    
    if (typeof Number(nroFigurita) !== 'number') {
        return res.status(400).json({
            error: 'Número de figurita inválido.'
        });
    };

    if (typeof nombreFoto !== 'string' || nombreFoto.trim() === '') {
        return res.status(400).json({
            error: 'Foto de figurita inválida.'
        });
    };

    if (typeof tipo !== 'string' || tipo.trim() === '' || !('ej'.includes(tipo))) {
        return res.status(400).json({
            error: 'Tipo de figurita inválido.'
        });
    };

    if (typeof Number(idSeleccion) !== 'number') {
        return res.status(400).json({
            error: 'ID de selección inválido.'
        });
    };
};
