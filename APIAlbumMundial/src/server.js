import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createApp } from './app.js';
import * as models from './repositories/models/index.js';
import { seedDatabase } from './seeders/seedDatabase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const databaseDir = path.join(__dirname, '../DB');

async function bootstrap() {
  if (!fs.existsSync(databaseDir)) {
    fs.mkdirSync(databaseDir, { recursive: true });
  }

  await models.sequelize.sync({ force: true });
  await seedDatabase(models);

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
