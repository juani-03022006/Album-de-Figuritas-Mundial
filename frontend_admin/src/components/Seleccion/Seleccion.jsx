import { ColoresSeleccion } from '../ColoresSeleccion/ColoresSeleccion';


export function Seleccion({ seleccion, onEditarClick }) {
    return (
        <>
            <td>
                <img 
                    src={seleccion.urlBandera}
                    style={{ height: '30px', width: 'auto', borderRadius: '4px' }}
                    />
            </td>
            <td className="fw-semibold">{seleccion.nombreSeleccion}</td>
            <td className="fw-semibold">{seleccion.nombrePais}</td>
            <ColoresSeleccion seleccion={seleccion} />
            <td>
                {seleccion.nroDesde} / {seleccion.nroHasta}
            </td>
            <td><span className="badge bg-secondary">Grupo {seleccion.grupo}</span></td>
            <td>
                <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onEditarClick(seleccion)}
                >
                    Modificar
                </button>
            </td>
        </>
    );
};