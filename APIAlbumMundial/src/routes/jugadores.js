import { Router } from 'express';
import { middlewarePostJugador, middlewarePostJugadores } from '../middleware/middlewarePostJugadores.js';
import { middlewarePutJugador } from '../middleware/middlewarePutJugador.js';
import { uploadJugador } from '../middleware/uploadFotoJugador.js';
import { uploadJugadores } from '../middleware/uploadZipFotosJugadores.js';
import createFiguritasController from '../controllers/FiguritasController.js';
import FiguritasService from '../services/FiguritasService.js';
import FiguritasRepository from '../repositories/FiguritasRepository.js';


const figuritasRepository = new FiguritasRepository();
const figuritasService = new FiguritasService(figuritasRepository);
const figuritasController = createFiguritasController(figuritasService);

const routerJugadores = new Router();

routerJugadores.get('/', figuritasController.getJugadores);
routerJugadores.post('/', middlewarePostJugador, uploadJugador.single('fotoJugador'), figuritasController.createJugador);
routerJugadores.post('/many', middlewarePostJugadores, uploadJugadores.single('fotosJugadores'), figuritasController.createJugadores);
routerJugadores.put('/:id', middlewarePutJugador, figuritasController.modifyJugador);

export default routerJugadores;
