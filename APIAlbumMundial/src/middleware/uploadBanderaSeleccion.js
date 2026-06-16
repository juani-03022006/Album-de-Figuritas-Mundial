import multer from 'multer';
import { esArchivoPermitido } from '../utils/utilsFiltrado.js';
import { extensionesPermitidas, tiposPermitidos } from '../consts/constsFiltradoFotos.js';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/selecciones');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (!esArchivoPermitido(file, extensionesPermitidas, tiposPermitidos)) {
        return cb(new Error('Tipo de archivo no permitido'));
    };
    
    cb(null, true);
};

export const uploadBandera = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});
