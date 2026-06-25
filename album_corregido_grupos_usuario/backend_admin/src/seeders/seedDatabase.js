import FiguritasAPI from '../apis/FiguritasAPI.js';
import PosicionesAPI from '../apis/PosicionesAPI.js';
import SeleccionesAPI from '../apis/SeleccionesAPI.js';
import EspecialesService from '../services/EspecialesService.js';
import JugadoresService from '../services/JugadoresService.js';
import PopulateService from '../services/PopulateService.js';
import PosicionesService from '../services/PosicionesService.js';
import SeleccionesService from '../services/SeleccionesService.js';

const urlApi = process.env.API_ALBUM_URL ?? 'http://localhost:3100';
const posicionesApi = new PosicionesAPI(urlApi);
const seleccionesApi = new SeleccionesAPI(urlApi);
const figuritasApi = new FiguritasAPI(urlApi);

const populateService = new PopulateService(
    new PosicionesService(posicionesApi),
    new SeleccionesService(seleccionesApi),
    new JugadoresService(figuritasApi),
    new EspecialesService(figuritasApi)
);

try {
    console.log(`Populando base desde backend_admin contra ${urlApi}...`);
    await populateService.populateDB();
    console.log('Base populada correctamente.');
} catch (error) {
    console.error('Error al popular la base:', error.message);
    process.exitCode = 1;
}
