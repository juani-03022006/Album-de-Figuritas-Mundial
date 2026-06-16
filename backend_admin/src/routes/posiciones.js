import { Router } from 'express';
import generarPosicionesController from '../controllers/PosicionesController.js';
import PosicionesService from '../services/PosicionesService.js';
import PosicionesAPI from '../api/PosicionesAPI.js';


const posicionesApi = new PosicionesAPI('http://localhost:3100');
const posicionesService = new PosicionesService(posicionesApi);
const posicionesController = generarPosicionesController(posicionesService);

const routerPosiciones = Router();

routerPosiciones.get('/', posicionesController.getPosiciones);
routerPosiciones.post('/', posicionesController.createPosicion);
routerPosiciones.put('/:id', posicionesController.modifyPosicion);

export default routerPosiciones;