import { createApp } from './app.js';
import fs from 'fs';


const app = createApp()
const PORT = process.env.PORT || 3100;

app.listen(PORT, () => {
    console.log(`App escuchando en puerto ${PORT}`);
});