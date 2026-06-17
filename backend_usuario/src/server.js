import 'dotenv/config';
import { createApp } from './app.js';
import { createAlbumRoutes } from './routes/albumRoutes.js';
import { createAuthRoutes } from './routes/authRoutes.js';

const app = createApp();

app.use('/', createAuthRoutes());
app.use('/apiUsuario', createAlbumRoutes());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend Usuario escuchando en http://localhost:${PORT}`);
});
