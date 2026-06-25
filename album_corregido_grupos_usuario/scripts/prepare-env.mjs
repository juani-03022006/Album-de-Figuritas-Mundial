import fs from 'node:fs';
import path from 'node:path';

const copies = [
  ['backend_usuario/.env.example', 'backend_usuario/.env'],
  ['frontend_usuario/.env.example', 'frontend_usuario/.env'],
];

for (const [examplePath, envPath] of copies) {
  if (!fs.existsSync(examplePath)) {
    console.warn(`[setup] No existe ${examplePath}. Se omite.`);
    continue;
  }

  if (fs.existsSync(envPath)) {
    console.log(`[setup] ${envPath} ya existe. No se sobrescribe.`);
    continue;
  }

  fs.copyFileSync(examplePath, envPath);
  console.log(`[setup] Creado ${envPath} desde ${examplePath}.`);
}

const apiDbDir = path.join('APIAlbumMundial', 'src', 'DB');
if (!fs.existsSync(apiDbDir)) {
  fs.mkdirSync(apiDbDir, { recursive: true });
  console.log(`[setup] Creada carpeta ${apiDbDir}.`);
}
