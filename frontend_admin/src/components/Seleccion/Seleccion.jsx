import 'bootstrap/dist/css/bootstrap.min.css';
import { ColoresSeleccion } from '../ColoresSeleccion/ColoresSeleccion';


export function Seleccion({ seleccion, onEditarClick }) {
    return (
        <>
            <td>
                <img src={seleccion.urlBandera} height='30px' />
                {/* <input type="hidden" name="idSeleccion" value={seleccion.idSeleccion} /> */}
            </td>
            <td className="fw-semibold">{seleccion.nombreSeleccion}</td>
            <td className="fw-semibold">{seleccion.nombrePais}</td>
            <ColoresSeleccion seleccion={seleccion} />
            <td>
                {seleccion.nroDesde} / {seleccion.nroHasta}
                {/* <input type="hidden" name="nroDesde" value={seleccion.nroDesde} />
                <input type="hidden" name="nroHasta" value={seleccion.nroHasta} /> */}
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