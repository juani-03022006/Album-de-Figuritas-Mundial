import { createApp } from './app.js';


const app = createApp()
const PORT = process.env.PORT || 4100;

app.listen(PORT, () => {
    console.log(`App escuchando en puerto ${PORT}`);
});