export function ListaPosiciones({ cantidadPosiciones }) {
    return (
        <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
            <span className="fw-bold">Lista de Posiciones</span>
            <span className="badge bg-primary rounded-pill">{cantidadPosiciones}</span>
        </div>
    );
};
