import { Router } from 'express';
import { validarPosicion } from '../middleware/validarPosicion.js';
import createPosicionesController from '../controllers/PosicionesController.js';
import PosicionesService from '../services/PosicionesService.js';
import PosicionesRepository from '../repositories/PosicionesRepository.js';


const posicionesRepository = new PosicionesRepository();
console.log(posicionesRepository);
const posicionesService = new PosicionesService(posicionesRepository);
const posicionesController = createPosicionesController(posicionesService);

const routerPosiciones = new Router();

routerPosiciones.get('/', posicionesController.getPosiciones);
routerPosiciones.post('/', validarPosicion, posicionesController.createPosicion);
routerPosiciones.put('/:id', validarPosicion, posicionesController.modifyPosicion);

export default routerPosiciones;
