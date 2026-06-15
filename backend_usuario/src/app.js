import express from 'express';
import cors from 'cors';
import { createAlbumRoutes } from './routes/albumRoutes.js';

export function createApp(models) {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/', (_req, res) => {
    res.json({ message: 'API Album de Figuritas Mundial 2026' });
  });

  app.use('/apiUsuario', createAlbumRoutes(models));

  return app;
}
