import './DashboardSection.css'
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlbumContext } from '../context/AlbumContext.jsx';
import { Container, Row, Col } from 'react-bootstrap';
import { TituloSubtitulo } from '../components/TituloSubtitulo/TituloSubtitulo.jsx';
import { TablaSeleccionesDashboard } from '../components/TablaSeleccionesDashboard/TablaSeleccionesDashboard.jsx';
import { NavegadorSelecciones } from '../components/TablaFiguritas/NavegadorSelecciones.jsx';
import { TablaPosicionesDashboard } from '../components/TablaPosicionesDashboard/TablaPosicionesDashboard.jsx';
import { TablaEspecialesDashboard } from '../components/TablaEspecialesDashboard/TablaEspecialesDashboard.jsx';
import { TablaJugadoresDashboard } from '../components/TablaJugadoresDashboard/TablaJugadoresDashboard.jsx';


function DashboardSection() {
    const { jugadores, especiales, selecciones, posiciones } = useAlbumContext();
    const [idSelectedSeleccion, setIdSelectedSeleccion] = useState(1);
    const navigate = useNavigate();

    const seleccionesOrdenadas = useMemo(() => {
        if (!selecciones) return [];

        return [...selecciones].sort((unaSeleccion, otraSeleccion) => {
            return unaSeleccion.grupo.localeCompare(otraSeleccion.grupo);
        });
    }, [selecciones]);

    const handleSeleccionChange = (event) => {
        const valorSeleccionado = Number(event.target.value);
        setIdSelectedSeleccion(valorSeleccionado + 1);
    };

    const handlePrev = () => {
        if (idSelectedSeleccion > 0) {
            setIdSelectedSeleccion(idSelectedSeleccion - 1);
        };
    };

    const handleNext = () => {
        if (idSelectedSeleccion < seleccionesOrdenadas.length - 1) {
            setIdSelectedSeleccion(idSelectedSeleccion + 1);
        };
    };

    const especialesSeleccion = especiales.filter(especial => especial.figurita.idSeleccion === seleccionesOrdenadas[idSelectedSeleccion - 1].idSeleccion);
    const jugadoresSeleccion = jugadores.filter(jugador => jugador.figurita.idSeleccion === seleccionesOrdenadas[idSelectedSeleccion - 1].idSeleccion);
    const totalFiguritas = jugadores.length + especiales.length;

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
                                    <TablaPosicionesDashboard />
                                </div>
                            </div>
                        </div>
                    </Col>

                </Row>
                <Row className='g-3 mb-4'>
                    <Col md={12}>
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-header bg-white border-0 pt-3 pb-0">
                                <h5 className="card-title fw-bold text-secondary mb-0">Figuritas</h5>
                            </div>
                            <div className="card-body">
                                <Row className="mb-4">
                                    <Col md={12}>
                                        <NavegadorSelecciones
                                            handlePrev={handlePrev}
                                            handleNext={handleNext}
                                            handleSeleccionChange={handleSeleccionChange}
                                            selectedSeleccion={idSelectedSeleccion - 1}
                                            seleccionesOrdenadas={seleccionesOrdenadas}
                                        />
                                    </Col>
                                </Row>

                                <Row className="g-3">
                                    <Col md={5}>
                                        <p>Especiales</p>
                                        <div className="hide-scrollbar" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                            <TablaEspecialesDashboard especialesSeleccion={especialesSeleccion} />
                                        </div>
                                    </Col>

                                    <Col md={7}>
                                        <p>Jugadores</p>
                                        <div className="hide-scrollbar" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                            <TablaJugadoresDashboard jugadoresSeleccion={jugadoresSeleccion} />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default DashboardSection;
