import { Router } from 'express';
import { validarFigurita } from '../middleware/validarFigurita.js';
import { validarEspecial } from '../middleware/validarEspecial.js';
import createFiguritasController from '../controllers/FiguritasController.js';
import FiguritasService from '../services/FiguritasService.js';
import FiguritasRepository from '../repositories/FiguritasRepository.js';


const figuritasRepository = new FiguritasRepository();
const figuritasService = new FiguritasService(figuritasRepository);
const figuritasController = createFiguritasController(figuritasService);

const routerEspeciales = new Router();

routerEspeciales.get('/', figuritasController.getEspeciales);
routerEspeciales.post('/', validarFigurita, validarEspecial, figuritasController.createEspecial);
routerEspeciales.put('/', validarEspecial, figuritasController.modifyEspecial);

export default routerEspeciales;
