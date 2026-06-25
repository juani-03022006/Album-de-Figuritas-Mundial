import { Router } from 'express';
import { middlewareValidacionFigurita } from '../middleware/validarFigurita.js';
import { middlewareValidacionJugador } from '../middleware/validarJugador.js';
import createJugadoresController from '../controllers/JugadoresController.js';
import JugadoresService from '../services/JugadoresService.js'
import FiguritasRepository from '../repositories/FiguritasRepository.js';


const figuritasRepository = new FiguritasRepository();
const jugadoresService = new JugadoresService(figuritasRepository);
const jugadoresController = createJugadoresController(jugadoresService);

const routerJugadores = new Router();

routerJugadores.get('', jugadoresController.getJugadores);
routerJugadores.get('/seleccion/:id', jugadoresController.getJugadoresPorSeleccion);
routerJugadores.post('', middlewareValidacionFigurita, middlewareValidacionJugador, jugadoresController.createJugador);
routerJugadores.put('/:id', middlewareValidacionJugador, jugadoresController.modifyJugador);

export default routerJugadores;
