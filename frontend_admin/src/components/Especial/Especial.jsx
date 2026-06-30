export function Especial({ tipoColor, tipoLabel, seleccion, especial }) {
    return (
        <>
            <td className="text-muted">{especial.id}</td>
            <td>
                <span className={`badge ${tipoColor}`}>{tipoLabel}</span>
            </td>
            <td className="fw-semibold">
                {especial.nombre}
            </td>
            <td>
                <img className='me-2' src={seleccion.urlBandera} height='30px' />
                {seleccion.nombrePais}
            </td>
            <td>
                <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => { }}
                >
                    Modificar
                </button>
            </td>
        </>
    );
};
