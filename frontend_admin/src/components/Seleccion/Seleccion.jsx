import 'bootstrap/dist/css/bootstrap.min.css';
import { BotonEliminarSeleccion } from './BotonEliminarSeleccion';
import { ColoresSeleccion } from '../ColoresSeleccion/ColoresSeleccion';


export function Seleccion({ seleccion }) {
    return (
        <>
            <td><img src={seleccion.urlBandera} height='30px' /></td>
            <td className="fw-semibold">{seleccion.nombreSeleccion}</td>
            <td className="fw-semibold">{seleccion.nombrePais}</td>
            <ColoresSeleccion seleccion={seleccion} />
            <td><span className="badge bg-secondary">Grupo {seleccion.grupo}</span></td>
            <td>
                <BotonEliminarSeleccion idSeleccion={seleccion.id} />
            </td>
        </>
    );
};