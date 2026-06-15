export function validarEspecial({ nombre }) {
    if (typeof nombre !== 'string' || nombre.trim() === '') {
        return res.status(400).json({
            error: 'Nombre de Figurita inválido.'
        });
    };
};
