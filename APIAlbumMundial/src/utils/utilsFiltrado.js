export const esArchivoPermitido = (file, extensionesPermitidas, tiposPermitidos) => {
    const extension = path.extname(file.originalname).toLowerCase();

    const extensionValida = extensionesPermitidas.includes(extension);

    const mimeValido = tiposPermitidos.includes(file.mimetype);

    return !extensionValida || !mimeValido
};