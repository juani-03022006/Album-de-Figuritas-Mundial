import { Router } from 'express';
import createSeleccionesController from '../controllers/SeleccionesController.js';
import { validarSeleccion } from '../middleware/validarSeleccion.js';
import SeleccionesService from '../services/SeleccionesService.js';
import SeleccionRepository from '../repository/SeleccionesRepository.js';


const seleccionesRepository = new SeleccionRepository();
const seleccionesService = new SeleccionesService(seleccionesRepository);
const seleccionesController = createSeleccionesController(seleccionesService);

const routerSelecciones = Router();

routerSelecciones.get('/', seleccionesController.getSelectiones);
routerSelecciones.post('/', validarSeleccion, seleccionesController.createSeleccion);
routerSelecciones.put('/', validarSeleccion, seleccionesController.modifySeleccion);

export default routerSelecciones;
