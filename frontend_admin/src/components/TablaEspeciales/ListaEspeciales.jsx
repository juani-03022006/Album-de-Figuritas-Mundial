export function ListaEspeciales({ cantidadEspeciales }) {
    return (
        <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
            <span className="fw-bold">Lista de Especiales</span>
            <span className="badge bg-primary rounded-pill">{cantidadEspeciales}</span>
        </div>
    );
};
