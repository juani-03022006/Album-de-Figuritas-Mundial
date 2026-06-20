function calcularDesdeHastaPrimerGrupo(equiposEnGrupo, nroEmpiezaGrupo, figusPorSeleccion) {
    if (equiposEnGrupo === 0) {
        const nroDesde = nroEmpiezaGrupo;
        const nroHasta = nroEmpiezaGrupo + figusPorSeleccion - 1;

        return { nroDesde, nroHasta };
    };

    const nroDesde = nroEmpiezaGrupo + ((figusPorSeleccion + 1) * equiposEnGrupo) - 1;
    const nroHasta = nroDesde + figusPorSeleccion;

    return { nroDesde, nroHasta };
};

function calcularDesdeHastaOtrosGrupos(equiposEnGrupo, nroEmpiezaGrupo, figusPorSeleccion) {
    const nroDesde = nroEmpiezaGrupo + ((figusPorSeleccion + 1) * equiposEnGrupo);
    const nroHasta = nroDesde + figusPorSeleccion;

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
