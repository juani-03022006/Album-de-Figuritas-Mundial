import { useMemo, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useAlbumContext } from '../../context/AlbumContext.jsx';
import { TituloSubtitulo } from '../TituloSubtitulo/TituloSubtitulo.jsx';


export function TablaFiguritas({ onFiguritaClick }) {
    const { selecciones, especiales, jugadores } = useAlbumContext();
    const [selectedSeleccion, setSelectedSeleccion] = useState(0);

    console.log(selecciones);
    const seleccionesOrdenadas = useMemo(() => {
        if (!selecciones) return [];

        return [...selecciones].sort((unaSeleccion, otraSeleccion) => {
            return unaSeleccion.grupo.localeCompare(otraSeleccion.grupo);
        });
    }, [selecciones]);


    // Handler para el Dropdown (mismo de antes)
    const handleSeleccionChange = (event) => {
        const valorSeleccionado = event.target.value;
        const indiceSeleccion = seleccionesOrdenadas.findIndex((seleccion) => seleccion.idSeleccion === valorSeleccionado);
        setSelectedSeleccion(indiceSeleccion);
    };

    // Funciones para navegar hacia atrás y adelante
    const handlePrev = () => {
        if (selectedSeleccion > 0) {
            setSelectedSeleccion(selectedSeleccion - 1);
        };
    };

    const handleNext = () => {
        if (currentIndex < seleccionesOrdenadas.length - 1) {
            setSelectedSeleccion(selectedSeleccion + 1);
        };
    };

    // =========================================================================
    // Tu lógica de filtrado de jugadores aquí...
    const jugadoresFiltrados = [];
    // =========================================================================

    return (
        <>
            <TituloSubtitulo titulo={'Figuritas'} subtitulo={'Gestioná las figuritas de cada Selección'} />
            <Container className='card border-0 shadow-sm'>
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
                                value={seleccionesOrdenadas[selectedSeleccion].idSeleccion}
                                onChange={handleSeleccionChange}
                            >
                                <option value="">-- Elegí un país --</option>
                                {seleccionesOrdenadas.map((sel) => (
                                    <option key={sel.id} value={sel.id}>
                                        Grupo {sel.grupo} - {sel.nombre}
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
                            // Se deshabilita si no hay selección o si es la última
                            disabled={currentIndex === -1 || currentIndex === seleccionesOrdenadas.length - 1}
                        >
                            Siguiente &gt;
                        </Button>
                    </Col>

                </Row>

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
    );
};
