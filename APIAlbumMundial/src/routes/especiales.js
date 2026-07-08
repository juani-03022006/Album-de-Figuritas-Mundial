import { Router } from 'express';
import { middlewareValidacionFigurita } from './middleware/validarFigurita.js'
import { middlewareValidacionEspecial } from './middleware/validarEspecial.js';
import createEspecialesController from '../controllers/EspecialesController.js';
import EspecialesService from '../services/EspecialesService.js';
import FiguritasRepository from '../repositories/FiguritasRepository.js';


const figuritasRepository = new FiguritasRepository();
const especialesService = new EspecialesService(figuritasRepository);
const especialesController = createEspecialesController(especialesService);

const routerEspeciales = new Router();

routerEspeciales.get('', especialesController.getEspeciales);
routerEspeciales.get('/seleccion/:id', especialesController.getEspecialesPorSeleccion);
routerEspeciales.post('', middlewareValidacionFigurita, middlewareValidacionEspecial, especialesController.createEspecial);
routerEspeciales.put('/:id', middlewareValidacionEspecial, especialesController.modifyEspecial);

export default routerEspeciales;
