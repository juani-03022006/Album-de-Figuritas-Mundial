export async function calcularDesdeHasta(equiposEnGrupo, nroEmpiezaGrupo, figusPorSeleccion) {
    if (equiposEnGrupo === 0) {
        const nroDesde = nroEmpiezaGrupo;
        // Es con los del primer grupo
        
        const nroHasta = nroEmpiezaGrupo === 1 ? figusPorSeleccion : nroDesde + figusPorSeleccion;

        return { nroDesde, nroHasta };
    };

    const nroDesde = nroEmpiezaGrupo + ((figusPorSeleccion + 1) * equiposEnGrupo);
    const nroHasta = nroDesde + figusPorSeleccion;

    return { nroDesde, nroHasta };
};
