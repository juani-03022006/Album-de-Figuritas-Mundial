export function ordenarPlantelPorPosiciones(unPlantel) {
    const arqueros = [...unPlantel].filter(jugador => jugador.posicionFifa === 'Arquero');
    const defensores = [...unPlantel].filter(jugador => jugador.posicionFifa === 'Defensor');
    const mediocampistas = [...unPlantel].filter(jugador => jugador.posicionFifa === 'Mediocampista');
    const delanteros = [...unPlantel].filter(jugador => jugador.posicionFifa === 'Delantero');

    return [...arqueros, ...defensores, ...mediocampistas, ...delanteros];
};
