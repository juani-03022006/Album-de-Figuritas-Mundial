import multer from 'multer';
import path from 'path';
import { esArchivoPermitido } from '../utils/utilsFiltrado.js';
import { extensionesPermitidas, tiposPermitidos } from '../consts/constsFiltradoZip.js';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/tmp');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }

});

const fileFilter = (req, file, cb) => {
    if (esArchivoPermitido(file, extensionesPermitidas, tiposPermitidos)) {
        return cb(new Error('El archivo debe ser un ZIP'));
    };

    cb(null, true);
};

export const uploadJugadores = multer({
    storage,
    fileFilter,
    limits: { fileSize: 50 * 1024 * 1024 }
});
