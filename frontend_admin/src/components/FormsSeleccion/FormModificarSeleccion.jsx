import { Form, Button, Row } from 'react-bootstrap';


export function FormModificarSeleccion({ formData, onChange, onSubmit }) {
    const grupos = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

    return (
        <Form id="form-modificar-seleccion" onSubmit={onSubmit}>
            <Row className="mb-3">
                <Form.Group controlId="formNombreSeleccion">
                    <Form.Label>Nombre de la Selección</Form.Label>
                    <Form.Control
                        type="text"
                        name="nombreSeleccion"
                        value={formData.nombreSeleccion}
                        onChange={onChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formNombrePais">
                    <Form.Label>País</Form.Label>
                    <Form.Control
                        type="text"
                        name="nombrePais"
                        value={formData.nombrePais}
                        onChange={onChange}
                        required
                    />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group xs={6} controlId="formGrupo">
                    <Form.Label>Grupo</Form.Label>
                    <Form.Select 
                        name="grupo" 
                        value={formData.grupo} 
                        onChange={onChange}
                    >
                        {grupos.map((letra) => (
                            <option key={letra} value={letra}>Grupo {letra}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formUrlBandera">
                <Form.Label>URL de la Bandera</Form.Label>
                <Form.Control
                    type="url"
                    name="urlBandera"
                    value={formData.urlBandera}
                    onChange={onChange}
                    placeholder="https://example.com/bandera.png"
                />
            </Form.Group>

            <Form.Label>Seleccion de Colores</Form.Label>
            <div className="d-flex gap-3 mb-4 justify-content-between">
                {['colorPrincipal', 'colorAcento1', 'colorAcento2', 'colorTitulo'].map((colorKey, index) => (
                    <Form.Group key={index} controlId={`form-${colorKey}`} className="text-center">
                        <Form.Label className="small text-muted d-block">{colorKey}</Form.Label>
                        <Form.Control
                            type="color"
                            name={colorKey}
                            value={formData[colorKey]}
                            onChange={onChange}
                            title={`Elegir ${colorKey}`}
                            style={{ width: '50px', height: '40px', padding: '2px' }}
                        />
                    </Form.Group>
                ))}
            </div>
        </Form>
    );
};
