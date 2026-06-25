import { Router } from 'express';
import { middlewareValidacionPosicion } from '../middleware/validarPosicion.js';
import generarPosicionesController from '../controllers/PosicionesController.js';
import PosicionesService from '../services/PosicionesService.js';
import PosicionesAPI from '../apis/PosicionesAPI.js';


const posicionesApi = new PosicionesAPI('http://localhost:3100');
const posicionesService = new PosicionesService(posicionesApi);
const posicionesController = generarPosicionesController(posicionesService);

const routerPosiciones = Router();

routerPosiciones.get('', posicionesController.getPosiciones);
routerPosiciones.post('', middlewareValidacionPosicion, posicionesController.createPosicion);
routerPosiciones.put('/:id', middlewareValidacionPosicion, posicionesController.modifyPosicion);

export default routerPosiciones;