import { Router } from 'express';
import { uploadJugador } from '../middleware/uploadFotoJugador.js';
import generarJugadoresController from '../controllers/JugadoresController.js';
import JugadoresService from '../services/JugadoresService.js';
import FiguritasAPI from '../apis/FiguritasAPI.js';


const figuritasApi = new FiguritasAPI('http://localhost:3100');
const jugadoresService = new JugadoresService(figuritasApi)
const jugadoresController = generarJugadoresController(jugadoresService);

const routerJugadores = Router();

routerJugadores.get('/seleccion/:id', jugadoresController.getJugadoresPorSeleccion);
routerJugadores.post('/', uploadJugador.single('fotoJugador'), jugadoresController.createJugador);
routerJugadores.put('/:id', jugadoresController.modifyJugador);
routerJugadores.delete('/:id', jugadoresController.deleteJugador);

export default routerJugadores;