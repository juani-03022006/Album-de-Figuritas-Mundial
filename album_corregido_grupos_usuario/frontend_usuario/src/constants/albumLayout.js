/** Grilla 4x4 por página. Cada celda referencia posición local (1-29) dentro de cada selección. */
export const LEFT_PAGE_ROWS = [
  [{ type: 'title' }, { nro: 1 }, { nro: 2, colSpan: 2 }],
  [{ nro: 3 }, { type: 'empty' }, { nro: 4 }, { nro: 5 }],
  [{ nro: 6 }, { nro: 7 }, { nro: 8 }, { nro: 9 }],
  [{ nro: 10 }, { nro: 11 }, { nro: 12 }, { nro: 13 }],
];

export const RIGHT_PAGE_ROWS = [
  [14, 15, 16, 17],
  [18, 19, 20, 21],
  [22, 23, 24, 25],
  [26, 27, 28, 29],
];

export const TOTAL_FIGURITAS = 29;
export const TOTAL_JUGADORES = 26;
