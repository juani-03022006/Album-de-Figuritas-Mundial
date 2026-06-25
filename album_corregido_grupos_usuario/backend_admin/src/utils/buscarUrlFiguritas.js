import { THUMBNAIL_SIZES } from '../constants/imageConsts.js';

function compact(value) {
    return String(value ?? '').replace(/\s+/g, ' ').trim();
};

function buscarUrlBing(query, { width, height }) {
    const params = new URLSearchParams({
        q: compact(query),
        w: String(width),
        h: String(height),
        c: '7',
        rs: '1',
        p: '0',
        o: '5',
        pid: '1.7',
    });

    return `https://tse1.mm.bing.net/th?${params.toString()}`;
};

export async function obtenerUrlEscudo(nombrePais) {
    const query = `${nombrePais} national football team crest badge logo png`;
    return buscarUrlBing(query, THUMBNAIL_SIZES.portrait);
};

export async function obtenerUrlFormacion(nombrePais) {
    const query = `${nombrePais} national football team squad photo players png`;
    return buscarUrlBing(query, THUMBNAIL_SIZES.landscape);
};

export async function obtenerUrlTecnico(nombrePais, nombreTecnico) {
    const query = `${nombreTecnico} ${nombrePais} national football team coach portrait`;
    return buscarUrlBing(query, THUMBNAIL_SIZES.portrait);
};

export async function obtenerUrlJugador(nombrePais, nombreJugador) {
    const query = `${nombreJugador} ${nombrePais} national football team player portrait`;
    return buscarUrlBing(query, THUMBNAIL_SIZES.portrait);
};
