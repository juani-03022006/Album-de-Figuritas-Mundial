import { useSelecciones } from '../hooks/useSelecciones.js';
import { useState } from 'react';
import { Seleccion } from '../components/Seleccion/Seleccion.jsx';


function SeleccionesSection() {
    const { selecciones, loading, addSeleccion, deleteSeleccion } = useSelecciones();
    const [form, setForm] = useState({ nombre: "", bandera: "", grupo: "" });
    const [error, setError] = useState("");

    const grupos = ["A", "B", "C", "D", "E", "F", "G", "H"];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.nombre.trim() || !form.bandera.trim() || !form.grupo) {
            setError("Completá todos los campos.");
            return;
        }
        addSeleccion(form);
        setForm({ nombre: "", bandera: "", grupo: "" });
        setError("");
    };

    return (
        <div>
            <h2 className="fw-bold mb-1">Selecciones</h2>
            <p className="text-muted mb-4">Gestioná los equipos del torneo</p>

            <div className="row g-4">
                {/* Form */}
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-white fw-bold py-3">➕ Añadir Selección</div>
                        <div className="card-body">
                            {error && <div className="alert alert-danger py-2">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">País</label>
                                    <input
                                        className="form-control"
                                        placeholder="Ej: Argentina"
                                        value={form.nombre}
                                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Bandera (emoji)</label>
                                    <input
                                        className="form-control"
                                        placeholder="Ej: 🇦🇷"
                                        value={form.bandera}
                                        onChange={(e) => setForm({ ...form, bandera: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Grupo</label>
                                    <select
                                        className="form-select"
                                        value={form.grupo}
                                        onChange={(e) => setForm({ ...form, grupo: e.target.value })}
                                    >
                                        <option value="">Seleccioná un grupo</option>
                                        {grupos.map((g) => (
                                            <option key={g} value={g}>Grupo {g}</option>
                                        ))}
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Agregar</button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* List */}
                <div className="col-md-8">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
                            <span className="fw-bold">Lista de Selecciones</span>
                            <span className="badge bg-primary rounded-pill">{selecciones.length}</span>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Bandera</th>
                                        <th>País</th>
                                        <th>Grupo</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selecciones.map((seleccion) => (
                                        <tr key={seleccion.idSeleccion}>
                                            <Seleccion seleccion={seleccion} />
                                        </tr>
                                    ))}
                                    {selecciones.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="text-center text-muted py-4">No hay selecciones aún.</td>
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

export default SeleccionesSection;
