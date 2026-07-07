import { useAlbumContext } from '../../context/AlbumContext.jsx';


export function TablaPosicionesDashboard() {
    const { posiciones } = useAlbumContext();

    return (
        <div class="border rounded-3 overflow-hidden">
            <table className="table table-hover align-middle mb-0">
                <thead className="table-light sticky-top">
                    <tr>
                        <th>Posición</th>
                    </tr>
                </thead>
                <tbody>
                    {posiciones.map((posicion, index) => (
                        <tr key={index}>
                            <td className="fw-semibold text-dark">
                                {posicion.descripcion}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
