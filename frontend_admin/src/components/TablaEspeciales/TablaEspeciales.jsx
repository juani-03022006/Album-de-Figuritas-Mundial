import { useAlbumContext } from '../../context/AlbumContext.jsx';
import { Especial } from '../Especial/Especial.jsx';
import { ListaEspeciales } from './ListaEspeciales.jsx';


export function TablaEspeciales() {
    const { especiales, selecciones } = useAlbumContext();
    const hayEspeciales = especiales.length !== 0;
    const tableHead = ['#', 'Tipo', 'Nombre', 'Seleccion', 'Acciones'];

    const tipoLabel = { escudo: "Escudo", tecnico: "Técnico", foto_seleccion: "Formacion" };
    const tipoColor = { escudo: "bg-warning text-dark", tecnico: "bg-info text-dark", foto_seleccion: "bg-success" };

    const getSeleccion = (id) => selecciones.find((seleccion) => seleccion.idSeleccion === id);


    return (
        <>
            <ListaEspeciales cantidadEspeciales={especiales.length} />
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    {hayEspeciales ? (
                        <>
                            <thead className="table-light">
                                <tr>{tableHead.map((tableData) => <td key={tableData}>{tableData}</td>)}</tr>
                            </thead>
                            <tbody>
                                {especiales.map((especial) => (
                                    <tr key={especial.id}>
                                        <Especial
                                            tipoColor={tipoColor[especial.figurita.tipo]}
                                            tipoLabel={tipoLabel[especial.figurita.tipo]}
                                            seleccion={getSeleccion(especial.figurita.idSeleccion)}
                                            especial={especial}
                                        />
                                    </tr>
                                ))}
                            </tbody>
                        </>
                    ) : (
                        <td colSpan={3} className="text-center text-muted py-4">No hay figuritas especiales registradas.</td>
                    )}
                </table>
            </div>
        </>
    );
};
