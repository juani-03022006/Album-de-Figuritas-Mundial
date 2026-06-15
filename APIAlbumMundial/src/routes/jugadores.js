import { Router } from 'express';
import { middlewareValidacionFiguritas, middlewareValidacionFigurita } from '../middleware/validarFigurita.js';
import { middlewareValidacionJugador, middlewareValidacionJugadores } from '../middleware/validarJugador.js';
import createFiguritasController from '../controllers/FiguritasController.js';
import FiguritasService from '../services/FiguritasService.js';
import FiguritasRepository from '../repositories/FiguritasRepository.js';


const figuritasRepository = new FiguritasRepository();
const figuritasService = new FiguritasService(figuritasRepository);
const figuritasController = createFiguritasController(figuritasService);

const routerJugadores = new Router();

routerJugadores.get('/', figuritasController.getJugadores);
routerJugadores.post('/', middlewareValidacionFigurita, middlewareValidacionJugador, figuritasController.createJugador);
routerJugadores.put('/:id', middlewareValidacionJugador, figuritasController.modifyJugador);
routerJugadores.post('/many', middlewareValidacionFiguritas, middlewareValidacionJugadores, figuritasController.createJugadores);

export default routerJugadores;
