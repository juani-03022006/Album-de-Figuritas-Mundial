import './DashboardSection.css'
import { useNavigate } from 'react-router-dom';
import { useAlbumContext } from '../context/AlbumContext.jsx';
import { Container, Row, Col } from 'react-bootstrap';
import { TituloSubtitulo } from '../components/TituloSubtitulo/TituloSubtitulo.jsx';
import { TablaSeleccionesDashboard } from '../components/TablaSeleccionesDashboard/TablaSeleccionesDashboard.jsx';


function DashboardSection() {
    const { jugadores, especiales, selecciones, posiciones } = useAlbumContext();
    const navigate = useNavigate()

    const getSeleccion = (id) => selecciones.find((s) => s.id === id);
    const getPosicion = (id) => posiciones.find((p) => p.id === id);

    const totalFiguritas = jugadores.length + especiales.length;

    // return (
    //     <div>
    //         <h2 className="fw-bold mb-1">Dashboard</h2>
    //         <p className="text-muted mb-4">Resumen de la base de datos del álbum</p>

    //         {/* Stats */}
    //         <div className="row g-3 mb-4">
    //             {[
    //                 { label: "Total Figuritas", value: totalFiguritas, color: "primary", icon: "🖼️" },
    //                 { label: "Jugadores", value: jugadores.length, color: "success", icon: "⚽" },
    //                 { label: "Especiales", value: especiales.length, color: "warning", icon: "⭐" },
    //                 { label: "Selecciones", value: selecciones.length, color: "info", icon: "🌍" },
    //             ].map((s) => (
    //                 <div className="col-6 col-md-3" key={s.label}>
    //                     <div className="card border-0 shadow-sm h-100">
    //                         <div className="card-body d-flex align-items-center gap-3">
    //                             <div
    //                                 className={`rounded-circle bg-${s.color} bg-opacity-10 d-flex align-items-center justify-content-center`}
    //                                 style={{ width: 48, height: 48, fontSize: 22, flexShrink: 0 }}
    //                             >
    //                                 {s.icon}
    //                             </div>
    //                             <div>
    //                                 <div className="fw-bold fs-4 lh-1">{s.value}</div>
    //                                 <div className="text-muted" style={{ fontSize: 13 }}>{s.label}</div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             ))}
    //         </div>

    //         {/* Table */}
    //         <div className="card border-0 shadow-sm">
    //             <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
    //                 <h5 className="mb-0 fw-bold">Registro completo de figuritas</h5>
    //                 <span className="badge bg-primary rounded-pill">{totalFiguritas} registros</span>
    //             </div>
    //             <div className="table-responsive">
    //                 <table className="table table-hover align-middle mb-0">
    //                     <thead className="table-light">
    //                         <tr>
    //                             <th>#</th>
    //                             <th>Tipo</th>
    //                             <th>Nombre / Descripción</th>
    //                             <th>Selección</th>
    //                             <th>Posición</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                         {jugadores.map((j) => (
    //                             <tr key={`j-${j.id}`}>
    //                                 <td className="text-muted fw-semibold">{j.numero}</td>
    //                                 <td><span className="badge bg-primary">Jugador</span></td>
    //                                 <td className="fw-semibold">{j.nombre}</td>
    //                                 <td>
    //                                     {getSeleccion(j.seleccionId)
    //                                         ? `${getSeleccion(j.seleccionId).bandera} ${getSeleccion(j.seleccionId).nombre}`
    //                                         : "—"}
    //                                 </td>
    //                                 <td>{getPosicion(j.posicionId)?.nombre || "—"}</td>
    //                             </tr>
    //                         ))}
    //                         {especiales.map((e) => (
    //                             <tr key={`e-${e.id}`}>
    //                                 <td className="text-muted">—</td>
    //                                 <td>
    //                                     <span className="badge" style={{ background: "#7c3aed" }}>
    //                                         {e.tipo === "escudo" ? "Escudo" : e.tipo === "tecnico" ? "Técnico" : "Formación"}
    //                                     </span>
    //                                 </td>
    //                                 <td className="fw-semibold">
    //                                     {e.tipo === "tecnico" ? e.nombre : e.tipo === "formacion" ? e.formacion : "Escudo oficial"}
    //                                 </td>
    //                                 <td>
    //                                     {getSeleccion(e.seleccionId)
    //                                         ? `${getSeleccion(e.seleccionId).bandera} ${getSeleccion(e.seleccionId).nombre}`
    //                                         : "—"}
    //                                 </td>
    //                                 <td>—</td>
    //                             </tr>
    //                         ))}
    //                         {totalFiguritas === 0 && (
    //                             <tr>
    //                                 <td colSpan={5} className="text-center text-muted py-5">
    //                                     No hay figuritas registradas aún.
    //                                 </td>
    //                             </tr>
    //                         )}
    //                     </tbody>
    //                 </table>
    //             </div>
    //         </div>

    //         {/* FAB */}
    //         <button
    //             className="btn btn-primary rounded-circle shadow-lg position-fixed"
    //             style={{ bottom: 32, right: 32, width: 56, height: 56, fontSize: 28, lineHeight: 1, zIndex: 1050 }}
    //             title="Añadir Jugador"
    //             onClick={() => navigate("/figuritas")}
    //         >
    //             +
    //         </button>
    //     </div>
    // );

    return (
        <>
            <TituloSubtitulo titulo={'Dashboard'} subtitulo={'Resumen de la base de datos del álbum'} />

            <Container>
                <Row className='g-3 mb-4'>
                    <Col md={7}>
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-header bg-white border-0 pt-3 pb-0">
                                <h5 className="card-title fw-bold mb-0">Selecciones</h5>
                            </div>

                            <div className="card-body">
                                <p>Cantidad de Selecciones: <span className="badge bg-primary rounded-pill">{selecciones.length}</span></p>
                                <div className='hide-scrollbar' style={{ maxHeight: '250px', overflowY: 'auto' }}>
                                    <TablaSeleccionesDashboard />
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={5}>
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-header bg-white border-0 pt-3 pb-0">
                                <h5 className="card-title fw-bold mb-0">Posiciones</h5>
                            </div>
                            <div className="card-body">
                                <p>Cantidad de Posiciones: <span className="badge bg-primary rounded-pill">{posiciones.length}</span></p>
                                <div className="hide-scrollbar" style={{ maxHeight: '250px', overflowY: 'auto' }}>
                                    <table className="table table-hover align-middle">
                                        <thead className="table-light sticky-top">
                                            <tr>
                                                <th>Posición</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {posiciones.map((posicion, index) => (
                                                <tr key={index}>
                                                    <td className="fw-semibold text-dark">
                                                        {posicion.descripcion}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </Col>

                </Row>
                <Row className='g-3 mb-4'>
                    <Col md={12}>
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body d-flex align-items-center gap-3">Seccion Figuritas</div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default DashboardSection;
