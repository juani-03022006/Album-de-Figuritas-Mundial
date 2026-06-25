export async function calcularDesdeHasta(equiposEnGrupo, nroEmpiezaGrupo, figusPorSeleccion) {
    const nroDesde = nroEmpiezaGrupo + (figusPorSeleccion * equiposEnGrupo);
    const nroHasta = nroDesde + figusPorSeleccion - 1;

    return { nroDesde, nroHasta };
};
