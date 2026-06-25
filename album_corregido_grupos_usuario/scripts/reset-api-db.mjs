import fs from 'node:fs';
import path from 'node:path';

const dbPath = path.join('APIAlbumMundial', 'src', 'DB', 'figuritas.db');

if (fs.existsSync(dbPath)) {
  fs.rmSync(dbPath, { force: true });
  console.log(`[reset] Base eliminada: ${dbPath}`);
} else {
  console.log(`[reset] No existe base para eliminar: ${dbPath}`);
}

console.log('[reset] Al volver a levantar la API, el seeder va a poblar la base si está vacía.');
