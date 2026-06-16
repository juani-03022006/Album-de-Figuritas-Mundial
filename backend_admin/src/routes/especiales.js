import { Router } from 'express';
import { uploadEspecial } from '../middleware/uploadFotoEspecial.js';
import generarEspecialesController from '../controllers/EspecialesController.js';
import EspecialesService from '../services/EspecialesService.js';
import FiguritasAPI from '../apis/FiguritasAPI.js';


const figuritasApi = new FiguritasAPI('http://localhost:3100');
const especialesService = new EspecialesService(figuritasApi)
const especialesController = generarEspecialesController(especialesService);

const routerEspeciales = Router();

routerEspeciales.get('/seleccion/:id', especialesController.getEspecialesPorSeleccion);
routerEspeciales.post('/', uploadEspecial.single('fotoEspecial'), especialesController.createEspecial);
// routerEspeciales.put('/:id', jugadoresController.modifyJugador);
// routerEspeciales.delete('/:id', jugadoresController.deleteJugador);

export default routerEspeciales;