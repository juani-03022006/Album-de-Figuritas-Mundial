import { Row, Col, Button, Form } from 'react-bootstrap';


export function NavegadorSelecciones({ handlePrev, handleNext, handleSeleccionChange, selectedSeleccion, seleccionesOrdenadas }) {
    return (
        <Row className="justify-content-center align-items-end mb-4 g-2">
            <Col xs="auto">
                <Button
                    variant="outline-secondary"
                    onClick={handlePrev}
                    disabled={selectedSeleccion <= 0}
                >
                    &lt; Anterior
                </Button>
            </Col>

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
    );
};
