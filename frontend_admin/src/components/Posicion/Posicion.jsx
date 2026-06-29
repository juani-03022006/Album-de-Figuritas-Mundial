export function Posicion({ posicion, onEditarClick }) {
    return (
        <>
            <td className="text-muted">{posicion.idPosicion}</td>
            <td className="fw-semibold">{posicion.descripcion}</td>
            <td>
                <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onEditarClick(posicion)}
                >
                    Modificar
                </button>
            </td>
        </>
    );
};
