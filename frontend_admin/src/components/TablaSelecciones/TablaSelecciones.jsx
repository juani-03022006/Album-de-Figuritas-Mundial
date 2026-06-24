import { Seleccion } from '../Seleccion/Seleccion.jsx';
import { ListaSelecciones } from '../ListaSelecciones/ListaSelecciones.jsx';


export function TablaSelecciones({ selecciones }) {
    const haySelecciones = selecciones.length !== 0;
    const tableHead = ['Bandera', 'Seleccion', 'País', 'Colores', 'Grupo', 'Acciones']

    return (
        <>
            <ListaSelecciones cantidadSelecciones={selecciones.length} />
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    {haySelecciones ? (
                        <>
                            <thead className="table-light">
                                <tr>{tableHead.map((tableData) => <td>{tableData}</td>)}</tr>
                            </thead>
                            <tbody>
                                {selecciones.map((seleccion) => (
                                    <tr key={seleccion.idSeleccion}>
                                        <Seleccion seleccion={seleccion} />
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