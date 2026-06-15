import multer from 'multer';
import path from 'path';
import { esArchivoPermitido } from '../utils/utilsFiltrado.js';
import { extensionesPermitidas, tiposPermitidos } from '../consts/constsFiltradoFotos.js';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/especiales');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (esArchivoPermitido(file, extensionesPermitidas, tiposPermitidos)) {
        return cb(new Error('Tipo de archivo no permitido'));
    };
    
    cb(null, true);
};

export const uploadEspecial = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});