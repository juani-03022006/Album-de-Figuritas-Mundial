import 'bootstrap/dist/css/bootstrap.min.css';
import { BotonEliminarSeleccion } from './BotonEliminarSeleccion';


export function Seleccion(seleccion) {
    return (
        <>
            <td><img src={seleccion.seleccion.urlBandera} height='30px' /></td>
            <td className="fw-semibold">{seleccion.seleccion.nombrePais}</td>
            <td><span className="badge bg-secondary">Grupo {seleccion.seleccion.grupo}</span></td>
            <td>
                <BotonEliminarSeleccion idSeleccion={seleccion.id} />
            </td>
        </>
    );
};