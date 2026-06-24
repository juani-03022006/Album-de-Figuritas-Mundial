import { useSelecciones } from '../../hooks/useSelecciones.js';


export function BotonEliminarSeleccion({ idSeleccion }) {
    const { deleteSeleccion } = useSelecciones();

    return (
        <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => deleteSeleccion(idSeleccion)}
        >
            Modificar
        </button>
    );
};
