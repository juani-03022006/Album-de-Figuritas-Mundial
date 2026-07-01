import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { AlbumProvider } from './context/AlbumContext.jsx';
import SeleccionesSection from './sections/SeleccionesSection.jsx';
import PosicionesSection from './sections/PosicionesSection.jsx';
import EspecialesSection from './sections/EspecialesSection.jsx';
import FiguritasSection from './sections/FiguritasSection.jsx';


const AUTH_URL = import.meta.env.VITE_AUTH_URL || 'http://localhost:4000';
const USER_FRONTEND_URL = import.meta.env.VITE_USER_FRONTEND_URL || 'http://localhost:5173';
const TOKEN_KEY = 'album_admin_access_token';
const ADMIN_USERNAMES = (import.meta.env.VITE_ADMIN_USERNAMES || 'admin_album')
    .split(',')
    .map((username) => username.trim())
    .filter(Boolean);


function readTokenFromCallbackHash() {
    if (window.location.pathname !== '/auth/callback') return null;

    const hash = window.location.hash.startsWith('#')
        ? window.location.hash.slice(1)
        : window.location.hash;

    const params = new URLSearchParams(hash);
    return params.get('access_token');
};

function clearCallbackUrl() {
    if (window.location.pathname === '/auth/callback') {
        window.history.replaceState({}, document.title, '/');
    };
};

function redirectToUserLogin() {
    window.location.replace(USER_FRONTEND_URL);
};


function isAdminUser(user) {
    return user?.roles?.includes('admin') || ADMIN_USERNAMES.includes(user?.username);
}

async function fetchAdminUser(accessToken) {
    const response = await fetch(`${AUTH_URL}/api/me`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error('No se pudo validar la sesión de administrador');
    };

    const data = await response.json();
    return data.usuario;
};

// ─── Types ───────────────────────────────────────────────────────────────────

const AAlbumContext = createContext(null);

function useAlbum() {
    return useContext(AAlbumContext);
};

// ─── Context Provider ─────────────────────────────────────────────────────────

