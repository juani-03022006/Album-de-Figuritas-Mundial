import { Router } from 'express';
import { middlewareValidacionFigurita, middlewareValidacionFiguritas } from '../middleware/validarFigurita.js';
import { middlewareValidacionEspecial, middlewareValidacionEspeciales } from '../middleware/validarEspecial.js';
import createFiguritasController from '../controllers/FiguritasController.js';
import FiguritasService from '../services/FiguritasService.js';
import FiguritasRepository from '../repositories/FiguritasRepository.js';


const figuritasRepository = new FiguritasRepository();
const figuritasService = new FiguritasService(figuritasRepository);
const figuritasController = createFiguritasController(figuritasService);

const routerEspeciales = new Router();

routerEspeciales.get('/', figuritasController.getEspeciales);
routerEspeciales.post('/', middlewareValidacionFigurita, middlewareValidacionEspecial, figuritasController.createEspecial);
routerEspeciales.put('/', middlewareValidacionEspecial, figuritasController.modifyEspecial);
routerEspeciales.post('/many', middlewareValidacionFiguritas, middlewareValidacionEspeciales, figuritasController.createEspeciales);

export default routerEspeciales;
