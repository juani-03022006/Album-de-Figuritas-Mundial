import { Router } from 'express';
import routerJugadores from './jugadores.js';
import routerEspeciales from './especiales.js';


const routerFiguritas = new Router();

routerFiguritas.use('/jugadores', routerJugadores);
routerFiguritas.use('/especiales', routerEspeciales);

export default routerFiguritas;
