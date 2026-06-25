import { Router } from 'express';
import { middlewareValidacionSeleccion } from '../middleware/validarSeleccion.js';
import generarSeleccionesController from '../controllers/SeleccionesController.js';
import SeleccionesService from '../services/SeleccionesService.js';
import SeleccionesAPI from '../apis/SeleccionesAPI.js';


const seleccionesApi = new SeleccionesAPI('http://localhost:3100');
const seleccionesService = new SeleccionesService(seleccionesApi);
const seleccionesController = generarSeleccionesController(seleccionesService);

const routerSelecciones = Router();

routerSelecciones.get('', seleccionesController.getSelecciones);
routerSelecciones.post('', middlewareValidacionSeleccion, seleccionesController.createSeleccion);
routerSelecciones.put('/:id', middlewareValidacionSeleccion, seleccionesController.modifySeleccion);

export default routerSelecciones;