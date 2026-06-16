import { Router } from 'express';
import { middlewarePostEspecial, middlewarePostEspeciales } from '../middleware/middlewarePostEspeciales.js';
import { uploadEspecial } from '../middleware/uploadFotoEspecial.js';
import { uploadEspeciales } from '../middleware/uploadZipFotosEspeciales.js';
import createFiguritasController from '../controllers/FiguritasController.js';
import FiguritasService from '../services/FiguritasService.js';
import FiguritasRepository from '../repositories/FiguritasRepository.js';


const figuritasRepository = new FiguritasRepository();
const figuritasService = new FiguritasService(figuritasRepository);
const figuritasController = createFiguritasController(figuritasService);

const routerEspeciales = new Router();

routerEspeciales.get('/seleccion/:id', figuritasController.getEspecialesPorSeleccion);
routerEspeciales.post('/', uploadEspecial.single('fotoEspecial'), middlewarePostEspecial, figuritasController.createEspecial);
routerEspeciales.post('/many', middlewarePostEspeciales, uploadEspeciales.single('fotosEspeciales'), figuritasController.createEspeciales);
// routerEspeciales.put('/:id', middlewareValidacionEspecial, figuritasController.modifyEspecial);

export default routerEspeciales;
