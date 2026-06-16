import { Router } from 'express';
import generarSeleccionesController from '../controllers/SeleccionesController.js';
import SeleccionesService from '../services/SeleccionesService.js';
import SeleccionesAPI from '../api/SeleccionesAPI.js';


const seleccionesApi = new SeleccionesAPI('http://localhost:3100');
const seleccionesService = new SeleccionesService(seleccionesApi);
const seleccionesController = generarSeleccionesController(seleccionesService);

const routerSelecciones = Router();

routerSelecciones.get('/', seleccionesController.getSelecciones);
routerSelecciones.post('/', seleccionesController.createSeleccion);
routerSelecciones.put('/:id', seleccionesController.modifySeleccion);

export default routerSelecciones;