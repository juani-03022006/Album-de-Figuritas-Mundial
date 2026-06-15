export function validarFoto(fotoFigurita) {
    if (!fotoFigurita) {
        return res.status(400).json({
            error: 'Foto de Figurita inválida.'
        });
    };
};
