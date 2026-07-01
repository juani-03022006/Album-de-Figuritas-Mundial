import { useMemo, useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { useAlbumContext } from '../../context/AlbumContext.jsx';
import { TituloSubtitulo } from '../TituloSubtitulo/TituloSubtitulo.jsx';


export function TablaFiguritas({ onFiguritaClick }) {
    const { selecciones, especiales, jugadores } = useAlbumContext();
    const [selectedSeleccion, setSelectedSeleccion] = useState(0);
    const haySelecciones = selecciones.length !== 0;

    const seleccionesOrdenadas = useMemo(() => {
        if (!selecciones) return [];

        return [...selecciones].sort((unaSeleccion, otraSeleccion) => {
            return unaSeleccion.grupo.localeCompare(otraSeleccion.grupo);
        });
    }, [selecciones]);


    // Handler para el Dropdown (mismo de antes)
    const handleSeleccionChange = (event) => {
        const valorSeleccionado = Number(event.target.value);
        setSelectedSeleccion(indiceSeleccion);  
    };

    // Funciones para navegar hacia atrás y adelante
    const handlePrev = () => {
        if (selectedSeleccion > 0) {
            setSelectedSeleccion(selectedSeleccion - 1);
        };
    };

    const handleNext = () => {
        if (selectedSeleccion < seleccionesOrdenadas.length - 1) {
            setSelectedSeleccion(selectedSeleccion + 1);
        };
    };

    // =========================================================================
    // const [especialesSeleccion, setEspecialesSeleccion] = useState([]);
    const [jugadoresSeleccion, setJugadoresSeleccion] = useState([]);

    const especialesSeleccion = especiales.filter(especial => especial.figurita.idSeleccion === seleccionesOrdenadas[selectedSeleccion].idSeleccion);

    // =========================================================================

    return (
        <>
            {haySelecciones ? (
                <>
                    {/* SECTOR DE CONTROL: CONTROLES DE PAGINACIÓN Y DROPDOWN */}
                    <Row className="justify-content-center align-items-end mb-4 g-2">
                        {/* Botón Atrás (<) */}
                        <Col xs="auto">
                            <Button
                                variant="outline-secondary"
                                onClick={handlePrev}
                                // Se deshabilita si no hay selección o si es la primera
                                disabled={selectedSeleccion <= 0}
                            >
                                &lt; Anterior
                            </Button>
                        </Col>

                        {/* Dropdown Central */}
                        <Col md={4} xs={6}>
                            <Form.Group controlId="selectSeleccion">
                                <Form.Label className="fw-bold d-block text-center">Selección Actual</Form.Label>
                                <Form.Select
                                    value={selectedSeleccion}
                                    onChange={handleSeleccionChange}
                                >
                                    {seleccionesOrdenadas.map((seleccion, index) => (
                                        <option key={seleccion.idSeleccion} value={index}>
                                            Grupo {seleccion.grupo} - {seleccion.nombreSeleccion}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        {/* Botón Siguiente (>) */}
                        <Col xs="auto">
                            <Button
                                variant="outline-secondary"
                                onClick={handleNext}
                                disabled={selectedSeleccion === seleccionesOrdenadas.length - 1}
                            >
                                Siguiente &gt;
                            </Button>
                        </Col>

                    </Row>
                    <Container className='card border-0 shadow-sm'>

                        <Row className="text-center fw-bold p-2">
                            <Col md={4} className='p-3'>Celda 1/3 (A)</Col>
                            <Col md={4} className='p-3'>Celda 1/3 (B)</Col>
                            <Col md={4} className='p-3'>Celda 1/3 (C)</Col>
                        </Row>

                        <Row className="text-center p-2">
                            <Col md={3} className='p-3' >Celda 1/4</Col>
                            <Col md={3} className='p-3' >Celda 1/4</Col>
                            <Col md={3} className='p-3' >Celda 1/4</Col>
                            <Col md={3} className='p-3' >Celda 1/4</Col>
                        </Row>

                        <Row className="text-center p-2">
                            <Col md={3} className='p-3' >Celda 1/4</Col>
                            <Col md={3} className='p-3' >Celda 1/4</Col>
                            <Col md={3} className='p-3' >Celda 1/4</Col>
                            <Col md={3} className='p-3' >Celda 1/4</Col>
                        </Row>
                    </Container>
                </>
            ) : (
                <Container className="text-center my-5">
                    <h5>Todavía no hay Selecciones...</h5> <Button>Añadir Selección</Button>
                </Container>
            )}
        </>
    );
};
