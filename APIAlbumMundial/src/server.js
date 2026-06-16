import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createApp } from './app.js';
import * as models from './repositories/models/index.js';
import { seedDatabase } from './seeders/seedDatabase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const databaseDir = path.join(__dirname, '../DB');

const RESET_DATABASE = process.env.DB_RESET === 'true';
const SYNC_ALTER = process.env.DB_SYNC_ALTER === 'true';

async function syncDatabase() {
  if (RESET_DATABASE) {
    console.warn('[db] DB_RESET=true: se borra y recrea la base de datos.');
    await models.sequelize.sync({ force: true });
    return;
  }

  await models.sequelize.sync(SYNC_ALTER ? { alter: true } : undefined);
}

async function seedDatabaseIfNeeded() {
  const seleccionesCount = await models.Seleccion.count();

  if (seleccionesCount > 0) {
    console.log(`[seed] Base existente detectada: ${seleccionesCount} selecciones. No se ejecuta el seeder.`);
    return;
  }

  await seedDatabase(models);
}

async function bootstrap() {
  if (!fs.existsSync(databaseDir)) {
    fs.mkdirSync(databaseDir, { recursive: true });
  }

  await syncDatabase();
  await seedDatabaseIfNeeded();

  const app = createApp(models);
  const PORT = process.env.PORT || 3100;

  app.listen(PORT, () => {
    console.log(`API Album Mundial escuchando en http://localhost:${PORT}`);
  });
}

bootstrap().catch((error) => {
  console.error('No se pudo iniciar la API:', error);
  process.exit(1);
});
