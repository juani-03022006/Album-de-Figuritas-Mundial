import { useState } from 'react';
import { useAlbumContext } from '../context/AlbumContext.jsx';
import { TituloSubtitulo } from '../components/TituloSubtitulo/TituloSubtitulo.jsx';
import { TablaEspeciales } from '../components/TablaEspeciales/TablaEspeciales.jsx';
import MiTablaGrid from './FiguritasSection.jsx';


function EspecialesSection() {
    const { especiales, selecciones } = useAlbumContext();
    const [form, setForm] = useState({ tipo: "escudo", seleccionId: "", nombre: "", formacion: "" });
    const [error, setError] = useState("");

    const getSeleccion = (id) => selecciones.find((s) => s.id === id);
    const agregarEspecial = () => {return}

    const tipoLabel = { escudo: "Escudo", tecnico: "Técnico", formacion: "Formación" };
    const tipoColor = { escudo: "bg-warning text-dark", tecnico: "bg-info text-dark", formacion: "bg-success" };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.seleccionId) { setError("Seleccioná un equipo."); return; }
        if (form.tipo === "tecnico" && !form.nombre.trim()) { setError("Ingresá el nombre del técnico."); return; }
        if (form.tipo === "formacion" && !form.formacion.trim()) { setError("Ingresá la formación."); return; }
        agregarEspecial({
            tipo: form.tipo,
            seleccionId: parseInt(form.seleccionId),
            nombre: form.nombre,
            formacion: form.formacion,
        });
        setForm({ tipo: "escudo", seleccionId: "", nombre: "", formacion: "" });
        setError("");
    };

    return (
        <div>
            <TituloSubtitulo titulo={'Figuritas Especiales'} subtitulo={'Escudos, técnicos y formaciones'} />

            <div className="row g-4">
                {/* <div className="col-md-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-white fw-bold py-3">➕ Añadir Especial</div>
                        <div className="card-body">
                            {error && <div className="alert alert-danger py-2">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Tipo</label>
                                    <select
                                        className="form-select"
                                        value={form.tipo}
                                        onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                                    >
                                        <option value="escudo">🛡️ Escudo</option>
                                        <option value="tecnico">🧑‍💼 Técnico</option>
                                        <option value="formacion">📐 Formación</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Selección</label>
                                    <select
                                        className="form-select"
                                        value={form.seleccionId}
                                        onChange={(e) => setForm({ ...form, seleccionId: e.target.value })}
                                    >
                                        <option value="">Seleccioná un equipo</option>
                                        {selecciones.map((s) => (
                                            <option key={s.id} value={s.id}>{s.bandera} {s.nombre}</option>
                                        ))}
                                    </select>
                                </div>

                                {form.tipo === "tecnico" && (
                                    <div className="mb-3">
                                        <label className="form-label">Nombre del técnico</label>
                                        <input
                                            className="form-control"
                                            placeholder="Ej: Lionel Scaloni"
                                            value={form.nombre}
                                            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                                        />
                                    </div>
                                )}

                                {form.tipo === "formacion" && (
                                    <div className="mb-3">
                                        <label className="form-label">Formación táctica</label>
                                        <input
                                            className="form-control"
                                            placeholder="Ej: 4-3-3"
                                            value={form.formacion}
                                            onChange={(e) => setForm({ ...form, formacion: e.target.value })}
                                        />
                                    </div>
                                )}

                                <button type="submit" className="btn btn-primary w-100">Agregar Especial</button>
                            </form>
                        </div>
                    </div>
                </div> */}
                <div className="col-md-12">
                    <div className="card border-0 shadow-sm">
                        {/* <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Tipo</th>
                                        <th>Detalle</th>
                                        <th>Selección</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {especiales.map((e) => (
                                        <tr key={e.id}>
                                            <td>
                                                <span className={`badge ${tipoColor[e.tipo]}`}>{tipoLabel[e.tipo]}</span>
                                            </td>
                                            <td className="fw-semibold">
                                                {e.tipo === "tecnico" ? e.nombre : e.tipo === "formacion" ? e.formacion : "Escudo oficial"}
                                            </td>
                                            <td>
                                                {getSeleccion(e.seleccionId)
                                                    ? `${getSeleccion(e.seleccionId).bandera} ${getSeleccion(e.seleccionId).nombre}`
                                                    : "—"}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() => { }}
                                                >
                                                    Modificar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {especiales.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="text-center text-muted py-4">No hay figuritas especiales registradas.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div> */}
                        <TablaEspeciales />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EspecialesSection;