function AAlbumProvider({ children }) {
    const [selecciones, setSelecciones] = useState([
        { id: 1, nombre: "Argentina", bandera: "🇦🇷", grupo: "A" },
        { id: 2, nombre: "Francia", bandera: "🇫🇷", grupo: "B" },
        { id: 3, nombre: "Brasil", bandera: "🇧🇷", grupo: "C" },
    ]);

    const [posiciones, setPosiciones] = useState([
        { id: 1, nombre: "Portero" },
        { id: 2, nombre: "Defensa Central" },
        { id: 3, nombre: "Lateral Derecho" },
        { id: 4, nombre: "Lateral Izquierdo" },
        { id: 5, nombre: "Mediocampista" },
        { id: 6, nombre: "Extremo" },
        { id: 7, nombre: "Delantero" },
    ]);

    const [jugadores, setJugadores] = useState([
        { id: 1, nombre: "Lionel Messi", numero: 10, seleccionId: 1, posicionId: 7 },
        { id: 2, nombre: "Kylian Mbappé", numero: 10, seleccionId: 2, posicionId: 7 },
        { id: 3, nombre: "Vinicius Jr.", numero: 7, seleccionId: 3, posicionId: 6 },
    ]);

    const [especiales, setEspeciales] = useState([
        { id: 1, tipo: "escudo", seleccionId: 1 },
        { id: 2, tipo: "tecnico", seleccionId: 1, nombre: "Lionel Scaloni" },
        { id: 3, tipo: "formacion", seleccionId: 1, formacion: "4-3-3" },
    ]);

    const agregarSeleccion = (s) =>
        setSelecciones((prev) => [...prev, { ...s, id: Date.now() }]);
    const eliminarSeleccion = (id) =>
        setSelecciones((prev) => prev.filter((s) => s.id !== id));

    const agregarPosicion = (p) =>
        setPosiciones((prev) => [...prev, { ...p, id: Date.now() }]);
    const eliminarPosicion = (id) =>
        setPosiciones((prev) => prev.filter((p) => p.id !== id));

    const agregarJugador = (j) =>
        setJugadores((prev) => [...prev, { ...j, id: Date.now() }]);
    const eliminarJugador = (id) =>
        setJugadores((prev) => prev.filter((j) => j.id !== id));

    const agregarEspecial = (e) =>
        setEspeciales((prev) => [...prev, { ...e, id: Date.now() }]);
    const eliminarEspecial = (id) =>
        setEspeciales((prev) => prev.filter((e) => e.id !== id));

    return (
        <AAlbumContext.Provider
            value={{
                selecciones, agregarSeleccion, eliminarSeleccion,
                posiciones, agregarPosicion, eliminarPosicion,
                jugadores, agregarJugador, eliminarJugador,
                especiales, agregarEspecial, eliminarEspecial,
            }}
        >
            {children}
        </AAlbumContext.Provider>
    );
};

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar() {
    const navItems = [
        { to: "/", label: "Dashboard", icon: "🏠" },
        { to: "/selecciones", label: "Selecciones", icon: "🌍" },
        { to: "/posiciones", label: "Posiciones", icon: "📋" },
        { to: "/figuritas", label: "Figuritas", icon: "⚽" },
        { to: "/especiales", label: "Especiales", icon: "⭐" },
    ];

    return (

        <nav
            className="d-flex flex-column p-0 text-white"
            style={{
                width: 220,
                minHeight: "100vh",
                background: "linear-gradient(180deg, #1a3a6b 0%, #0d2444 100%)",
                flexShrink: 0,
            }}
        >

            {/* Logo */}
            <div className="p-4 border-bottom border-white border-opacity-25 text-center">
                <div style={{ fontSize: 36 }}>🏆</div>
                <div className="fw-bold mt-1" style={{ fontSize: 13, letterSpacing: 1 }}>
                    ALBUM MUNDIAL
                </div>
                <div className="text-white-50" style={{ fontSize: 11 }}>
                    Panel de Administración
                </div>
            </div>

            {/* Nav links */}
            <ul className="nav flex-column p-2 flex-grow-1">
                {navItems.map((item) => (
                    <li className="nav-item" key={item.to}>
                        <NavLink
                            to={item.to}
                            end={item.to === "/"}
                            className={({ isActive }) =>
                                `nav-link d-flex align-items-center gap-2 rounded mb-1 px-3 py-2 ${isActive
                                    ? "active text-white fw-semibold"
                                    : "text-white-50"
                                }`
                            }
                            style={({ isActive }) => ({
                                background: isActive ? "rgba(255,255,255,0.15)" : "transparent",
                                transition: "background 0.15s",
                            })}
                        >
                            <span>{item.icon}</span>
                            <span style={{ fontSize: 14 }}>{item.label}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>

            <div className="p-3 text-center text-white-50" style={{ fontSize: 11 }}>
                USA - CANADA - MEXICO 2026
            </div>
        </nav>
    );
};

// ─── Layout ───────────────────────────────────────────────────────────────────

function Layout({ children, handleLogout }) {
    return (
        <div className="d-flex" style={{ minHeight: "100vh", background: "#f0f4f8" }}>
            <Sidebar />
            {handleLogout && (
                <button
                    type="button"
                    className="btn btn-outline-danger bg-white shadow-sm position-fixed fw-semibold"
                    style={{ top: 16, right: 24, zIndex: 1050 }}
                    onClick={handleLogout}
                >
                    Cerrar sesión
                </button>
            )}

            <main className="flex-grow-1 p-4 overflow-auto">{children}</main>
        </div>
    );
};

// ─── Page: Dashboard ──────────────────────────────────────────────────────────

function Dashboard() {
    const { jugadores, especiales, selecciones, posiciones } = useAlbum();
    const navigate = useNavigate();

    const getSeleccion = (id) => selecciones.find((s) => s.id === id);
    const getPosicion = (id) => posiciones.find((p) => p.id === id);

    const totalFiguritas = jugadores.length + especiales.length;

    return (
        <div>
            <h2 className="fw-bold mb-1">Dashboard</h2>
            <p className="text-muted mb-4">Resumen de la base de datos del álbum</p>

            {/* Stats */}
            <div className="row g-3 mb-4">
                {[
                    { label: "Total Figuritas", value: totalFiguritas, color: "primary", icon: "🖼️" },
                    { label: "Jugadores", value: jugadores.length, color: "success", icon: "⚽" },
                    { label: "Especiales", value: especiales.length, color: "warning", icon: "⭐" },
                    { label: "Selecciones", value: selecciones.length, color: "info", icon: "🌍" },
                ].map((s) => (
                    <div className="col-6 col-md-3" key={s.label}>
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body d-flex align-items-center gap-3">
                                <div
                                    className={`rounded-circle bg-${s.color} bg-opacity-10 d-flex align-items-center justify-content-center`}
                                    style={{ width: 48, height: 48, fontSize: 22, flexShrink: 0 }}
                                >
                                    {s.icon}
                                </div>
                                <div>
                                    <div className="fw-bold fs-4 lh-1">{s.value}</div>
                                    <div className="text-muted" style={{ fontSize: 13 }}>{s.label}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="card border-0 shadow-sm">
                <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
                    <h5 className="mb-0 fw-bold">Registro completo de figuritas</h5>
                    <span className="badge bg-primary rounded-pill">{totalFiguritas} registros</span>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>#</th>
                                <th>Tipo</th>
                                <th>Nombre / Descripción</th>
                                <th>Selección</th>
                                <th>Posición</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jugadores.map((j) => (
                                <tr key={`j-${j.id}`}>
                                    <td className="text-muted fw-semibold">{j.numero}</td>
                                    <td><span className="badge bg-primary">Jugador</span></td>
                                    <td className="fw-semibold">{j.nombre}</td>
                                    <td>
                                        {getSeleccion(j.seleccionId)
                                            ? `${getSeleccion(j.seleccionId).bandera} ${getSeleccion(j.seleccionId).nombre}`
                                            : "—"}
                                    </td>
                                    <td>{getPosicion(j.posicionId)?.nombre || "—"}</td>
                                </tr>
                            ))}
                            {especiales.map((e) => (
                                <tr key={`e-${e.id}`}>
                                    <td className="text-muted">—</td>
                                    <td>
                                        <span className="badge" style={{ background: "#7c3aed" }}>
                                            {e.tipo === "escudo" ? "Escudo" : e.tipo === "tecnico" ? "Técnico" : "Formación"}
                                        </span>
                                    </td>
                                    <td className="fw-semibold">
                                        {e.tipo === "tecnico" ? e.nombre : e.tipo === "formacion" ? e.formacion : "Escudo oficial"}
                                    </td>
                                    <td>
                                        {getSeleccion(e.seleccionId)
                                            ? `${getSeleccion(e.seleccionId).bandera} ${getSeleccion(e.seleccionId).nombre}`
                                            : "—"}
                                    </td>
                                    <td>—</td>
                                </tr>
                            ))}
                            {totalFiguritas === 0 && (
                                <tr>
                                    <td colSpan={5} className="text-center text-muted py-5">
                                        No hay figuritas registradas aún.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* FAB */}
            <button
                className="btn btn-primary rounded-circle shadow-lg position-fixed"
                style={{ bottom: 32, right: 32, width: 56, height: 56, fontSize: 28, lineHeight: 1, zIndex: 1050 }}
                title="Añadir Jugador"
                onClick={() => navigate("/jugadores")}
            >
                +
            </button>
        </div>
    );
};

// ─── Page: Jugadores ──────────────────────────────────────────────────────────

function Jugadores() {
    const { jugadores, selecciones, posiciones, agregarJugador, eliminarJugador } = useAlbum();
    const [form, setForm] = useState({ nombre: "", numero: "", seleccionId: "", posicionId: "" });
    const [error, setError] = useState("");

    const getSeleccion = (id) => selecciones.find((s) => s.id === id);
    const getPosicion = (id) => posiciones.find((p) => p.id === id);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.nombre.trim() || !form.numero || !form.seleccionId || !form.posicionId) {
            setError("Completá todos los campos.");
            return;
        }
        agregarJugador({
            nombre: form.nombre,
            numero: parseInt(form.numero),
            seleccionId: parseInt(form.seleccionId),
            posicionId: parseInt(form.posicionId),
        });
        setForm({ nombre: "", numero: "", seleccionId: "", posicionId: "" });
        setError("");
    };

    return (
        <div>
            <h2 className="fw-bold mb-1">Jugadores</h2>
            <p className="text-muted mb-4">Gestioná las figuritas de jugadores</p>

            <div className="row g-4">
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-white fw-bold py-3">➕ Añadir Jugador</div>
                        <div className="card-body">
                            {error && <div className="alert alert-danger py-2">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Nombre completo</label>
                                    <input
                                        className="form-control"
                                        placeholder="Ej: Lionel Messi"
                                        value={form.nombre}
                                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Número de figurita</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Ej: 10"
                                        value={form.numero}
                                        onChange={(e) => setForm({ ...form, numero: e.target.value })}
                                    />
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
                                <div className="mb-3">
                                    <label className="form-label">Posición</label>
                                    <select
                                        className="form-select"
                                        value={form.posicionId}
                                        onChange={(e) => setForm({ ...form, posicionId: e.target.value })}
                                    >
                                        <option value="">Seleccioná una posición</option>
                                        {posiciones.map((p) => (
                                            <option key={p.id} value={p.id}>{p.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Agregar Jugador</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
                            <span className="fw-bold">Lista de Jugadores</span>
                            <span className="badge bg-primary rounded-pill">{jugadores.length}</span>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre</th>
                                        <th>Selección</th>
                                        <th>Posición</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jugadores.map((j) => (
                                        <tr key={j.id}>
                                            <td className="fw-bold text-primary">{j.numero}</td>
                                            <td className="fw-semibold">{j.nombre}</td>
                                            <td>
                                                {getSeleccion(j.seleccionId)
                                                    ? `${getSeleccion(j.seleccionId).bandera} ${getSeleccion(j.seleccionId).nombre}`
                                                    : "—"}
                                            </td>
                                            <td>{getPosicion(j.posicionId)?.nombre || "—"}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => eliminarJugador(j.id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {jugadores.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="text-center text-muted py-4">No hay jugadores registrados.</td>
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

// ─── Page: Especiales ─────────────────────────────────────────────────────────

function Especiales() {
    const { especiales, selecciones, agregarEspecial, eliminarEspecial } = useAlbum();
    const [form, setForm] = useState({ tipo: "escudo", seleccionId: "", nombre: "", formacion: "" });
    const [error, setError] = useState("");

    const getSeleccion = (id) => selecciones.find((s) => s.id === id);

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
            <h2 className="fw-bold mb-1">Figuritas Especiales</h2>
            <p className="text-muted mb-4">Escudos, técnicos y formaciones</p>

            <div className="row g-4">
                <div className="col-md-4">
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
                </div>

                <div className="col-md-8">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
                            <span className="fw-bold">Figuritas Especiales</span>
                            <span className="badge bg-primary rounded-pill">{especiales.length}</span>
                        </div>
                        <div className="table-responsive">
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
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => eliminarEspecial(e.id)}
                                                >
                                                    Eliminar
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
    const [isInitialized, setIsInitialized] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        let isMounted = true;

        async function validateSession() {
            const callbackToken = readTokenFromCallbackHash();

            if (callbackToken) {
                localStorage.setItem(TOKEN_KEY, callbackToken);
                clearCallbackUrl();
            }

            const token = callbackToken || localStorage.getItem(TOKEN_KEY);

            if (!token) {
                redirectToUserLogin();
                return;
            }

            try {
                const user = await fetchAdminUser(token);


                if (!isAdminUser(user)) {
                    throw new Error('El usuario no tiene rol admin');
                }

                if (!isMounted) return;
                setIsAuthorized(true);
            } catch {
                localStorage.removeItem(TOKEN_KEY);
                redirectToUserLogin();
                return;
            } finally {
                if (isMounted) {
                    setIsInitialized(true);
                }
            }
        }

        validateSession();

        return () => {
            isMounted = false;
        };
    }, []);

    function handleLogout() {
        localStorage.removeItem(TOKEN_KEY);
        window.location.href = `${AUTH_URL}/logout`;
    }

    if (!isInitialized || !isAuthorized) {
        return (
            <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light text-secondary">
                Validando sesión de administrador...
            </div>
        );
    }

    return (
        <BrowserRouter>
            <AlbumProvider>
                <AAlbumProvider>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/selecciones" element={<SeleccionesSection />} />
                            <Route path="/posiciones" element={<PosicionesSection />} />
                            <Route path="/figuritas" element={<FiguritasSection />} />
                            <Route path="/especiales" element={<EspecialesSection />} />
                            <Route path="/auth/callback" element={<Dashboard />} />
                        </Routes>
                    </Layout>
                </AAlbumProvider>
            </AlbumProvider>
        </BrowserRouter>
    );
};
