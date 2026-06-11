import express from 'express';
import cors from 'cors';
import { ALLOWED_ORIGINS } from './allowedOrigins.js';


export function createApp() {
    const app = express();

    app.use(express.json());
    app.use(cors({
        origin: ALLOWED_ORIGINS
    }));

    app.get('/selecciones', (req, res) => {res.send('Endpoint GET de selecciones.')});

    return app;
};
