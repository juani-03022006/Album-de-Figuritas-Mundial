export function TablaEspecialesDashboard({ especialesSeleccion }) {
    return (
        <div className='border rounded-3 overflow-hidden'>
            <table className="table table-hover align-middle table-sm border">
                <thead className="table-light sticky-top">
                    <tr>
                        <th className="text-center" style={{ width: '90px' }}>#</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    {especialesSeleccion?.map((especial, index) => (
                        <tr key={especial.id || index}>
                            <td className="text-center">
                                <span className="badge bg-dark fw-normal">
                                    #{especial.figurita?.nroFigurita}
                                </span>
                            </td>
                            <td className="fw-semibold text-secondary">
                                {especial.nombre}
                            </td>
                        </tr>
                    ))}
                    {(!especialesSeleccion || especialesSeleccion.length === 0) && (
                        <tr>
                            <td colSpan="2" className="text-center text-muted small py-3">
                                No hay especiales cargadas
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
