import { Router } from 'express';
import createPopulateController from '../controllers/PopulateController.js';
import PopulateService from '../services/PopulateService.js';
import PosicionesService from '../services/PosicionesService.js';
import SeleccionesService from '../services/SeleccionesService.js';
import JugadoresService from '../services/JugadoresService.js';
import EspecialesService from '../services/EspecialesService.js';
import PosicionesAPI from '../apis/PosicionesAPI.js';
import SeleccionesAPI from '../apis/SeleccionesAPI.js';
import FiguritasAPI from '../apis/FiguritasAPI.js';


const urlApi = 'http://localhost:3100'

const posicionesApi = new PosicionesAPI(urlApi);
const seleccionesApi = new SeleccionesAPI(urlApi);
const figuritasApi = new FiguritasAPI(urlApi);

const populateService = new PopulateService(
    new PosicionesService(posicionesApi), 
    new SeleccionesService(seleccionesApi),
    new JugadoresService(figuritasApi),
    new EspecialesService(figuritasApi),
);
const populateController = createPopulateController(populateService);

const routerPopulate = new Router();

routerPopulate.post('', populateController.populateDB);

export default routerPopulate;
