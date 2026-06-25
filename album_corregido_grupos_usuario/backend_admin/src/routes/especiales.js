import { Router } from 'express';
import { middlewareValidacionFigurita } from '../middleware/validarFigurita.js';
import { middlewareValidacionEspecial } from '../middleware/validarEspecial.js';
import generarEspecialesController from '../controllers/EspecialesController.js';
import EspecialesService from '../services/EspecialesService.js';
import FiguritasAPI from '../apis/FiguritasAPI.js';


const figuritasApi = new FiguritasAPI('http://localhost:3100');
const especialesService = new EspecialesService(figuritasApi)
const especialesController = generarEspecialesController(especialesService);

const routerEspeciales = Router();

routerEspeciales.get('', especialesController.getEspeciales);
routerEspeciales.get('/seleccion/:id', especialesController.getEspecialesPorSeleccion);
routerEspeciales.post('', middlewareValidacionFigurita, middlewareValidacionEspecial, especialesController.createEspecial);
routerEspeciales.put('/:id', middlewareValidacionEspecial, especialesController.modifyEspecial);
routerEspeciales.delete('/:id', especialesController.deleteEspecial);

export default routerEspeciales;