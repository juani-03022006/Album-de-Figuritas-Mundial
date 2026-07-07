import { useAlbumContext } from '../../context/AlbumContext.jsx';


export function TablaSeleccionesDashboard() {
    const { selecciones } = useAlbumContext();

    return (
        <div class="border rounded-3 overflow-hidden">
            <table className="table table-hover align-middle position-relative mb-0">
                <thead className="table-light sticky-top">
                    <tr>
                        <th>Bandera</th>
                        <th>Selección</th>
                        <th>País</th>
                        <th className="text-center">Grupo</th>
                    </tr>
                </thead>
                <tbody>
                    {selecciones.map((seleccion, index) => (
                        <tr key={index}>
                            <td style={{ width: '60px' }}>
                                <img
                                    src={seleccion.urlBandera}
                                    alt={`Bandera de ${seleccion.nombrePais}`}
                                    style={{ height: '30px', width: 'auto', borderRadius: '4px' }}
                                />
                            </td>
                            <td className="fw-semibold">{seleccion.nombreSeleccion}</td>
                            <td>{seleccion.nombrePais}</td>
                            <td className="text-center">
                                <span className="badge bg-primary rounded-pill">
                                    Grupo {seleccion.grupo}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
