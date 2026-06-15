import express from 'express';
import cors from 'cors';
import { ALLOWED_ORIGINS } from './allowedOrigins.js';
import routerSelecciones from './routes/selecciones.js';
import routerPosiciones from './routes/posiciones.js';
import routerJugadores from './routes/jugadores.js';
import routerEspeciales from './routes/especiales.js';


export function createApp() {
    const app = express();

    app.use(express.json());
    app.use(cors({
        origin: ALLOWED_ORIGINS
    }));

    app.use('/selecciones', routerSelecciones);
    app.use('/posiciones', routerPosiciones);
    app.use('/jugadores', routerJugadores);
    app.use('/especiales', routerEspeciales);

    return app;
};
