function calcularDesdeHastaPrimerGrupo(equiposEnGrupo, nroEmpiezaGrupo, figusPorSeleccion) {
    if (equiposEnGrupo === 0) {
        const nroDesde = 1;
        const nroHasta = nroDesde + figusPorSeleccion - 1;

        return { nroDesde, nroHasta };
    };

    const nroDesde = nroEmpiezaGrupo + (figusPorSeleccion * equiposEnGrupo);
    const nroHasta = nroDesde + figusPorSeleccion - 1;

    return { nroDesde, nroHasta };
};

function calcularDesdeHastaOtrosGrupos(equiposEnGrupo, nroEmpiezaGrupo, figusPorSeleccion) {
    const nroDesde = nroEmpiezaGrupo + (figusPorSeleccion * equiposEnGrupo);
    const nroHasta = nroDesde + figusPorSeleccion - 1;

    return { nroDesde, nroHasta };
};

export async function calcularDesdeHasta(equiposEnGrupo, nroEmpiezaGrupo, figusPorSeleccion) {
    if (nroEmpiezaGrupo === 1) {
        const { nroDesde, nroHasta } = calcularDesdeHastaPrimerGrupo(equiposEnGrupo, nroEmpiezaGrupo, figusPorSeleccion);
        return { nroDesde, nroHasta };
    };

    const { nroDesde, nroHasta } = calcularDesdeHastaOtrosGrupos(equiposEnGrupo, nroEmpiezaGrupo, figusPorSeleccion);
    return { nroDesde, nroHasta };
};
