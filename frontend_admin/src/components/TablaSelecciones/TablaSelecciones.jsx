import { Seleccion } from '../Seleccion/Seleccion.jsx';
import { ListaSelecciones } from '../ListaSelecciones/ListaSelecciones.jsx';
import { useAlbumContext } from '../../context/SeleccionesContext.jsx';


export function TablaSelecciones({ onEditarClick }) {
    const { selecciones } = useAlbumContext();
    const haySelecciones = selecciones.length !== 0;
    const tableHead = ['Bandera', 'Seleccion', 'País', 'Colores', 'Desde/Hasta', 'Grupo', 'Acciones']

    return (
        <>
            <ListaSelecciones cantidadSelecciones={selecciones.length} />
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    {haySelecciones ? (
                        <>
                            <thead className="table-light">
                                <tr>{tableHead.map((tableData) => <td key={tableData}>{tableData}</td>)}</tr>
                            </thead>
                            <tbody>
                                {selecciones.map((seleccion) => (
                                    <tr key={seleccion.idSeleccion}>
                                        <Seleccion seleccion={seleccion} onEditarClick={onEditarClick}/>
                                    </tr>
                                ))}
                            </tbody>
                        </>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan={4} className="text-center text-muted py-4">No hay selecciones aún.</td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </>
    );
};