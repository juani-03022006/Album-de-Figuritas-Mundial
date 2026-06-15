export function validarZip(zipFotosFiguritas) {
    if (!zipFotosFiguritas || !zipFotosFiguritas.path.endsWith('.zip')) {
        return res.status(400).json({
            error: 'Zip de Fotos de Figuritas inválido.'
        });
    };
};
