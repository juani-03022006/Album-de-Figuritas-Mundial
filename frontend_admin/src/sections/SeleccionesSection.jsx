import { useSelecciones } from '../hooks/useSelecciones.js';
import { useState } from 'react';
import { Seleccion } from '../components/Seleccion/Seleccion.jsx';
import { TituloSubtitulo } from '../components/TituloSubtitulo/TituloSubtitulo.jsx';
import { ListaSelecciones } from '../components/ListaSelecciones/ListaSelecciones.jsx';
import { TablaSelecciones } from '../components/TablaSelecciones/TablaSelecciones.jsx';


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
        <>
            <TituloSubtitulo titulo="Selecciones" subtitulo="Gestioná los equipos del torneo" />

            <div className="row g-4">
                {/*     <div className="col-md-4">
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
                </div> */}

                <div className="col-md-12">
                    Añadir Seleccion: 
                    <button
                        className="btn btn-sm btn-outline-primary"

                    >
                        Modificar
                    </button>
                    <div className="card border-0 shadow-sm">
                        <TablaSelecciones selecciones={selecciones} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SeleccionesSection;
