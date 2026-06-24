import express from 'express';
import cors from 'cors';
import { FRONTEND_URL } from './config/keycloak.js';

export function createApp() {
  const app = express();

  app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/', (_req, res) => {
    res.json({ message: 'Backend Usuario - Album de Figuritas Mundial 2026' });
  });

  return app;
}
