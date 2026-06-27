import './PosicionesSection.css';
import { useState } from 'react';
import { useAlbumContext } from '../context/SeleccionesContext.jsx';


function PosicionesSection() {
    const { posiciones } = useAlbumContext();
	const [nombre, setNombre] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!nombre.trim()) { setError("Ingresá un nombre."); return; }
		agregarPosicion({ nombre });
		setNombre("");
		setError("");
	};

	return (
		<div>
			<h2 className="fw-bold mb-1">Posiciones</h2>
			<p className="text-muted mb-4">Gestioná las posiciones de los jugadores</p>

			<div className="row g-4 row-eq-height">
				<div className="col-md-4">
					<div className="card border-0 shadow-sm">
						<div className="card-header bg-white fw-bold py-3">➕ Añadir Posición</div>
						<div className="card-body">
							{error && <div className="alert alert-danger py-2">{error}</div>}
							<form onSubmit={handleSubmit}>
								<div className="mb-3">
									<label className="form-label">Nombre de la posición</label>
									<input
										className="form-control"
										placeholder="Ej: Portero"
										value={nombre}
										onChange={(e) => setNombre(e.target.value)}
									/>
								</div>
								<button type="submit" className="btn btn-primary w-100">Agregar</button>
							</form>
						</div>
					</div>
				</div>

				<div className="col-md-8">
					<div className="card border-0 shadow-sm">
						<div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
							<span className="fw-bold">Lista de Posiciones</span>
							<span className="badge bg-primary rounded-pill">{posiciones.length}</span>
						</div>
						<div className="table-responsive">
							<table className="table table-hover align-middle mb-0">
								<thead className="table-light">
									<tr><th>#</th><th>Posición</th><th>Acciones</th></tr>
								</thead>
								<tbody>
									{posiciones.map((p, i) => (
										<tr key={p.idPosicion}>
											<td className="text-muted">{i + 1}</td>
											<td className="fw-semibold">{p.descripcion}</td>
											<td>
												<button
													className="btn btn-sm btn-outline-primary"
													onClick={() => {}}
												>
													Eliminar
												</button>
											</td>
										</tr>
									))}
									{posiciones.length === 0 && (
										<tr>
											<td colSpan={3} className="text-center text-muted py-4">No hay posiciones aún.</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PosicionesSection;
