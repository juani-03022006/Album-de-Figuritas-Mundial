import { Router } from 'express';
import { middlewareValidacionSeleccion } from '../middleware/validarSeleccion.js';
import createSeleccionesController from '../controllers/SeleccionesController.js';
import SeleccionesService from '../services/SeleccionesService.js';
import SeleccionRepository from '../repositories/SeleccionesRepository.js';


const seleccionesRepository = new SeleccionRepository();
const seleccionesService = new SeleccionesService(seleccionesRepository);
const seleccionesController = createSeleccionesController(seleccionesService);

const routerSelecciones = Router();

routerSelecciones.get('/', seleccionesController.getSelectiones);
routerSelecciones.post('/', middlewareValidacionSeleccion, seleccionesController.createSeleccion);
routerSelecciones.put('/:id', middlewareValidacionSeleccion, seleccionesController.modifySeleccion);

export default routerSelecciones;
