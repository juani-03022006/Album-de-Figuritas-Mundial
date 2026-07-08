import { Router } from 'express';
import { middlewareValidacionPosicion } from './middleware/validarPosicion.js';
import createPosicionesController from '../controllers/PosicionesController.js';
import PosicionesService from '../services/PosicionesService.js';
import PosicionesRepository from '../repositories/PosicionesRepository.js';


const posicionesRepository = new PosicionesRepository();
const posicionesService = new PosicionesService(posicionesRepository);
const posicionesController = createPosicionesController(posicionesService);

const routerPosiciones = new Router();

routerPosiciones.get('/', posicionesController.getPosiciones);
routerPosiciones.post('/', middlewareValidacionPosicion, posicionesController.createPosicion);
routerPosiciones.put('/:id', middlewareValidacionPosicion, posicionesController.modifyPosicion);
routerPosiciones.delete('/:id', posicionesController.deletePosicion);

export default routerPosiciones;
