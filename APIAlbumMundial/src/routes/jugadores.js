import { Router } from 'express';
import { validarFigurita } from '../middleware/validarFigurita.js';
import { validarJugador } from '../middleware/validarJugador.js';
import createFiguritasController from '../controllers/FiguritasController.js';
import FiguritasService from '../services/FiguritasService.js';
import FiguritasRepository from '../repositories/FiguritasRepository.js';


const figuritasRepository = new FiguritasRepository();
const figuritasService = new FiguritasService(figuritasRepository);
const figuritasController = createFiguritasController(figuritasService);

const routerJugadores = new Router();

routerJugadores.get('/', figuritasController.getJugadores);
routerJugadores.post('/', validarFigurita, validarJugador, figuritasController.createJugador);
routerJugadores.put('/:id', validarJugador, figuritasController.modifyJugador);

export default routerJugadores;
