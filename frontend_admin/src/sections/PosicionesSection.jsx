import './PosicionesSection.css';
import { useState } from 'react';
import { useAlbumContext } from '../context/SeleccionesContext.jsx';
import { TituloSubtitulo } from '../components/TituloSubtitulo/TituloSubtitulo.jsx';
import { TablaPosiciones } from '../components/TablaPosiciones/TablaPosiciones.jsx';


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
            <TituloSubtitulo titulo={'Posiciones'} subtitulo={'Gestioná las posiciones de los jugadores'} />

			<div className="row g-4 row-eq-height">
				<div className="col-md-4">
                    {/* Deberia haber un componente de form aca, no el form */}
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
						<TablaPosiciones />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PosicionesSection;
