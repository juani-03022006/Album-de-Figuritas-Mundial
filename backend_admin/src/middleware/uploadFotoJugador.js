import multer from 'multer';
import { esArchivoPermitido } from '../utils/utilsFiltrado.js';
import { extensionesPermitidas, tiposPermitidos } from '../consts/constsFiltradoFotos.js';


const fileFilter = (req, file, cb) => {
    if (!esArchivoPermitido(file, extensionesPermitidas, tiposPermitidos)) {
        return cb(new Error('Tipo de archivo no permitido'));
    };
    
    cb(null, true);
};

export const uploadJugador = multer({
    storage: multer.memoryStorage(),
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});
