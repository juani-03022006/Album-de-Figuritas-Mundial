import { Form, Button } from 'react-bootstrap';
import { useSeleccionForm } from '../../hooks/useSeleccionFormHook.js';


export function FormSeleccion({ onSubmitSuccess, initialData = {} }) {
    const { values, handleChange, handleSubmit } = useSeleccionForm(initialData, onSubmitSuccess);
    const grupos = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="nombreSeleccion">
                <Form.Label>Nombre de la Selección</Form.Label>
                <Form.Control
                    type="text"
                    name="nombreSeleccion"
                    value={values.nombreSeleccion}
                    onChange={handleChange}
                    placeholder="Nombre de la Seleccion"
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="nombrePais">
                <Form.Label>Nombre del Pais</Form.Label>
                <Form.Control
                    type='text'
                    name='nombrePais'
                    value={values.nombrePais}
                    onChange={handleChange}
                    placeholder='Nombre del Pais'
                    required
                />
            </Form.Group>

            <Form.Label>Selecciona los 4 colores</Form.Label>
            <div className="d-flex gap-3 mb-4 justify-content-between">
                {['colorPrincipal', 'colorAcento1', 'colorAcento2', 'colorTitulo'].map((colorKey, index) => (
                    <Form.Group key={index} controlId={`form-${colorKey}`} className="text-center">
                        <Form.Label className="small text-muted d-block">{colorKey}</Form.Label>
                        <Form.Control
                            type="color"
                            name={colorKey}
                            value={values[colorKey]}
                            onChange={handleChange}
                            title={`Elegir ${colorKey}`}
                            style={{ width: '50px', height: '40px', padding: '2px' }}
                        />
                    </Form.Group>
                ))}
            </div>

            <Form.Group className="mb-3" controlId="grupo">
                <Form.Label>Elegi el grupo</Form.Label>
                <Form.Select
                    name="grupo"
                    value={values.grupo}
                    onChange={handleChange}
                    required
                >
                    {grupos.map((letraGrupo, index) => (
                        <option key={index} value={letraGrupo}>Grupo {letraGrupo}</option>
                    ))}
                </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
                <Button variant="success" type="submit" className="w-100">
                    Guardar Selección
                </Button>
            </div>
        </Form>
    );
};
