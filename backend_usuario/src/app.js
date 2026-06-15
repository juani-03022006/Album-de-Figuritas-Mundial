import express from 'express';
import cors from 'cors';

export function createApp(models) {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/', (_req, res) => {
    res.json({ message: 'API Album de Figuritas Mundial 2026' });
  });

  return app;
}
