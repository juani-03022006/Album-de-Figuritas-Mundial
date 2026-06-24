export function ColoresSeleccion({ seleccion }) {
    const { colorPrincipal, colorAcento1, colorAcento2, colorTitulo } = seleccion || {};
    const listaColores = [colorPrincipal, colorAcento1, colorAcento2, colorTitulo];

    return (
        <td className="align-middle text-center p-3">
            <div
                className="d-flex justify-content-center align-items-center gap-1 rounded-pill p-2"
                style={{
                    backgroundColor: '#dadada',
                    border: '1px solid #ddd',
                    width: 'max-content',
                    margin: '0 auto'
                }}
            >
                {listaColores.map((color, index) => (
                    <div
                        key={index}
                        className="rounded"
                        style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: color || '#8d8d8d',
                        }}
                    />
                ))}
            </div>
        </td>
    );
};
