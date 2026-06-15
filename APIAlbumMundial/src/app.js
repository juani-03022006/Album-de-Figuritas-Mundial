import express from 'express';
import cors from 'cors';
import { ALLOWED_ORIGINS } from './allowedOrigins.js';
import { createAlbumRoutes } from './routes/album.js';

export function createApp(models) {
  const app = express();

  app.use(express.json());
  app.use(cors({
    origin: ALLOWED_ORIGINS,
  }));

  app.get('/', (_req, res) => {
    res.json({ message: 'API Album Mundial' });
  });

  app.use('/album', createAlbumRoutes(models));

  return app;
}
