import { Router } from 'express';
import { middlewareValidacionFigurita } from '../middleware/validarFigurita.js';
import { middlewareValidacionJugador } from '../middleware/validarJugador.js';
import generarJugadoresController from '../controllers/JugadoresController.js';
import JugadoresService from '../services/JugadoresService.js';
import FiguritasAPI from '../apis/FiguritasAPI.js';


const figuritasApi = new FiguritasAPI('http://localhost:3100');
const jugadoresService = new JugadoresService(figuritasApi)
const jugadoresController = generarJugadoresController(jugadoresService);

const routerJugadores = Router();

routerJugadores.get('', jugadoresController.getJugadores);
routerJugadores.get('/seleccion/:id', jugadoresController.getJugadoresPorSeleccion);
routerJugadores.post('', middlewareValidacionFigurita, middlewareValidacionJugador, jugadoresController.createJugador);
routerJugadores.put('/:id', middlewareValidacionJugador, jugadoresController.modifyJugador);
routerJugadores.delete('/:id', jugadoresController.deleteJugador);

export default routerJugadores;