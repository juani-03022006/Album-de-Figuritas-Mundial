import { createApp } from './app.js';


const app = createApp();
const PORT = process.env.PORT || 3100;

app.listen(PORT, () => {
    console.log(`API Album Mundial escuchando en http://localhost:${PORT}`);
});
