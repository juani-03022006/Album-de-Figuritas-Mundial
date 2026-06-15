import { Router } from 'express';
import createFiguritasController from '../controllers/FiguritasController.js';
import FiguritasService from '../services/FiguritasService.js';
import FiguritasRepository from '../repositories/FiguritasRepository.js';
import { middlewarePostEspecial, middlewarePostEspeciales } from '../middleware/middlewarePostEspeciales.js';


const figuritasRepository = new FiguritasRepository();
const figuritasService = new FiguritasService(figuritasRepository);
const figuritasController = createFiguritasController(figuritasService);

const routerEspeciales = new Router();

routerEspeciales.get('/', figuritasController.getEspeciales);
routerEspeciales.post('/', middlewarePostEspecial, figuritasController.createEspecial);
routerEspeciales.post('/many', middlewarePostEspeciales, figuritasController.createEspeciales);
routerEspeciales.put('/:id', middlewareValidacionEspecial, figuritasController.modifyEspecial);

export default routerEspeciales;
