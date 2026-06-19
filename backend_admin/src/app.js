import express from 'express';
import cors from 'cors';
import { ALLOWED_ORIGINS } from './allowedOrigins.js';
import routerSelecciones from './routes/selecciones.js';
import routerPosiciones from './routes/posiciones.js';
import routerFiguritas from './routes/figuritas.js';
import routerPopulate from './routes/populate.js';


export function createApp() {
    const app = express();

    app.use(express.json());
    app.use(cors({
        origin: ALLOWED_ORIGINS
    }));

    app.use('/selecciones', routerSelecciones);
    app.use('/posiciones', routerPosiciones);
    app.use('/figuritas', routerFiguritas);
    app.use('/populate', routerPopulate);

    return app;
};