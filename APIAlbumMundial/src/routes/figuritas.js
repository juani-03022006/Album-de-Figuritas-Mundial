import { Router } from 'express';
import createFiguritasController from '../controllers/FiguritasController.js';
import FiguritasService from '../services/FiguritasService.js';
import FiguritasRepository from '../repositories/FiguritasRepository.js';
import routerJugadores from './jugadores.js';
import routerEspeciales from './especiales.js';


const figuritasRepository = new FiguritasRepository();
const figuritasService = new FiguritasService(figuritasRepository);
const figuritasController = createFiguritasController(figuritasService);

const routerFiguritas = new Router();

routerFiguritas.use('/jugadores', routerJugadores);
routerFiguritas.use('/especiales', routerEspeciales);

routerFiguritas.delete('/:id', figuritasController.deleteFigurita);

export default routerFiguritas;
