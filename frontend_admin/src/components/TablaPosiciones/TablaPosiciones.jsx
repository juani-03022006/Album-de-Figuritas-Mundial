import { useAlbumContext } from '../../context/SeleccionesContext.jsx';
import { Posicion } from '../Posicion/Posicion.jsx';
import { ListaPosiciones } from './ListaPosiciones.jsx';


export function TablaPosiciones() {
    const { posiciones } = useAlbumContext();
    const hayPosiciones = posiciones.length !== 0;
    const tableHead = ['#', 'Descripcion', 'Acciones']

    return (
        <>
            <ListaPosiciones cantidadPosiciones={posiciones.length} />
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    {hayPosiciones ? (
                        <>
                            <thead className="table-light">
                                <tr>{tableHead.map((tableData) => <td key={tableData}>{tableData}</td>)}</tr>
                            </thead>
                            <tbody>
                                {posiciones.map((posicion) => (
                                    <tr key={posicion.idPosicion}>
                                        <Posicion posicion={posicion} />
                                    </tr>
                                ))}
                            </tbody>
                        </>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan={3} className="text-center text-muted py-4">No hay posiciones aún.</td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </>
    );
};
