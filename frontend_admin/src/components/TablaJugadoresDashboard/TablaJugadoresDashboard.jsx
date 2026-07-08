export function TablaJugadoresDashboard({ jugadoresSeleccion }) {
    return (
        <div className="border rounded-3 overflow-hidden">
            <table className="table table-hover align-middle table-sm border mb-0">
                <thead className="table-light sticky-top">
                    <tr>
                        <th className="text-center" style={{ width: '90px' }}>#</th>
                        <th>Nombre Completo</th>
                    </tr>
                </thead>
                <tbody>
                    {jugadoresSeleccion?.map((jugador, index) => (
                        <tr key={jugador.id || index}>
                            <td className="text-center">
                                <span className="badge bg-primary fw-normal">
                                    #{jugador.figurita?.nroFigurita}
                                </span>
                            </td>
                            <td className="fw-semibold text-dark">
                                {jugador.nombre} {jugador.apellido}
                            </td>
                        </tr>
                    ))}
                    {(!jugadoresSeleccion || jugadoresSeleccion.length === 0) && (
                        <tr>
                            <td colSpan="2" className="text-center text-muted small py-3">
                                No hay jugadores cargados
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
