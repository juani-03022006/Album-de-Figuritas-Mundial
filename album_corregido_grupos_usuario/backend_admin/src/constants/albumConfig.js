export const FIGUS_POR_SELECCION = 29;
export const EQUIPOS_POR_GRUPO = 4;

const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

export const NRO_EMPIEZA_GRUPO = Object.fromEntries(
  GROUPS.map((grupo, index) => [
    grupo,
    1 + index * EQUIPOS_POR_GRUPO * FIGUS_POR_SELECCION,
  ])
);

export const GRUPOS_ORDENADOS = GROUPS;
